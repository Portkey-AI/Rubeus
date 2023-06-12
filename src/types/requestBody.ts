export interface RequestBody {
  provider: string;
  params: {
    model: string;
    prompt?: string | string[];
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
  };
}
