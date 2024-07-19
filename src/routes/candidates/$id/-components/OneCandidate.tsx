import { useParams } from "@tanstack/react-router";
import { oneCandidatesQueryOptions } from "../../-components/query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VibecheckForm } from "../../-components/form/vibe-check/VibecheckForm";

interface OneCandidateProps {

}

export function OneCandidate({}:OneCandidateProps){
const params = useParams({from: "/candidates/$id/" });
const query = useSuspenseQuery(oneCandidatesQueryOptions(params.id));
const data = query.data.data
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <h1 className="text-xl">{data?.name}</h1>
    <VibecheckForm candidate={data} />
  </div>
);
}
