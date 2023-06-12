import { ProviderConfig } from '../types';

// TODOS: this configuration does not enforce the maximum token limit for the input parameter. If you want to enforce this, you might need to add a custom validation function or a max property to the ParameterConfig interface, and then use it in the input configuration. However, this might be complex because the token count is not a simple length check, but depends on the specific tokenization method used by the model.

const CohereCompleteConfig:ProviderConfig = {
    model: {
        param: 'model',
        default: 'command',
        required: true
    },
    prompt: {
        param: 'prompt',
        required: true
    },
    max_tokens: {
        param: 'max_tokens',
        default: 20,
        min: 1,
    },
    temperature: {
        param: 'temperature',
        default: 0.75,
        min: 0,
        max: 5
    },
    top_p: {
        param: 'p',
        default: 0.75,
        min: 0,
        max: 1
    },
    top_k: {
        param: 'k',
        default: 0,
        max: 500
    },
    frequency_penalty: {
        param: 'frequency_penalty',
        default: 0,
        min: 0,
        max: 1
    },
    presence_penalty: {
        param: 'presence_penalty',
        default: 0,
        min: 0,
        max: 1
    },
    logit_bias: {
        param: 'logit_bias',
    },
    n: {
        param: 'num_generations',
        default: 1,
        min: 1,
        max: 5
    },
    stop: {
        param: 'end_sequences',
    },
};

export default CohereCompleteConfig;
