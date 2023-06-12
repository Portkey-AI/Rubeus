import { ProviderConfig } from '../types';

// TODO: Test if the "user" param is dropped

const CohereEmbedConfig: ProviderConfig = {
    input: {
        param: 'texts',
        required: true
    },
    model: {
        param: 'model',
        default: 'embed-english-v2.0'
    }
};

export default CohereEmbedConfig;