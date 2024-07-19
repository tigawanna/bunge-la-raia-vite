import { supabase } from "@/lib/supabase/client";
import { queryOptions } from "@tanstack/react-query";

export const candidatesQueryOptions = queryOptions({
  queryKey: ["candidates"],
  queryFn: async () => {
    return await supabase.from("candidates").select("*").order("created_at", { ascending: false });
  },
});
export const oneCandidatesQueryOptions =(id:string)=> queryOptions({
  queryKey: ["candidates"],
  queryFn: async () => {
    return await supabase.from("candidates").select("*").eq("id", id).single();
  },
});
