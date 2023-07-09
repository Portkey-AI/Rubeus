export interface ParameterConfig {
  param: string;
  default?: any;
  min?: number;
  max?: number;
  required?: boolean;
  transform?: Function;
}
export interface ProviderConfig {
  [key: string]: ParameterConfig;
}

export interface ProviderAPIConfig {
  baseURL: string;
  complete: string;
  chatComplete?: string;
  embed?: string;
  rerank?: string;
  moderate?: string;
  headers: Function;
}

export interface ProviderAPIConfigs {
  [key: string]: ProviderAPIConfig;
}

export interface ProviderConfigs {
  [key: string]: any ;
}

export interface CompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface Message {
  role: string;
  content: string;
}

export interface ChatChoice {
  index: number;
  message: Message;
  finish_reason: string;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
