import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

interface ListGovernorsQueryOptions {
  search_query: string;
}

export function listGovernorsQueryOptions({ search_query }: ListGovernorsQueryOptions) {
  return queryOptions({
    queryKey: ["governors", search_query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("governors")
        .select("*")
        .ilike("name", `%${search_query}%`)
        // .order("code", { ascending: true })
        .limit(50);

      if (error) {
        throw error;
      }
      return data;
    },
  });
}

interface OneGovernorsQueryOptions {
  governor_id: string;
}

export function oneGovernorQueryOptions({ governor_id }: OneGovernorsQueryOptions) {
  return queryOptions({
    queryKey: ["governors", governor_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("governors")
        .select("*")
        .eq("id", governor_id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
