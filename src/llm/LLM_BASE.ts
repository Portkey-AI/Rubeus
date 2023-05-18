export abstract class LLMBase {
    
    async complete(requestBody: {[k: string]: any}, requestHeaders: {[k: string]: any}): Promise<Response> {
      return Promise.reject(new Error('Method not supported'));
    }
    
    async chatCompletion(prompt: string = '', maxTokens: number = 0, temperature: number = 0, chatLog: string[] = []): Promise<string> {
      return Promise.reject(new Error('Method not supported'));
    }
    
    async embed(text: string = ''): Promise<number[]> {
      return Promise.reject(new Error('Method not supported'));
    }

    async fetch(url: string, method: string, body: {[k: string]: any}, headers: {[k: string]: any}) {
        const response = await fetch(url, {
            method:method,
            headers: headers,
            body: JSON.stringify(body)
        });
        console.log("HEREE", response)
        return response
        
    }
}