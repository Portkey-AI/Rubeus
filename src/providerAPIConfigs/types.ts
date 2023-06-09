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
