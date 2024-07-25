import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

interface ListMPsQueryOptions {
  search_query: string;
}

export function listMPsQueryOptions({ search_query }: ListMPsQueryOptions) {
  return queryOptions({
    queryKey: ["mps", search_query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mps")
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

interface OneMPsQueryOptions {
  mp_id: string;
}

export function oneMPsQueryOptions({ mp_id }: OneMPsQueryOptions) {
  return queryOptions({
    queryKey: ["mps", mp_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mps")
        .select("*")
        .eq("id", mp_id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
