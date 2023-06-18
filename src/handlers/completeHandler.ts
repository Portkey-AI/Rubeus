import { Options, Params, RequestBody } from "../types/requestBody";
import transformToProviderRequest from "../services/transformToProviderRequest";
import Providers from "../providers";
import { CompletionResponse } from "../providers/types";
import { retryRequest } from "./retryHandler";

function constructRequest(apiConfig: any, apiKey: string, provider: string) {
  let baseUrl = apiConfig.baseURL;
  let headers: any = {
    "Content-Type": "application/json",
    "x-portkey-api-key": "x2trk", // TODO: this needs to be replaced.
    "x-portkey-mode": `proxy ${provider}`,
    // "x-portkey-cache": "semantic"
  };
  headers[apiConfig.authHeader] = apiConfig.authHeaderValue.replace(
    "{{API_KEY}}",
    apiKey
  );
  let endpoint = apiConfig.complete;

  // Construct the full URL
  const url = `https://api.portkey.ai/v1/proxy${endpoint}`;

  let fetchOptions: RequestInit = {
    method: "POST",
    headers,
  };

  return { url, fetchOptions };
}

async function tryPost(providerOption:Options, apiKey:string, requestBody: RequestBody): Promise<CompletionResponse> {
  const params:Params = requestBody.params;
  const provider:string = providerOption.provider;
  
  // Mapping providers to corresponding URLs
  const apiConfig: any = Providers[provider].api;

  // Construct the base object for the POST request
  let { url, fetchOptions } = constructRequest(apiConfig,apiKey,provider);

  // Attach the body of the request
  fetchOptions.body = JSON.stringify(transformToProviderRequest(provider, params, "complete"));

  let response:Response;
  let retryCount:number|undefined = 0;

  if (!providerOption.retry) {
    providerOption.retry = {attempts: 1, onStatusCodes:[]}
  }
  
  console.log("Going to make this call", url, JSON.stringify(fetchOptions));
  [response, retryCount] = await retryRequest(url, fetchOptions, providerOption.retry.attempts, providerOption.retry.onStatusCodes);

  // If the response was not ok, throw an error
  if (!response.ok) {
    console.error(`Error: ${response.statusText}`, JSON.stringify(await response.json()));

    // Check if this request needs to be retried
    throw new Error(`Error: ${response.statusText}`);
  }

  // Return the response
  let json = await response.json();
  let completionResponse = Providers[provider].completeResponseTransform(json);

  // Return the standardized JSON
  return completionResponse;
}

function selectProviderByWeight(providers:Options[]): Options {
  // Assign a default weight of 1 to providers with undefined weight
  providers = providers.map(provider => ({...provider, weight: provider.weight || 1}));

  // Compute the total weight
  let totalWeight = providers.reduce((sum:number, provider:any) => sum + provider.weight, 0);

  // Select a random weight between 0 and totalWeight
  let randomWeight = Math.random() * totalWeight;

  // Find the provider that corresponds to the selected weight
  for (let provider of providers) {
    // @ts-ignore since weight is being default set above
    if (randomWeight < provider.weight) {
      return provider;
    }
    // @ts-ignore since weight is being default set above
    randomWeight -= provider.weight;
  }

  throw new Error("No provider selected, please check the weights");
}

async function tryProvidersInSequence(providers:Options[], env:any, request: RequestBody) {
  let errors: any[] = [];
  for (let providerOption of providers) {
    try {
      return await tryPost(providerOption, env[providerOption.provider], request);
    } catch (error:any) {
      // Log and store the error
      console.log(`Error with provider ${providerOption.provider}: ${error}`);
      errors.push({
        provider: providerOption.provider,
        error: error.message
      });
    }
  }
  // If we're here, all providers failed. Throw an error with the details.
  throw new Error(`All providers failed. Errors: ${JSON.stringify(errors)}`);
}

function getProviderOptionsByMode(mode: string, config: any): Options[]|null {
  switch (mode) {
    case "single":
      return [config.options[0]];
    case "loadbalance":
      return [selectProviderByWeight(config.options)];
    case "fallback":
      return config.options;
    default:
      return null;
  }    
}

// The completeHandler function
export async function completeHandler(env: any, request: RequestBody): Promise<CompletionResponse|undefined> {
  let providerOptions:Options[]|null;
  let mode:string;
  
  if ('provider' in request.config) {
    providerOptions = [{provider: request.config.provider, apiKeyName: request.config.apiKeyName}];
    mode = "single";
  } else {
    mode = request.config.mode;
    providerOptions = getProviderOptionsByMode(mode, request.config);
  }

  if (!providerOptions) {
    // TODO: Should throw an error here possibly.
    return undefined;
  }
  
  try {
    if (mode === "fallback") {
      // Try all providers in sequence (for fallback mode)
      return await tryProvidersInSequence(providerOptions, env, request);
    } else {
      // Try just one provider (for single and loadbalance modes)
      return await tryPost(providerOptions[0], env[providerOptions[0].provider], request);
    }
  } catch (error:any) {
    console.error(`Error: ${error.message}`);
    const errorResponse = {
      error: {
        message: `Failed to process the request`,
        type: error.name,
        detail: error.message
      }
    };
    throw errorResponse;
  }
}

