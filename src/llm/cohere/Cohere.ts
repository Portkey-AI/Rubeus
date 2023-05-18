import { LLMBase } from "./../LLM_BASE"; 

//interface for cohere generate body params
export interface CohereCompletionBody {
    prompt: string;
    model?: string;
    num_generations?: number;
    max_tokens?: number;
    preset?: string;
    temperature?: number;
    k: number;
    p?: number;
    frequency_penalty?: number;
    presence_penalty?: number;
    end_sequences?: [string];
    stop_sequences?: [string];
    return_likelihoods?: string;
    logit_bias?: Record<string, number>;
    truncate?: string;
}

export class CohereBase extends LLMBase {
    private apiKey: string;
    private cohereBasePath = 'https://api.cohere.ai/v1';
  
    constructor(apiKey: string) {
      super();
      this.apiKey = apiKey;
    }
  
    async complete(requestBody: {[k: string]: any}, requestHeaders: {[k: string]: any}): Promise<Response> {
        
        const completionPath = `${this.cohereBasePath}/generate`;
        const method = 'POST';

        // const defaultRequestBody = {
        //     model: 'command',
        //     num_generations: 1,
        //     max_tokens: 20,
        //     temperature: 0.75,
        //     k: 0,
        //     p: 0.75,
        //     frequency_penalty: 0.0,
        //     presence_penalty: 0.0,
        //     return_likelihoods: 'NONE'
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