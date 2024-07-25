import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

interface ListCountyQueryOptions {
  search_query: string;
}

export function listCountyQueryOptions({ search_query }: ListCountyQueryOptions) {
  return queryOptions({
    queryKey: ["counties", search_query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("counties")
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

interface OneCountyQueryOptions {
  county_id: string;
}

export function oneCountiesQueryOptions({ county_id }: OneCountyQueryOptions) {
  return queryOptions({
    queryKey: ["counties", county_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("counties")
        .select("*")
        .eq("id", county_id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
