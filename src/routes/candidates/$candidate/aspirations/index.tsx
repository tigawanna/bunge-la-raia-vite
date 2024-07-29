import { createFileRoute, useParams } from "@tanstack/react-router";
import { z } from "zod";
import { listCandidateAspirationsQueryOptions } from "../../-components/aspirations/list/aspiration-query-options";
import { CandidateAspirations } from "../../-components/aspirations/list/CandidateAspirations";

const searchparams = z.object({
  aspsq: z.string().optional(),
});

export const Route = createFileRoute("/candidates/$candidate/aspirations/")({
  component: OneCandidateAspirationsPage,
  validateSearch: (search) => searchparams.parse(search),
  async loader({ context, params }) {
    return context.queryClient.ensureQueryData(
      listCandidateAspirationsQueryOptions({ candidate_id: params.candidate, search_query: "" })
    );
  },
});

interface OneCandidateAspirationsPageProps {}

export function OneCandidateAspirationsPage({}: OneCandidateAspirationsPageProps) {
  const params = useParams({ from: "/candidates/$candidate/aspirations/" });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <CandidateAspirations candidate_id={params.candidate} />
    </div>
  );
}
