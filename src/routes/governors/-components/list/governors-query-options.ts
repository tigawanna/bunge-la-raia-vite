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
  ward_id: string;
}

export function oneCountiesQueryOptions({ ward_id }: OneGovernorsQueryOptions) {
  return queryOptions({
    queryKey: ["governors", ward_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("governors")
        .select("*")
        .eq("id", ward_id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
