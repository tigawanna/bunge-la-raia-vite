import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

interface ListMCAsQueryOptions {
  search_query: string;
}

export function listMCAsQueryOptions({ search_query }: ListMCAsQueryOptions) {
  return queryOptions({
    queryKey: ["mcas", search_query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mcas")
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

interface OneMCAsQueryOptions {
  mca_id: string;
}

export function oneMCAQueryOptions({ mca_id }: OneMCAsQueryOptions) {
  return queryOptions({
    queryKey: ["mcas", mca_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mcas")
        .select("*")
        .eq("id", mca_id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
