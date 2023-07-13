import { EmbedRequestBody, EmbedResponse } from "../types/embedRequestBody";
import { Options } from "../types/requestBody";
import { tryPost } from "./handlerUtils";

export async function embedHandler(env: any, request: EmbedRequestBody): Promise<EmbedResponse> {
  let providerOption:Options|null;
  
  try {

    if ('provider' in request.config) {
      providerOption = {provider: request.config.provider || "openai", apiKeyName: request.config.apiKeyName};
    } else if ('options' in request.config && !!request.config.options) {
      // We always pick the first option for now
      providerOption = request.config.options[0];
    } else {
      throw "Could not find a provider";
    }

    // Get the provider from the request
    const provider = request.config.provider;

    // Get the API key from the environment
    const apiKey = env[providerOption.provider];

    // Make the API call to the provider
    const response = await tryPost(providerOption, apiKey, request, "embed");

    // Return the response
    return response as EmbedResponse;
  } catch (error:any) {
    // If an error occurs, log it and rethrow it
    console.error(`Error in embedHandler: ${error.message}`);
    throw error;
  }
}
