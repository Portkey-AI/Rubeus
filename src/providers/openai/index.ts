import { ProviderConfigs } from "../types";
import { OpenAICompleteConfig, OpenAICompleteResponseTransform } from "./complete";
import OpenAIEmbedConfig from "./embed";
import OpenAIAPIConfig from "./api";
import { OpenAIChatCompleteConfig, OpenAIChatCompleteResponseTransform } from "./chatComplete";

const OpenAIConfig: ProviderConfigs = {
  complete: OpenAICompleteConfig,
  embed: OpenAIEmbedConfig,
  api: OpenAIAPIConfig,
  chatComplete: OpenAIChatCompleteConfig,
  responseTransforms: {
    complete: OpenAICompleteResponseTransform,
    chatComplete: OpenAIChatCompleteResponseTransform
  }
};

export default OpenAIConfig;
