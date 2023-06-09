import { ProviderConfig } from './types';

const openAIConfig: { [key: string]: ProviderConfig } = {
    complete: {
        model: {
            param: 'model',
            required: true,
            default: 'text-davinci-003'
        },
        prompt: {
            param: 'prompt',
            default: ''
        },
        max_tokens: {
            param: 'max_tokens',
            default: 16,
            min: 1,
        },
        temperature: {
            param: 'temperature',
            default: 1,
            min: 0,
            max: 2
        },
        top_p: {
            param: 'top_p',
            default: 1,
            min: 0,
            max: 1
        },
        n: {
            param: 'n',
            default: 1
        },
        stream: {
            param: 'stream',
            default: false
        },
        logprobs: {
            param: 'logprobs',
            max: 5
        },
        echo: {
            param: 'echo',
            default: false
        },
        stop: {
            param: 'stop',
        },
        presence_penalty: {
            param: 'presence_penalty',
            default: 0,
            min: -2,
            max: 2
        },
        frequency_penalty: {
            param: 'frequency_penalty',
            default: 0,
            min: -2,
            max: 2
        },
        best_of: {
            param: 'best_of',
            default: 1
        },
        logit_bias: {
            param: 'logit_bias',
        },
        user: {
            param: 'user',
        }
    }
};

export default openAIConfig;
