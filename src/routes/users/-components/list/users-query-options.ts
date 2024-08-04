import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

interface ListUsersQueryOptions {
  search_query: string;
}

export function listUsersQueryOptions({ search_query }: ListUsersQueryOptions) {
  return queryOptions({
    queryKey: ["users", search_query],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .ilike("username", `%${search_query}%`)
        // .order("code", { ascending: true })
        .limit(50);

      if (error) {
        throw error;
      }
      return data;
    },
  });
}

interface OneUsersQueryOptions {
  user_id: string;
}

export function oneUsersQueryOptions({ user_id }: OneUsersQueryOptions) {
  return queryOptions({
    queryKey: ["users", user_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user_id)
        .single();

      if (error) {
        throw error;
      }
      return data;
    },
  });
}
