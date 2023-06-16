import { ProviderConfigs } from "../types";
import AnthropicAPIConfig from "./api";
import { AnthropicCompleteConfig, AnthropicCompleteResponseTransform } from "./complete";

const AnthropicConfig: ProviderConfigs = {
  complete: AnthropicCompleteConfig,
  api: AnthropicAPIConfig,
  completeResponseTransform: AnthropicCompleteResponseTransform
};

export default AnthropicConfig;
