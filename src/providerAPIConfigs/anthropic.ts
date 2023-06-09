import { ProviderAPIConfig } from './types';

const anthropicAPIConfig: ProviderAPIConfig = {
    baseURL: "https://api.anthropic.com/v1",
    authHeader: "X-API-Key",
    authHeaderValue: "{{API_KEY}}",
    complete: "/complete"
}

export default anthropicAPIConfig;