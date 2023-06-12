import { ProviderAPIConfig } from '../types';

const CohereAPIConfig: ProviderAPIConfig = {
    baseURL: "https://api.cohere.ai/v1",
    authHeader: "Authorization",
    authHeaderValue: "Bearer {{API_KEY}}",
    complete: "/generate"
}

export default CohereAPIConfig;