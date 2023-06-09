import { ProviderConfig } from './types';

const anthropicConfig: { [key: string]: ProviderConfig } = {
    complete: {
        model: {
            param: 'model',
            default: 'claude-instant-1',
            required: true
        },
        prompt: {
            param: 'prompt',
            transform: (value: any) => `\n\nHuman: ${value}\n\nAssistant:`,
            required: true
        },
        max_tokens: {
            param: 'max_tokens_to_sample',
            required: true
        },
        temperature: {
            param: 'temperature',
            default: 1,
            min: 0,
            max: 1
        },
        top_p: {
            param: 'top_p',
            default: -1,
            min: -1,
        },
        top_k: {
            param: 'top_k',
            default: -1
        },
        stop: {
            param: 'stop_sequences',
        },
        stream: {
            param: 'stream',
            default: false,
        },
        user: {
            param: 'metadata.user_id',
        },
    }
};

export default anthropicConfig;
