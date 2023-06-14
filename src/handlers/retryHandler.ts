import retry from 'async-retry';

export const retryRequest = async (
  url: string,
  options: RequestInit,
  retryCount: number,
  statusCodesToRetry: number[]
): Promise<[Response, number | undefined]> => {

  let lastError: any | undefined;
  let lastResponse: Response | undefined;
  let lastAttempt: number | undefined;
  try {
    await retry(
      async (bail: any, attempt: number) => {
        try {
          const response: Response = await fetch(url, options);
          if (statusCodesToRetry.includes(response.status)) {
            const errorObj: any = new Error(await response.clone().text());
            errorObj.status = response.status;
            throw errorObj;
          } else {
            lastAttempt = attempt;
            console.log(`Returned Success in Retry Attempt ${attempt}`);
          }
          lastResponse = response;
        } catch (error: any) {
          lastError = error;
          if (attempt >= retryCount) {
            bail(error);
          }
          throw error;
        }
      }, {
      retries: retryCount,
      onRetry: (error: Error, attempt: number) => {
        console.warn(`Failed in Retry attempt ${attempt}. Error: ${error}`);
      },
    }
    );
  } catch (error: any) {
    lastResponse = new Response(error.message, {
      status: error.status,
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.warn(`Retried ${retryCount} times but still failed. Error: ${error}`);
  }
  return [lastResponse as Response, lastAttempt];
}
