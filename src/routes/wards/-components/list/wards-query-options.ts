import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

interface ListWardQueryOptions {
  search_query: string;
}

export function listWardQueryOptions({ search_query }: ListWardQueryOptions) {
  return queryOptions({
    queryKey: ["wards", search_query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wards")
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

interface OneWardQueryOptions {
  ward_id: string;
}

export function oneCountiesQueryOptions({ ward_id }: OneWardQueryOptions) {
  return queryOptions({
    queryKey: ["wards", ward_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wards")
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
