import { Config, Options, Params, RequestBody } from "../types/requestBody";
import transformToProviderRequest from "../services/transformToProviderRequest";
import Providers from "../providers";
import { CompletionResponse } from "../providers/types";

function constructRequest(apiConfig: any, apiKey: String) {
  let baseUrl = apiConfig.baseURL;
  let headers: any = {
    "Content-Type": "application/json",
  };
  headers[apiConfig.authHeader] = apiConfig.authHeaderValue.replace(
    "{{API_KEY}}",
    apiKey
  );
  let endpoint = apiConfig.complete;

  // Construct the full URL
  const url = `${baseUrl}${endpoint}`;

  let fetchOptions: RequestInit = {
    method: "POST",
    headers,
  };

  return { url, fetchOptions };
}

async function tryPost(provider:string, apiKey:string, requestBody: RequestBody): Promise<CompletionResponse> {
  // Mapping providers to corresponding URLs
  const apiConfig: any = Providers[provider].api;

  // Construct the base object for the POST request
  let { url, fetchOptions } = constructRequest(
    apiConfig,
    apiKey
  );

  // Attach the body of the request
  fetchOptions.body = JSON.stringify(
    transformToProviderRequest(provider, requestBody.params, "complete")
  );

  // Make the fetch request
  console.log("Going to make this call", url, JSON.stringify(fetchOptions));
  const response:Response = await fetch(url, fetchOptions);

  // If the response was not ok, throw an error
  if (!response.ok) {
    console.error(
      `Error: ${response.statusText}`,
      JSON.stringify(await response.json())
    );
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

// The completeHandler function
export async function completeHandler(env: any, request: RequestBody): Promise<CompletionResponse|undefined> {
  let provider:string|null;
  let mode:string;
  
  if ('provider' in request.config) {
    provider = request.config.provider;
    mode = "single";
  } else {
    mode = request.config.mode;
    if (mode === "single") {
      provider = request.config.options[0].provider
    } else if (mode === "loadbalance"){
      provider = selectProviderByWeight(request.config.options).provider
    } else {
      provider = null
    }
  }

  // TODO: right now the load balancing only work for different providers
  // TODO: make it work across apiKeys, overridden params as well
  if (!!provider) {
    return tryPost(provider, env[provider], request);
  } else {
    // TODO: Should throw an error here possibly.
    return undefined;
  }
}
