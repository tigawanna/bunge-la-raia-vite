import { Hono } from "jsr:@hono/hono";
import { generateVibeSummary } from "./generate-vibe-summary.ts";
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello from vibe-summary!");
});
app.post("/", async (c) => {
  try {
    const inputText = await c.req.json();
    const summary = await generateVibeSummary({ inputText });
    return c.json({ summary });
  } catch (error) {
      return c.json({
      name:"Something went wrong",
      error: error.message
    }, 500);
  }

});
export { app as vibeSummaryRoute };
