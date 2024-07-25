import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AspirationsView } from "./AspirationsView";
import { Loader } from "lucide-react";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { oneCandidateAspirationsQueryOptions } from "../list/aspiration-query-options";

interface OneAspirationProps {
  candidate_id: string;
  aspiration_id: string;
}

export function OneAspiration({ aspiration_id, candidate_id }: OneAspirationProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery.data.data;
  const query = useSuspenseQuery(
    oneCandidateAspirationsQueryOptions({
      candidate_id,
      aspiration_id,
    })
  );
  const data = query.data.data;
  const error = query.data.error || query.error;
  if (error) {
    return <TanstackSupabaseError error={error} />;
  }
  if (query.isPending) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center min-h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if (!data) {
    return <NoItemsFound />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AspirationsView aspiration={data} candidate_id={candidate_id} viewer_id={viewer?.id} />
    </div>
  );
}
