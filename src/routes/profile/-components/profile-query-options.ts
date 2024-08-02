import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export function oneUserQueryOptions({user_id}:{user_id: string}) {
  return queryOptions({
    queryKey: ["users", user_id],
    queryFn: async () => {
      return await supabase.from("users").select("*").eq("id", user_id).single();
    },
  });
}
