import anthropicConfig from './anthropic';
import cohereConfig from './cohere';
import openAIConfig from './openai';
import { ProviderConfigs } from './types';

const providerConfigs: { [key: string]: ProviderConfigs } = {
    openai: openAIConfig,
    anthropic: anthropicConfig,
    cohere: cohereConfig
};

export default providerConfigs;
