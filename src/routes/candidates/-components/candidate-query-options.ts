import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export function listCandidateQueryOptions({search_query}:{search_query: string}) {
  return queryOptions({
    queryKey: ["candidates", search_query],
    queryFn: async () => {
      return await supabase
        .from("candidates")
        .select("*")
        .ilike("name", `%${search_query}%`)
        .order("created_at", { ascending: false })
        .limit(24);
    },
  });
}

export function oneCandidateQueryOptions({candidate_id}:{candidate_id: string}) {
  return queryOptions({
    queryKey: ["candidates", candidate_id],
    queryFn: async () => {
      return await supabase.from("candidates").select("*").eq("id", candidate_id).single();
    },
  });
}
