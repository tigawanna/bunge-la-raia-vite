import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { supabase } from "@/lib/supabase/client";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

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
        .eq("candidate_id", candidate_id)
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
    <ul className="w-full h-full flex flex-wrap items-center justify-center gap-2">
      {data?.map((item, idx) => {
        return (
          <Link
            to="/candidates/$candidate/aspirations/$aspiration"
            params={{ candidate: candidate_id, aspiration: item.id }}
            key={idx}
            className="w-[95%] sm:w-[45%] md:w-[30%]  flex flex-col hover:text-accent-text justify-center gap-2 bg-bg-emphasized p-1 rounded-lg">
            <div className="w-full flex flex-col gap-2 p-1 ">
              <h1 className="text-xl">{item.vying_for}</h1>
              <h1 className="text-sm">{item.period}</h1>

            </div>
          </Link>
        );
      })}
    </ul>
    </div>
  );
}
