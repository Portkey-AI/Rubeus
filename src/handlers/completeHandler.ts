import { RequestBody } from "../types/requestBody";
import transformToProviderRequest from "../services/transformToProviderRequest";
import ProviderConfigs from "../providers";
import { ProviderAPIConfig } from "../providers/types";

function constructRequest(apiConfig:any, requestType:string, apiKey:String) {
    let baseUrl = apiConfig.baseURL;
    let headers:any = {
        'Content-Type': 'application/json'
    }
    headers[apiConfig.authHeader] = apiConfig.authHeaderValue.replace("{{API_KEY}}", apiKey)
    let endpoint = apiConfig[requestType]

    // Construct the full URL
    const url = `${baseUrl}${endpoint}`;

    let fetchOptions: RequestInit = {
        method: 'POST',
        headers
    };

    return {url, fetchOptions};
}

// The handleRequest function
export async function handleRequest(env:any, request: RequestBody, requestType:keyof ProviderAPIConfig): Promise<Response> {
    // Mapping providers to corresponding URLs
    const apiConfig:any = ProviderConfigs[request.provider].api;

    // Construct the base object for the POST request
    let {url, fetchOptions} = constructRequest(apiConfig, requestType, env[request.provider])

    // Attach the body of the request
    fetchOptions.body = JSON.stringify(transformToProviderRequest(request, requestType));

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