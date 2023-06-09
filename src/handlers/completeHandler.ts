import { RequestBody } from "../types/requestBody";
import providerAPIConfigs from "../providerAPIConfigs";
import { ProviderAPIConfig } from "../providerAPIConfigs/types";
import transformToProviderRequest from "../services/transformToProviderRequest";

const REQUEST_TYPE:keyof ProviderAPIConfig = "complete";

// The handleRequest function
export async function handleRequest(env:any, request: RequestBody): Promise<Response> {
    // Mapping providers to corresponding URLs
    const apiConfig:ProviderAPIConfig = providerAPIConfigs[request.provider];

    // Base URL
    let baseUrl = apiConfig.baseURL;
    let headers:any = {
        'Content-Type': 'application/json'
    }
    headers[apiConfig.authHeader] = apiConfig.authHeaderValue.replace("{{API_KEY}}", env[request.provider])
    let endpoint = apiConfig[REQUEST_TYPE]

    // Construct the full URL
    const url = `${baseUrl}${endpoint}`;

    let params = transformToProviderRequest(request, REQUEST_TYPE);

    // The fetch options
    const fetchOptions: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(params)
    };

    // Make the fetch request
    console.log("Going to make this call", url, JSON.stringify(fetchOptions))
    const response = await fetch(url, fetchOptions);

    // If the response was not ok, throw an error
    if (!response.ok) {
        console.error(`Error: ${response.statusText}`, JSON.stringify(await response.json()))
        throw new Error(`Error: ${response.statusText}`);
    }

    // Return the response
    return response;
}