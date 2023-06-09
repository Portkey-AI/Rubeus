import { ProviderAPIConfig } from './types';

const cohereAPIConfig: ProviderAPIConfig = {
    baseURL: "https://api.cohere.ai/v1",
    authHeader: "Authorization",
    authHeaderValue: "Bearer {{API_KEY}}",
    complete: "/generate"
}

export default cohereAPIConfig;