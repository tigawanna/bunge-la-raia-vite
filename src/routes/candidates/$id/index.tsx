import { createFileRoute} from "@tanstack/react-router";
import { oneCandidatesQueryOptions } from "../-components/query";
import { OneCandidate } from "./-components/OneCandidate";

export const Route = createFileRoute("/candidates/$id/")({
  component: OneCandidatePage,
  loader: async ({ params, context }) => {
    context.queryClient.ensureQueryData(oneCandidatesQueryOptions(params.id));
  },
});

interface OneCandidatePageProps {}

export function OneCandidatePage({}: OneCandidatePageProps) {

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
        <OneCandidate/>
    </div>
  );
}
