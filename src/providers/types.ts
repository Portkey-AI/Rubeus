export interface ParameterConfig {
    param: string;
    default?: any;
    min?: number;
    max?: number;
    required?: boolean;
    transform?:Function;
}
export interface ProviderConfig {
    [key: string]: ParameterConfig;
}

export interface ProviderAPIConfig {
    baseURL: string;
    authHeader: string;
    authHeaderValue: string;
    complete:string;
    embed?:string;
    rerank?:string;
    moderate?:string;
}

export interface ProviderAPIConfigs {
    [key: string]: ProviderAPIConfig;
}

export interface ProviderConfigs {
    [key: string]: ProviderConfig | ProviderAPIConfig;
}
