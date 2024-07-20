import { createFileRoute, useParams } from "@tanstack/react-router";
import { CandidateAspirations } from "./-components/list/CandidateAspirations";
import { z } from "zod";

const searchparams = z.object({
  aspsq: z.string().optional(),
});

export const Route = createFileRoute("/candidates/$id/aspirations/")({
  component: OneCandidateAspirationsPage,
  validateSearch: (search) => searchparams.parse(search),
});

interface OneCandidateAspirationsPageProps {}

export function OneCandidateAspirationsPage({}: OneCandidateAspirationsPageProps) {
  const params = useParams({ from: "/candidates/$id/aspirations/" });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <CandidateAspirations candidate_id={params.id} />
    </div>
  );
}
