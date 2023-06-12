import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

import { completeHandler } from "./handlers/completeHandler";

const app = new Hono();

app.get("/", (c) => c.text("Rubeus says hey!"));
app.use("*", prettyJSON());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

// Error handling
app.onError((err, c) => {
  console.error(`${err}`);
  // Set HTTP status code
  c.status(500);

  // Return the response body
  return c.json(c.error);
});

app.post("/complete", async (c) => {
  let cjson = await c.req.json();
  let response = await completeHandler(c.env, cjson);
  return c.json(response);
});

export default app;
