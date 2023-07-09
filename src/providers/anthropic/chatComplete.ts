import { Params, Message } from "../../types/requestBody";
import { ChatCompletionResponse, ProviderConfig } from "../types";

// TODO: this configuration does not enforce the maximum token limit for the input parameter. If you want to enforce this, you might need to add a custom validation function or a max property to the ParameterConfig interface, and then use it in the input configuration. However, this might be complex because the token count is not a simple length check, but depends on the specific tokenization method used by the model.

export const AnthropicChatCompleteConfig: ProviderConfig = {
  model: {
    param: "model",
    default: "claude-instant-1",
    required: true,
  },
  messages: {
    param: "prompt",
    required: true,
    transform: (params:Params) => {
      let prompt:string = "";
      // Transform the chat messages into a simple prompt
      if (!!params.messages) {
        let messages:Message[] = params.messages;
        messages.forEach(msg => {
          if (msg.role == "user") {
            prompt+=`Human: ${msg.content}\n`
          } else if (msg.role == "assistant") {
            prompt+=`Assistant: ${msg.content}\n`
          }
        })
        prompt += "Assistant:";
      }

      return prompt;
    }
  },
  max_tokens: {
    param: "max_tokens_to_sample",
    required: true,
  },
  temperature: {
    param: "temperature",
    default: 1,
    min: 0,
    max: 1,
  },
  top_p: {
    param: "top_p",
    default: -1,
    min: -1,
  },
  top_k: {
    param: "top_k",
    default: -1,
  },
  stop: {
    param: "stop_sequences",
  },
  stream: {
    param: "stream",
    default: false,
  },
  user: {
    param: "metadata.user_id",
  },
};

interface AnthropicCompleteResponse {
  completion: string;
  stop_reason: string;
  model: string;
  truncated: boolean;
  stop: null | string;
  log_id: string;
  exception: null | string;
}

// TODO: The token calculation is wrong atm
export const AnthropicCompleteResponseTransform: (response: AnthropicCompleteResponse) => ChatCompletionResponse = (response) => ({
  id: response.log_id,
  object: "chat_completion",
  created: Math.floor(Date.now() / 1000),
  model: response.model,
  provider: "anthropic",
  choices: [
    {
      message: {"role": "assistant", content: response.completion},
      index: 0,
      logprobs: null,
      finish_reason: response.stop_reason,
    },
  ],
  usage: {
    prompt_tokens: -1, // Need to calculate these
    completion_tokens: -1, // Need to calculate these
    total_tokens: -1, // Need to calculate these
  },
});