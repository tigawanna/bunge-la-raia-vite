import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

interface ListConstituenciesQueryOptions {
  search_query: string;
}

export function listConstituenciesQueryOptions({ search_query }: ListConstituenciesQueryOptions) {
  return queryOptions({
    queryKey: ["constituencies", search_query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("constituencies")
        .select("*")
        .ilike("name", `%${search_query}%`)
        .order("code", { ascending: true })
        .limit(50);

      if (error) {
        throw error;
      }
      return data;
    },
  });
}

interface OneConstituencyQueryOptions {
  constituency_id: string;
}

export function oneCountiesQueryOptions({ constituency_id }: OneConstituencyQueryOptions) {
  return queryOptions({
    queryKey: ["constituencies", constituency_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("constituencies")
        .select("*")
        .eq("id", constituency_id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
