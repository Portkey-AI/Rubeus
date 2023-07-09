interface RetrySettings {
  attempts: number;
  onStatusCodes: number[];
}

export interface Options {
  provider: string;
  apiKeyName?: string;
  weight?: number;
  retry?: RetrySettings;
  override_params?: Params;
}

export interface Config {
  mode: "single" | "fallback" | "loadbalance" | "scientist";
  options: Options[];
}

export interface Message {
  role: 'system' | 'user' | 'assistant' | 'function';
  content?: string;
  name?: string;
  function_call?: any;
}

export interface JsonSchema {
  [key: string]: any;  // Replace with actual schema definition if known
}

export interface Function {
  name: string;
  description?: string;
  parameters?: JsonSchema;
}


export interface Params {
  model: string;
  prompt?: string | string[];
  messages?: Message[];
  functions?: Function[];
  function_call?: "none" | "auto" | {name: string;};
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: { [key: string]: number };
  user?: string;
}

interface FullRequestBody {
  config: Config;
  params: Params;
}

interface ShortConfig {
  provider: string;
  apiKeyName?: string;
}

interface ShortRequestBody {
  config: ShortConfig;
  params: Params;
}

export type RequestBody = FullRequestBody | ShortRequestBody;