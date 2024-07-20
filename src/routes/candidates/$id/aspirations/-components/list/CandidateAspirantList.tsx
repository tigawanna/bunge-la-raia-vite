import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { supabase } from "@/lib/supabase/client";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";

interface CandidateAspirantListProps {
  q?: string;
  candidate_id: string;
}

export function CandidateAspirantList({ q="", candidate_id }: CandidateAspirantListProps) {
  const query = useSuspenseQuery({
    queryKey: ["candidates",candidate_id,"candidate_aspirations", q],
    queryFn: async () => {
      return await supabase
        .from("candidate_aspirations")
        .select("*")
        .eq("id", candidate_id)
        // .ilike("name", `%${q}%`)
        .order("created_at", { ascending: false })
        .limit(24);
    },
  });
  const data = query.data.data ?? [];
  const error = query.data.error || query.error
  if(error){
    return <TanstackSupabaseError error={error} />;
  }
  if(data.length<1){
    return <NoItemsFound/>
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {data?.map((item, idx) => {
        return (
          <div
            key={idx}
            className="w-[95%]  flex flex-col gap-2">
            <div className="w-full flex flex-col items-center justify-evenly ">
              <h1 className="text-2xl">{item.vying_for}</h1>
              <h1 className="text-2xl">{item.period}</h1>
              <h1 className="text-2xl">{item.created_at}</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
