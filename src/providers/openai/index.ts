import { ProviderConfigs } from '../types';
import OpenAICompleteConfig from './complete';
import OpenAIEmbedConfig from './embed';
import OpenAIAPIConfig from './api';

const OpenAIConfig:ProviderConfigs = {
    complete: OpenAICompleteConfig,
    embed: OpenAIEmbedConfig,
    api: OpenAIAPIConfig
}

export default OpenAIConfig;