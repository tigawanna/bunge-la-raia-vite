import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { geminiEmbedding } from "../helpers/generate-embedding.ts";
import { Database } from "../database.ts";
import { createClient } from "jsr:@supabase/supabase-js";

interface RequestBody {
  record: Database["public"]["Tables"]["candidate_aspirations"]["Row"] & {
    vibe_check: Array<{ query: string; answer: string }>;
  };
}

Deno.serve(async (req) => {
  try {
    const { record } = (await req.json()) as RequestBody;
    if (!record) {
      return new Response("No record found", { status: 400 });
    }
    if(record?.mission_statement.length < 10) {
      return new Response("Not enough mission statement data ", { status: 400 });
    }
    if (!record.vibe_check || record.vibe_check?.length === 0) {
      return new Response("No vibe check found", { status: 400 });
    }
    const vibe_check = JSON.stringify(record?.vibe_check);
    if (vibe_check.length < 100) {
      return new Response("Not enough vibe check data ", { status: 400 });
    }
    
    const raw_string_input = `i am vying for ${record.vying_for} in
    ${record.vying_in} period ${record.period}
    my mission statement is : ${record.mission_statement}
    my vibe check quiz questions and answers are ${vibe_check}`;
    
    const authHeader = req.headers.get("Authorization")!;
    const embeddingResult = await geminiEmbedding({ inputText: raw_string_input });
    const supabaseClient = createClient<Database>(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );

    const { data, error } = await supabaseClient
      .from("candidate_aspirations")
      .update({
        embedding: embeddingResult,
      })
      .eq("id", record.id)
      .select("*")
      .single();

    if (error) {
      throw new Error("error embedding aspiration :", error.message);
    }

    return new Response(
      "aspiration embedding " + data?.id + " updated successfully",
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response("Something went wrong: " + error.message, {
      status: 500,
    });
  }
});
