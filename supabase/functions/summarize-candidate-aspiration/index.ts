// deno-lint-ignore-file no-explicit-any
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
console.log("Hello from Functions!");
interface GenerateVibeSummaryBody {
  record: Record<string, any> & {
    id: string;
    updated_at: string;
    vibe_check: Array<{ query: string; answer: string }>;
  };
}
Deno.serve(async (req) => {
  const {record} = await req.json() as GenerateVibeSummaryBody;
  if(!record){
    return new Response("No record found", { status: 404 });
  }
  if(!record.vibe_check){
    return new Response("No vibe check found", { status: 404 });
  }
  if(!record.updated_at){
    return new Response("No updated at found", { status: 404 });
  }
  if(new Date(record.updated_at)){
    
  }
  return new Response("Hello my friend");
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/summarize-candidate-aspiration' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
