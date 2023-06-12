import { ProviderAPIConfig } from "../types";

const AnthropicAPIConfig: ProviderAPIConfig = {
  baseURL: "https://api.anthropic.com/v1",
  authHeader: "X-API-Key",
  authHeaderValue: "{{API_KEY}}",
  complete: "/complete",
};

export default AnthropicAPIConfig;
