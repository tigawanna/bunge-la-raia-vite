import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { generateVibeSummary } from "../helpers/generate-vibe-summary.ts";
import { createClient } from "jsr:@supabase/supabase-js";
import { Database } from "../../../src/lib/supabase/db-types.ts";
interface GenerateVibeSummaryBody {
  // deno-lint-ignore no-explicit-any
  record: Record<string, any> & {
    id: string;
    updated_at: string;
    vibe_check: Array<{ query: string; answer: string }>;
  };
}
Deno.serve(async (req) => {
  try {
    const authHeader = req.headers.get("Authorization")!;
    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );
    const { record } = (await req.json()) as GenerateVibeSummaryBody;
    if (!record) {
      return new Response("No record found", { status: 400 });
    }
    if (!record.vibe_check || record.vibe_check.length === 0) {
      return new Response("No vibe check found", { status: 400 });
    }
    const vibe_check = JSON.stringify(record?.vibe_check);
    if (vibe_check.length < 100) {
      return new Response("Not enough vibe check data ", { status: 400 });
    }

    const summary = await generateVibeSummary({ inputText: vibe_check });
    const summary_text = summary.response.text();

    if (!summary || !summary?.response) {
      return new Response("aspiration summary generation failed", {
        status: 400,
      });
    }
    const { data, error } = await supabaseClient.from("candidate_aspirations")
      .update({
        aspiration_summary: summary_text,
      })
      .eq("id", record.id)
      .select("*")
      .single();
    if (error) {
      return new Response(
        "updating aspiration summary failed :" + error.message,
        { status: 400 },
      );
    }
    return new Response(
      "aspiration summary " + data?.id + " updated successfully",
      { status: 200 },
    );
  } catch (error) {
    return new Response("Something went wrong: " + error.message, {
      status: 500,
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/summarize-candidate-aspiration' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
