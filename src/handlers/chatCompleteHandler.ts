import { Options, RequestBody } from "../types/requestBody";
import { CompletionResponse } from "../providers/types";
import { getProviderOptionsByMode, tryProvidersInSequence } from "./handlerUtils";

// const OPENAI_CHAT_MODELS = ["gpt-4-0613","gpt-3.5-turbo-16k-0613","gpt-3.5-turbo-0301","gpt-3.5-turbo","gpt-3.5-turbo-0613","gpt-4","gpt-4-0314","gpt-3.5-turbo-16k","gpt-4-32k-0314","gpt-4-32k-0613","gpt-4-32k"]

// The completeHandler function
export async function chatCompleteHandler(env: any, request: RequestBody): Promise<CompletionResponse|undefined> {
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

