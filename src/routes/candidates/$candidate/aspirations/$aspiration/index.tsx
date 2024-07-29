import { createFileRoute, useParams } from "@tanstack/react-router";
import { oneCandidateAspirationsQueryOptions } from "../../../-components/aspirations/list/aspiration-query-options";
import { OneAspiration } from "../../../-components/aspirations/view/OneAspiration";


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
