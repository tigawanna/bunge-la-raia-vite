import { Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { oneCandidateQueryOptions } from "../../candidate-query-options";
import { CandidateBasicDetailsDialog } from "../form/CandidateBasicDetailsDialog";
import { VibeCheckView } from "@/routes/-component/shared/VibeCheckView";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";

interface OneCandidateProps {}

export function OneCandidate({}: OneCandidateProps) {
  const params = useParams({ from: "/candidates/$candidate/" });
  const query = useSuspenseQuery(oneCandidateQueryOptions({ candidate_id: params.candidate }));
  const data = query.data.data;
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="w-full h-full flex flex-col justify-center items-center sm:flex-row gap-2 p-2 relative">
        <img
          height={200}
          width={200}
          className="aspect-square  o  rounded-lg"
          src={data?.avatar_url || ""}
          alt={data?.name}
        />
        <div className="w-full h-full flex flex-col p-2">
          <h1 className="text-2xl text-accent-text">{data?.name}</h1>
          <p className="text-sm md:line-clamp-6">{data?.bio}</p>
        </div>
        {viewer?.id === params.candidate && (
          <div className="absolute top-[2%] right-[2%]">
            <CandidateBasicDetailsDialog candidate={data} />
          </div>
        )}
        <div className="">
          <Link
            to="/candidates/$candidate/update"
            params={{ candidate: params.candidate }}
            search={{ form_step: 0 }}>
            update
          </Link>
        </div>
      </div>
      <div className="w-full">
        {/* @ts-expect-error */}
        {data?.vibe_check && data?.vibe_check.length > 0 && (
          <VibeCheckView vibe_check={data.vibe_check as VibeCheckType} />
        )}
      </div>
      <p>{data?.candidate_summary}</p>
      <Link to="/candidates/$candidate/aspirations" params={{ candidate: params.candidate }}>
        show more
      </Link>
      {/* <OneCandidateAspirations candidate_id={params.candidate} /> */}
    </div>
  );
}
