export interface ProviderParameterConfig {
    param: string;
    default?: any;
    min?: number;
    max?: number;
    required?: boolean;
    transform?:Function;
}

export interface ProviderConfig {
    [key: string]: ProviderParameterConfig;
}

export interface ProviderConfigs {
    [key: string]: ProviderConfig;
}
