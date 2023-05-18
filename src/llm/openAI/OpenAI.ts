import { LLMBase } from "./../LLM_BASE";

export interface OpenAICompletionBody {
    model: string;
    prompt?: string | [string];
    suffix?: string;
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
    logit_bias?: Record<string, number>;
    user?: string;
}

export class OpenAIBase extends LLMBase {
    private apiKey: string;
    private openAIBasePath = 'https://api.openai.com/v1';
  
    constructor(apiKey: string) {
      super();
      this.apiKey = apiKey;
    }
  
    async complete(requestBody: OpenAICompletionBody, requestHeaders?: {[k: string]: any}): Promise<Response> {
        console.log("HEREE")
        
        const completionPath = `${this.openAIBasePath}/completions`;
        const method = 'POST';
        
        // const defaultRequestBody = {
        //     max_tokens: 16,
        //     temperature: 1,
        //     top_p: 1,
        //     n: 1,
        //     stream: false,
        //     echo: false,
        //     presence_penalty: 0,
        //     frequency_penalty: 0,
        //     best_of: 1,
        // }

        // const body = {...defaultRequestBody, ...requestBody};

        const body = requestBody;
        const defaultHeaders =  {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
        }

        const headers = {...defaultHeaders, ...requestHeaders};

        return this.fetch(completionPath, method, body, headers);
    }   
  
    // async chatCompletion(prompt: string = '', maxTokens: number = 0, temperature: number = 0, chatLog: string[] = []): Promise<string> {
    //   // implementation specific to OpenAI API
    //   // ...
    // }
  
    // async embed(text: string = ''): Promise<number[]> {
    //   // implementation specific to OpenAI API
    //   // ...
    // }
  }