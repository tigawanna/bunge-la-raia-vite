import { createFileRoute } from "@tanstack/react-router";
import { oneCandidatesQueryOptions } from "../-components/query";
import { OneCandidate } from "./-components/OneCandidate";
import { z } from "zod";

const searchparams = z.object({
  aspsq: z.string().optional(),
});

export const Route = createFileRoute("/candidates/$id/")({
  component: OneCandidatePage,
  validateSearch: (search) => searchparams.parse(search),
  loader: async ({ params, context }) => {
    context.queryClient.ensureQueryData(oneCandidatesQueryOptions(params.id));
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
