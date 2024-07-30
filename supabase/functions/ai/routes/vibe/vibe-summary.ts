import { Hono } from "jsr:@hono/hono";
import { generateVibeSummary } from "../../../helpers/generate-vibe-summary.ts";
import { createClient } from "jsr:@supabase/supabase-js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello from vibe-summary!");
});

app.post("/", async (c) => {
  interface GenerateVibeSummaryBody {
    inputText: string;
  }
  try {
    const { inputText } = await c.req.json<GenerateVibeSummaryBody>();
    const summary = await generateVibeSummary({ inputText });
    return c.json({ summary });
  } catch (error) {
    return c.json({
      name: "Something went wrong",
      error: error?.message,
    }, 500);
  }
});
export { app as vibeSummaryRoute };
