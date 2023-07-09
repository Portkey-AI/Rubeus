import { ProviderConfigs } from "../types";
import AnthropicAPIConfig from "./api";
import { AnthropicChatCompleteConfig } from "./chatComplete";
import { AnthropicCompleteConfig, AnthropicCompleteResponseTransform } from "./complete";

const AnthropicConfig: ProviderConfigs = {
  complete: AnthropicCompleteConfig,
  chatComplete: AnthropicChatCompleteConfig,
  api: AnthropicAPIConfig,
  responseTransforms: {
    complete: AnthropicCompleteResponseTransform,
    chatComplete: AnthropicCompleteResponseTransform
  }
};

export default AnthropicConfig;
