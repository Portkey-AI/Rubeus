import { ProviderAPIConfig } from "../types";

const OpenAIAPIConfig: ProviderAPIConfig = {
  baseURL: "https://api.openai.com/v1",
  authHeader: "Authorization",
  authHeaderValue: "Bearer {{API_KEY}}",
  complete: "/completions",
};

export default OpenAIAPIConfig;
