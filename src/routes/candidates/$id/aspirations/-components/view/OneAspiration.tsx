import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { supabase } from "@/lib/supabase/client";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AspirationsView } from "./AspirationsView";

interface OneAspirationProps {
  candidate_id: string;
  aspiration_id: string;
}

export function OneAspiration({ aspiration_id, candidate_id }: OneAspirationProps) {
  const query = useSuspenseQuery({
    queryKey: ["candidates", candidate_id, "candidate_aspirations", aspiration_id],
    queryFn: async () => {
      return await supabase
        .from("candidate_aspirations")
        .select("*")
        .eq("id", candidate_id)
        .eq("id", aspiration_id)
        .single();
    },
  });
  const data = query.data.data;
  const error = query.data.error || query.error;
  if (error) {
    return <TanstackSupabaseError error={error} />;
  }
  if (!data) {
    return <NoItemsFound />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AspirationsView aspiration={data} />
    </div>
  );
}
