import { ProviderConfig } from '../types';

// TODOS: this configuration does not enforce the maximum token limit for the input parameter. If you want to enforce this, you might need to add a custom validation function or a max property to the ParameterConfig interface, and then use it in the input configuration. However, this might be complex because the token count is not a simple length check, but depends on the specific tokenization method used by the model.

const AnthropicCompleteConfig:ProviderConfig = {
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
};

export default AnthropicCompleteConfig;
