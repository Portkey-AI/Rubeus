import { ProviderConfigs } from '../types';
import AnthropicAPIConfig from './api';
import AnthropicCompleteConfig from './complete';

const AnthropicConfig:ProviderConfigs = {
    complete: AnthropicCompleteConfig,
    api: AnthropicAPIConfig
}

export default AnthropicConfig;