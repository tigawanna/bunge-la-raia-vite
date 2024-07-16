import { supabase } from "@/lib/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface CandidatesListProps {
  q: string;
}

export function CandidatesList({ q }: CandidatesListProps) {
  const query = useSuspenseQuery({
    queryKey: ["candidates", q],
    queryFn: async () => {
      return await supabase.from("candidates").select("*").ilike("name", `%${q}%`);
    },
  });
  console.log("================= CandidatesList.tsx query.data ================= ", query.data);
  return <div className="w-full h-full flex flex-col items-center justify-center">candidats</div>;
}
