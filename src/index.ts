import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { HTTPException } from 'hono/http-exception'

import { completeHandler } from "./handlers/completeHandler";

const app = new Hono();

app.get("/", (c) => c.text("Rubeus says hey!"));
app.use("*", prettyJSON());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

// Error handling
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    // Get the custom response
    return err.getResponse()
  }

  console.error(`${err}`);
  // Set HTTP status code
  c.status(500);

  // Return the response body
  return c.json(c.error);
});

// TODO: Error handling needs to be tested
app.post("/complete", async (c) => {
  try {
    let cjson = await c.req.json();
    let response = await completeHandler(c.env, cjson);
    return c.json(response);
  } catch(err:any) {
    throw new HTTPException(500, { message: err.message })
  }
});

export default app;
