import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'

import { handleRequest } from './handlers/completeHandler'

const app = new Hono()



app.get('/', (c) => c.text('Rubeus says hey!'))
app.use('*', prettyJSON())
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

// Error handling
app.onError((err, c) => {
    console.error(`${err}`)
    // Set HTTP status code
    c.status(500)

    // Return the response body
    return c.json(c.error)
})


app.post('/complete', async (c) => {
    let cjson = await c.req.json();
    console.log("Inside the complete request", cjson, c.env)
    let response = await handleRequest(c.env, cjson, "complete");
    // Will contain the code to make completion call to the actual provider.
    return c.json(await response.json())
})


export default app
