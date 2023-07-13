/**
 * Hono server for managing chat application.
 *
 * @module index
 */

import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { HTTPException } from 'hono/http-exception'

import { completeHandler } from "./handlers/completeHandler";
import { chatCompleteHandler } from "./handlers/chatCompleteHandler";
import { embedHandler } from "./handlers/embedHandler";

// Create a new Hono server instance
const app = new Hono();

/**
 * GET route for the root path.
 * Returns a greeting message.
 */
app.get("/", (c) => c.text("Rubeus says hey!"));

// Use prettyJSON middleware for all routes
app.use("*", prettyJSON());

/**
 * Default route when no other route matches.
 * Returns a JSON response with a message and status code 404.
 */
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

/**
 * Global error handler.
 * If error is instance of HTTPException, returns the custom response.
 * Otherwise, logs the error and returns a JSON response with status code 500.
 */
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  console.error(`${err}`);
  c.status(500);
  return c.json(c.error);
});

/**
 * POST route for '/complete'.
 * Handles requests by passing them to the completeHandler.
 * If an error occurs, it throws an HTTPException with status code 500.
 */
app.post("/complete", async (c) => {
  try {
    let cjson = await c.req.json();
    let response = await completeHandler(c.env, cjson);
    return c.json(response);
  } catch(err:any) {
    throw new HTTPException(500, { message: err.message })
  }
});

/**
 * POST route for '/chatComplete'.
 * Handles requests by passing them to the chatCompleteHandler.
 * If an error occurs, it throws an HTTPException with status code 500.
 */
app.post("/chatComplete", async (c) => {
  try {
    let cjson = await c.req.json();
    let response = await chatCompleteHandler(c.env, cjson);
    return c.json(response);
  } catch(err:any) {
    throw new HTTPException(500, { message: err.message })
  }
});

/**
 * POST route for '/embed'.
 * Handles requests by passing them to the embedHandler.
 * If an error occurs, it throws an HTTPException with status code 500.
 */
app.post("/embed", async (c) => {
  try {
    let cjson = await c.req.json();
    let response = await embedHandler(c.env, cjson);
    return c.json(response);
  } catch(err:any) {
    throw new HTTPException(500, { message: err.message })
  }
});

// Export the app
export default app;
