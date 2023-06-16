import { ProviderConfigs } from "../types";
import { OpenAICompleteConfig, OpenAICompleteResponseTransform } from "./complete";
import OpenAIEmbedConfig from "./embed";
import OpenAIAPIConfig from "./api";

const OpenAIConfig: ProviderConfigs = {
  complete: OpenAICompleteConfig,
  embed: OpenAIEmbedConfig,
  api: OpenAIAPIConfig,
  completeResponseTransform: OpenAICompleteResponseTransform
};

export default OpenAIConfig;
