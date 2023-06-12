import { ProviderConfigs } from '../types';
import CohereAPIConfig from './api';
import CohereCompleteConfig from './complete';
import CohereEmbedConfig from './embed';

const CohereConfig:ProviderConfigs = {
    complete: CohereCompleteConfig,
    embed: CohereEmbedConfig,
    api: CohereAPIConfig
}

export default CohereConfig;