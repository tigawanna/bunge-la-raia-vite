import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { oneCandidateQueryOptions } from "../../-components/candidate-query-options";


export const Route = createFileRoute("/candidates/$candidate/update/")({
  component: AspirationsPage,
});

interface AspirationsPageProps {}

export function AspirationsPage({}: AspirationsPageProps) {
  const params = useParams({ from: "/candidates/$candidate/" });
  const query = useSuspenseQuery(oneCandidateQueryOptions({ candidate_id: params.candidate }));
  const data = query.data
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl">Aspirations page</h1>
    </div>
  );
}
