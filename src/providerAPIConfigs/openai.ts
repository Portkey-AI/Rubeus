import { ProviderAPIConfig } from './types';

const openAIAPIConfig: ProviderAPIConfig = {
    baseURL: "https://api.openai.com/v1",
    authHeader: "Authorization",
    authHeaderValue: "Bearer {{API_KEY}}",
    complete: "/completions"
}

export default openAIAPIConfig;