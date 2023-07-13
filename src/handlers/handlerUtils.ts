import Providers from "../providers";
import { BaseResponse, ChatCompletionResponse, CompletionResponse } from "../providers/types";
import transformToProviderRequest from "../services/transformToProviderRequest";
import { EmbedRequestBody } from "../types/embedRequestBody";
import { Options, Params, RequestBody } from "../types/requestBody";
import { retryRequest } from "./retryHandler";

/**
 * Constructs the request options for the API call.
 *
 * @param {any} apiConfig - API configuration details. The structure is Providers[provider].api.
 * @param {string} apiKey - The API key for the request.
 * @param {string} provider - The provider for the request.
 * @returns {RequestInit} - The fetch options for the request.
 */
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

/**
 * Selects a provider based on their assigned weights.
 * The weight is used to determine the probability of each provider being chosen.
 * If all providers have a weight of 0, an error will be thrown.
 *
 * @param {Options[]} providers - The available providers.
 * @returns {Options} - The selected provider.
 * @throws Will throw an error if no provider is selected, or if all weights are 0.
 */
export function selectProviderByWeight(providers:Options[]): Options {
  // Assign a default weight of 1 to providers with undefined weight
  providers = providers.map(provider => ({...provider, weight: provider.weight ?? 1}));

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

/**
 * Gets the provider options based on the specified mode.
 * Modes can be "single" (uses the first provider), "loadbalance" (selects one provider based on weights),
 * or "fallback" (uses all providers in the given order). If the mode does not match these options, null is returned.
 *
 * @param {string} mode - The mode for selecting providers.
 * @param {any} config - The configuration for the providers.
 * @returns {(Options[]|null)} - The selected provider options.
 */
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

/**
 * Makes a POST request to a provider and returns the response.
 * The POST request is constructed using the provider, apiKey, and requestBody parameters.
 * The fn parameter is the type of request being made (e.g., "complete", "chatComplete").
 *
 * @param {Options} providerOption - The provider options. This object follows the Options interface and may contain a RetrySettings object for retry configuration.
 * @param {string} apiKey - The API key.
 * @param {RequestBody} requestBody - The request body.
 * @param {string} fn - The function for the request.
 * @returns {Promise<CompletionResponse>} - The response from the POST request.
 * @throws Will throw an error if the response is not ok or if all retry attempts fail.
 */
export async function tryPost(providerOption:Options, apiKey:string, requestBody: RequestBody|EmbedRequestBody, fn: string): Promise<BaseResponse> {
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

/**
 * Tries providers in sequence until a successful response is received.
 * The providers are attempted in the order they are given in the providers parameter.
 * If all providers fail, an error is thrown with the details of the errors from each provider.
 *
 * @param {Options[]} providers - The providers to try. Each object in the array follows the Options interface and may contain a RetrySettings object for retry configuration.
 * @param {any} env - The environment variables.
 * @param {RequestBody} request - The request body.
 * @param {string} fn - The function for the request.
 * @returns {Promise<CompletionResponse>} - The response from the first successful provider.
 * @throws Will throw an error if all providers fail.
 */
export async function tryProvidersInSequence(providers:Options[], env:any, request: RequestBody, fn: string): Promise<BaseResponse> {
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