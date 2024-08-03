import { useParams, Navigate, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { oneCandidateQueryOptions } from "../../candidate-query-options";
import { toaster } from "@/components/navigation/ParkuiToast";
import { CandidateForm } from "./CandidateForm";

interface UpdateCandidateFormProps {

}

export function UpdateCandidateForm({}: UpdateCandidateFormProps) {
  const { candidate } = useParams({
    from: "/candidates/$candidate/update",
  });
    const { basics } = useSearch({
      from: "/candidates/$candidate/update",
    });

  const query = useSuspenseQuery(oneCandidateQueryOptions({ candidate_id: candidate }));
  const one_candidate = query.data?.data;

  if (!one_candidate) {
    toaster.create({
      title: "Aspiration not found",
      description: "Redirecting back to candidates dashboard",
      type: "info",
    });
    return <Navigate to="/candidates/$candidate" params={{ candidate }} />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <CandidateForm candidate={one_candidate as any} start_from_basics={basics}/>
    </div>
  );
}
