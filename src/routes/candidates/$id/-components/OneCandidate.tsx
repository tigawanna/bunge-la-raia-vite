import { Link, useParams } from "@tanstack/react-router";
import { oneCandidatesQueryOptions } from "../../-components/query";
import { useSuspenseQuery } from "@tanstack/react-query";


interface OneCandidateProps {}

export function OneCandidate({}: OneCandidateProps) {
  const params = useParams({ from: "/candidates/$id/" });
  const query = useSuspenseQuery(oneCandidatesQueryOptions(params.id));
  const data = query.data.data;

  return (
    <div className="w-full h-full flex flex-col p-2">
      <h1 className="text-xl">{data?.name}</h1>
      <Link to="/candidates/$id/aspirations" params={{ id: params.id }}>show more</Link>
     
    </div>
  );
}
