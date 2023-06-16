import AnthropicConfig from "./anthropic";
import CohereConfig from "./cohere";
import OpenAIConfig from "./openai";
import { ProviderConfigs } from "./types";

const Providers: { [key: string]: ProviderConfigs } = {
  openai: OpenAIConfig,
  cohere: CohereConfig,
  anthropic: AnthropicConfig,
};

export default Providers;
