import { Message, Params } from "../../types/requestBody";
import { ChatCompletionResponse, ProviderConfig } from "../types";

// TODOS: this configuration does not enforce the maximum token limit for the input parameter. If you want to enforce this, you might need to add a custom validation function or a max property to the ParameterConfig interface, and then use it in the input configuration. However, this might be complex because the token count is not a simple length check, but depends on the specific tokenization method used by the model.

export const CohereChatCompleteConfig: ProviderConfig = {
  model: {
    param: "model",
    default: "command",
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
          prompt+=`${msg.role}:${msg.content}\n`
        })
        prompt = prompt.trim();
      }

      return prompt;
    }
  },
  max_tokens: {
    param: "max_tokens",
    default: 20,
    min: 1,
  },
  temperature: {
    param: "temperature",
    default: 0.75,
    min: 0,
    max: 5,
  },
  top_p: {
    param: "p",
    default: 0.75,
    min: 0,
    max: 1,
  },
  top_k: {
    param: "k",
    default: 0,
    max: 500,
  },
  frequency_penalty: {
    param: "frequency_penalty",
    default: 0,
    min: 0,
    max: 1,
  },
  presence_penalty: {
    param: "presence_penalty",
    default: 0,
    min: 0,
    max: 1,
  },
  logit_bias: {
    param: "logit_bias",
  },
  n: {
    param: "num_generations",
    default: 1,
    min: 1,
    max: 5,
  },
  stop: {
    param: "end_sequences",
  },
};

interface CohereCompleteResponse {
  id: string;
  generations: {
    id: string;
    text: string;
  }[];
  prompt: string;
  meta: {
    api_version: {
      version: string;
    };
  };
}

export const CohereChatCompleteResponseTransform: (response: CohereCompleteResponse) => ChatCompletionResponse = (response) => ({
  id: response.id,
  object: "chat_completion",
  created: Math.floor(Date.now() / 1000),
  model: "Unknown",
  provider: "cohere",
  choices: response.generations.map((generation, index) => ({
    message: {role: "assistant", content: generation.text},
    index: index,
    finish_reason: "length",
  })),
  usage: {
    prompt_tokens: -1, // Need to calculate these
    completion_tokens: -1, // Need to calculate these
    total_tokens: -1, // Need to calculate these
  },
});
