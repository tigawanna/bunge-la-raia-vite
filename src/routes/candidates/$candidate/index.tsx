import { createFileRoute } from "@tanstack/react-router";
import { oneCandidatesQueryOptions } from "../-components/query";
import { OneCandidate } from "./-components/OneCandidate";




export const Route = createFileRoute("/candidates/$candidate/")({
  component: OneCandidatePage,

  loader: async ({ params, context }) => {
    context.queryClient.ensureQueryData(oneCandidatesQueryOptions(params.candidate));
  },
});

interface OneCandidatePageProps {}

export function OneCandidatePage({}: OneCandidatePageProps) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center ">
      <OneCandidate />
    </div>
  );
}
