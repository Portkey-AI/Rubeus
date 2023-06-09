import anthropicAPIConfig from './anthropic';
import cohereAPIConfig from './cohere';
import openAIAPIConfig from './openai';
import { ProviderAPIConfigs } from './types';

const providerAPIConfigs: ProviderAPIConfigs = {
    openai: openAIAPIConfig,
    anthropic: anthropicAPIConfig,
    cohere: cohereAPIConfig
};

export default providerAPIConfigs;
