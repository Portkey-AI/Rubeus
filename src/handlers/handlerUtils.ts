import Providers from "../providers";
import { CompletionResponse } from "../providers/types";
import transformToProviderRequest from "../services/transformToProviderRequest";
import { Options, Params, RequestBody } from "../types/requestBody";
import { retryRequest } from "./retryHandler";

export function constructRequest(apiConfig: any, apiKey: string, provider: string) {
  let headers: any = {
    "Content-Type": "application/json",
    "x-portkey-api-key": "x2trk", // TODO: this needs to be replaced.
    "x-portkey-mode": `proxy ${provider}`,
    // "x-portkey-cache": "semantic"
  };

  // Add any headers that the model might need
  headers = {...headers, ...apiConfig.headers(apiKey)}
  
  let fetchOptions: RequestInit = {
    method: "POST",
    headers,
  };

  return fetchOptions;
}

export function selectProviderByWeight(providers:Options[]): Options {
  // Assign a default weight of 1 to providers with undefined weight
  providers = providers.map(provider => ({...provider, weight: provider.weight ?? 1}));

  // Compute the total weight
  let totalWeight = providers.reduce((sum:number, provider:any) => sum + provider.weight, 0);
  console.log(totalWeight);

  // Select a random weight between 0 and totalWeight
  let randomWeight = Math.random() * totalWeight;
  console.log(randomWeight);

  // Find the provider that corresponds to the selected weight
  for (let provider of providers) {
    // @ts-ignore since weight is being default set above
    if (randomWeight < provider.weight) {
      console.log(`Chose ${provider} with weight ${provider.weight} as it is greater than ${randomWeight}`)
      return provider;
    }
    // @ts-ignore since weight is being default set above
    randomWeight -= provider.weight;
  }

  throw new Error("No provider selected, please check the weights");
}

export function getProviderOptionsByMode(mode: string, config: any): Options[]|null {
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

async function tryPost(providerOption:Options, apiKey:string, requestBody: RequestBody, fn: string): Promise<CompletionResponse> {
  const overrideParams = providerOption?.override_params || {};
  const params: Params = {...requestBody.params, ...overrideParams};

  const provider:string = providerOption.provider;
  
  // Mapping providers to corresponding URLs
  const apiConfig: any = Providers[provider].api;

  // Construct the base object for the POST request
  let fetchOptions = constructRequest(apiConfig,apiKey,provider);

  let baseUrl = "https://api.portkey.ai/v1/proxy" || apiConfig.baseURL;
  let endpoint = apiConfig[fn];
  
  // Construct the full URL
  const url = `${baseUrl}${endpoint}`;

  // Attach the body of the request
  fetchOptions.body = JSON.stringify(transformToProviderRequest(provider, params, fn));

  let response:Response;
  let retryCount:number|undefined;

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
  let resp = Providers[provider].responseTransforms[fn](json);

  // Return the standardized JSON
  return resp;
}

export async function tryProvidersInSequence(providers:Options[], env:any, request: RequestBody, fn: string) {
  let errors: any[] = [];
  for (let providerOption of providers) {
    try {
      return await tryPost(providerOption, env[providerOption.provider], request, fn);
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