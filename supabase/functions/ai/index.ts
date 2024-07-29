import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Hono } from "jsr:@hono/hono";
import { vibeSummaryRoute } from "./routes/vibe/vibe-summary.ts";


// change this to your function name
const functionName = "ai";
const app = new Hono().basePath(`/${functionName}`);

app.get("/", (c) => c.text("Hello from hono-server!"));
app.post("/", async (c) => {
  console.log( "==================== c.req.json() ==============", c.req.json());
  console.log( "==================== c.req. ==============", c.req);
})
// app.route("/vibe-summary",vibeSummaryRoute)


Deno.serve(app.fetch);
