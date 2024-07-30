import { Database } from "../database.ts";

type VibeCheckType = Database["public"]["Tables"]["candidate_aspirations"]["Row"] & {
    vibe_check: Array<{ query: string; answer: string }>;}

    export function validateAspiration(record:VibeCheckType){
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
    return raw_string_input
}
