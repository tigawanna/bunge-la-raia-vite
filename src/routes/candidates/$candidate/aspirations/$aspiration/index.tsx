import { createFileRoute, useParams } from "@tanstack/react-router";
import { OneAspiration } from "../-components/view/OneAspiration";
import { oneCandidateAspirationsQueryOptions } from "../-components/list/aspiration-query-options";

export const Route = createFileRoute("/candidates/$candidate/aspirations/$aspiration/")({
  component: OneAspirationPage,
  loader({ context, params: { aspiration, candidate } }) {
    context.queryClient.ensureQueryData(
      oneCandidateAspirationsQueryOptions({ aspiration_id: aspiration, candidate_id: candidate })
    );
  },
});

interface OneAspirationPageProps {}

export function OneAspirationPage({}: OneAspirationPageProps) {
  const { aspiration, candidate } = useParams({
    from: "/candidates/$candidate/aspirations/$aspiration/",
  });
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <OneAspiration aspiration_id={aspiration} candidate_id={candidate} />
    </div>
  );
}
