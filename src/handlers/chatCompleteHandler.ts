import { Options, RequestBody } from "../types/requestBody";
import { CResponse } from "../providers/types";
import { getProviderOptionsByMode, tryProvidersInSequence } from "./handlerUtils";

// const OPENAI_CHAT_MODELS = ["gpt-4-0613","gpt-3.5-turbo-16k-0613","gpt-3.5-turbo-0301","gpt-3.5-turbo","gpt-3.5-turbo-0613","gpt-4","gpt-4-0314","gpt-3.5-turbo-16k","gpt-4-32k-0314","gpt-4-32k-0613","gpt-4-32k"]

/**
 * Handles the 'chatComplete' API request by selecting the appropriate provider(s) and making the request to them.
 * 
 * The environment variables (`env`) should be the cloudflare environment variables.
 *
 * The `request` parameter is an object that includes:
 * - `config`: An object that specifies how the request should be handled. It can either be a `ShortConfig` object with `provider` and `apiKeyName` fields, or a `Config` object with `mode` and `options` fields. 
 *   The `mode` can be "single" (uses the first provider), "loadbalance" (selects one provider based on weights), or "fallback" (uses all providers in the given order).
 * - `params`: An object that specifies the parameters of the request, such as `model`, `prompt`, `messages`, etc.
 * 
 * If a provider is specified in the request config, that provider is used. Otherwise, the provider options are determined based on the mode in the request config.
 * If no provider options can be determined, an error is thrown. If the request to the provider(s) fails, an error is also thrown.
 *
 * This function returns a `CResponse` object which includes `id`, `object`, `created`, `model`, `choices`, and `usage` fields.
 *
 * @param {any} env - The cloudflare environment variables.
 * @param {RequestBody} request - The request body, which includes the config for the request (provider, mode, etc.).
 * @returns {Promise<CResponse>} - The response from the provider.
 * @throws Will throw an error if no provider options can be determined or if the request to the provider(s) fails.
 */
export async function chatCompleteHandler(env: any, request: RequestBody): Promise<CResponse> {
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
    const errorResponse = {
      error: { message: `Could not find a provider option.`,}
    };
    throw errorResponse;
  }
  
  try {
      return await tryProvidersInSequence(providerOptions, env, request, "chatComplete");
  } catch (error:any) {
    console.error(`Error caught in completeHandler: ${error.message}`);
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

