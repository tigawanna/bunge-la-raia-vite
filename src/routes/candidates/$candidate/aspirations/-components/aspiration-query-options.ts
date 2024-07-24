import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";


export function listCandidateAspirationsQueryOptions({candidate_id,search_query}:{candidate_id: string, search_query: string}) {
    return queryOptions({
      queryKey: ["candidates", candidate_id, "candidate_aspirations", search_query],
      queryFn: async () => {
        return await supabase
          .from("candidate_aspirations")
          .select("*")
          .eq("candidate_id", candidate_id)
          .ilike("name", `%${search_query}%`)
          .order("created_at", { ascending: false })
          .limit(24);
      },
    });
}
export function oneCandidateAspirationsQueryOptions({candidate_id,aspiration_id}:{candidate_id: string, aspiration_id: string}) {
    return queryOptions({
      queryKey: ["candidates", candidate_id, "candidate_aspirations", aspiration_id],
      queryFn: async () => {
        return await supabase
          .from("candidate_aspirations")
          .select("*")
          .eq("id", aspiration_id)
          .single();
      },
    });
}
