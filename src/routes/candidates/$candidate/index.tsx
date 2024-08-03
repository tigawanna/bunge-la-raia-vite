import { createFileRoute } from "@tanstack/react-router";
import { oneCandidateQueryOptions } from "../-components/candidate-query-options";
import { OneCandidate } from "../-components/candidates/views/OneCandidate";
import { z } from "zod";

const searchparams = z.object({
  aspsq: z.string().optional(),
});
export const Route = createFileRoute("/candidates/$candidate/")({
  component: OneCandidatePage,
  validateSearch: (search) => searchparams.parse(search),
  loader: async ({ params, context }) => {
    context.queryClient.ensureQueryData(
      oneCandidateQueryOptions({ candidate_id: params.candidate })
    );
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
