import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { geminiEmbedding } from "../helpers/generate-embedding.ts";
import { Database } from "../database.ts";
import { createClient } from "jsr:@supabase/supabase-js";

interface RequestBody {
  record: Database["public"]["Tables"]["candidate_aspirations"]["Row"]
}


Deno.serve(async (req) => {
  try {
 const { record } = (await req.json()) as RequestBody;

    const authHeader = req.headers.get("Authorization")!;
    const inputText = JSON.stringify({...record,})

    const embeddingResult = await geminiEmbedding({ inputText });
    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );

    // const { data, error } = await supabaseClient
    //   .from("candidate_aspirations")
    //   .update({
    //     embedding: embeddingResult,
    //   })
    //   .eq("id",reco);
    return new Response(
      "uwu",
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response("Something went wrong: " + error.message, {
      status: 500,
    });
  }
});
