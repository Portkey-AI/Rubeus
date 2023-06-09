import { ProviderConfig } from './types';

const cohereConfig: { [key: string]: ProviderConfig } = {
    complete: {
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
    }
};

export default cohereConfig;
