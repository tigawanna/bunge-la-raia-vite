import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { supabase } from "@/lib/supabase/client";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { VibeCheckType } from "@/lib/supabase/custom-db-types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

interface OneCandidateAspirationsProps {
  candidate_id: string;
}

export function OneCandidateAspirations({ candidate_id }: OneCandidateAspirationsProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery.data.data;
  const query = useSuspenseQuery({
    queryKey: ["candidates", candidate_id, "candidate_aspirations"],
    queryFn: async () => {
      return await supabase
        .from("candidate_aspirations")
        .select("*")
        .eq("id", candidate_id)
        // .ilike("name", `%${q}%`)
        .order("created_at", { ascending: false })
        .limit(1);
    },
  });
  const data = query.data.data ?? [];
  const error = query.data.error || query.error;
  if (error) {
    return <TanstackSupabaseError error={error} />;
  }
  if (data.length < 1 && viewer?.id === candidate_id) {
    return (
      <div className="w-full h-full min-h-[50vh] flex flex-col items-center justify-center bg-bg-muted">
        <Link className="flex gap-2 items-center justify-center rounded-lg bg-accent-default p-3 hover:bg-accent-emphasized " to="/candidates/$id/aspirations/new" params={{ id: candidate_id }}>
          add your candidate aspiration <Plus/>
        </Link>
      </div>
    );
  }
  if (data.length < 1) {
    return <NoItemsFound />;
  }
  const item = data[0];
  const vibes = item.vibe_check as VibeCheckType
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[95%]  flex flex-col gap-2">
        <div className="w-full flex flex-col items-center justify-evenly ">
          <h1 className="text-2xl">{item.vying_for}</h1>
          <h1 className="text-2xl">{item.period}</h1>
          <h1 className="text-2xl">{item.created_at}</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-evenly ">
          <p className="text-sm">{item.mission_statement}</p>
          <ul className="flex h-full w-[90%] flex-col gap-3  p-5">
            {vibes.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="flex w-full flex-col gap-1 rounded-lg  border bg-bg-subtle p-3">
                  <h2 className="text-sm border-b">Q: {item.query}</h2>
                  <p className="pl-2 text-sm">A: {item.answer}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Link to="/candidates/$id/aspirations" params={{ id: candidate_id }}>
        show more
      </Link>
    </div>
  );
}
