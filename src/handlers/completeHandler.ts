import { RequestBody } from "../types/requestBody";
import transformToProviderRequest from "../services/transformToProviderRequest";
import Providers from "../providers";
import { CompletionResponse } from "../providers/types";

function constructRequest(apiConfig: any, requestType: string, apiKey: String) {
  let baseUrl = apiConfig.baseURL;
  let headers: any = {
    "Content-Type": "application/json",
  };
  headers[apiConfig.authHeader] = apiConfig.authHeaderValue.replace(
    "{{API_KEY}}",
    apiKey
  );
  let endpoint = apiConfig[requestType];

  // Construct the full URL
  const url = `${baseUrl}${endpoint}`;

  let fetchOptions: RequestInit = {
    method: "POST",
    headers,
  };

  return { url, fetchOptions };
}

// The completeHandler function
export async function completeHandler(
  env: any,
  request: RequestBody
): Promise<CompletionResponse> {
  // Mapping providers to corresponding URLs
  const apiConfig: any = Providers[request.provider].api;

  // Construct the base object for the POST request
  let { url, fetchOptions } = constructRequest(
    apiConfig,
    "complete",
    env[request.provider]
  );

  // Attach the body of the request
  fetchOptions.body = JSON.stringify(
    transformToProviderRequest(request, "complete")
  );

  // Make the fetch request
  console.log("Going to make this call", url, JSON.stringify(fetchOptions));
  const response = await fetch(url, fetchOptions);

  // If the response was not ok, throw an error
  if (!response.ok) {
    console.error(
      `Error: ${response.statusText}`,
      JSON.stringify(await response.json())
    );
    throw new Error(`Error: ${response.statusText}`);
  }

  // Return the response
  let json = await response.json();

  let completionResponse = Providers[request.provider].completeResponseTransform(json);

  // Return the standardized JSON
  return completionResponse;
}
