import { Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { oneCandidateQueryOptions } from "../../candidate-query-options";
import { CandidateBasicDetailsDialog } from "../form/CandidateBasicDetailsDialog";
import { VibeCheckView } from "@/routes/-component/shared/vibe-check/VibeCheckView";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";
import { CandidateAspirations } from "../../aspirations/list/CandidateAspirations";
import { Edit, Sparkles } from "lucide-react";
import { CandidateRowType } from "../../types";

interface OneCandidateProps {}

export function OneCandidate({}: OneCandidateProps) {
  const params = useParams({ from: "/candidates/$candidate/" });
  const query = useSuspenseQuery(oneCandidateQueryOptions({ candidate_id: params.candidate }));
  const one_candidate = query.data.data;
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="w-full flex flex-col h-[200px] sm:h-[300px] items-center relative">
        <img
          src={one_candidate?.banner_url ?? "/black-flag.webp"}
          className="w-full h-[150px] sm:h-[200px] object-cover absolute top-0"
          onError={(e) => {
            e.currentTarget.src = "/black-flag.webp";
          }}
        />
        {viewer?.id === params.candidate && one_candidate && (
          <div className="absolute top-[2%] z-30 right-[2%]">
            <CandidateBasicDetailsDialog candidate={one_candidate as CandidateRowType} />
          </div>
        )}

        <div
          className="w-full flex sm:flex-row flex-col justify-center 
          sm:justify-between items-start sm:items-end gap-1 absolute top-[120px] bottom-0 left-0 z-20 
          p-4">
          <img
            src={one_candidate?.avatar_url ?? "/kenya-globe.png"}
            height={120}
            width={120}
            className="aspect-square sm:size-[150px] rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "/kenya-globe.png";
            }}
          />

          <div className=" flex flex-col h-fit justify-cente rrounded-lg p-1 gap-1">
            <h1 className="text-xl">{one_candidate?.name}</h1>
            {viewer?.id === params.candidate && (
              <Link
                to="/candidates/$candidate/update"
                className="bg-bg-default rounded-lg px-1 text-sm w-fit flex  justify-center items-center gap-2"
                params={{ candidate: params.candidate }}
                search={{ form_step: 0, basics: true }}>
                update <Edit className="size-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full  px-5 py-2  lg:max-w-[60%]">
        <h1 className=" ">bio</h1>
        <p className="text-sm">{one_candidate?.bio}</p>
      </div>

      <div className="w-full flex flex-col items-center gap-2  relative">
        {one_candidate?.vibe_check  && (
          <div className="w-full flex flex-col items-center gap-2 relative">
            <Link
              to="/candidates/$candidate/chat"
              params={{ candidate: params.candidate }}
              className="bg-bg-muted border border-accent-default rounded-lg p-2   flex gap-2 items-center justify-center">
              chat with candidate
              <Sparkles />
            </Link>
            <VibeCheckView vibe_check={one_candidate.vibe_check as VibeCheckType} />
          </div>
        )}
      </div>
      <p>{one_candidate?.candidate_summary}</p>

      {/* <OneCandidateAspirations candidate_id={params.candidate} /> */}
      <CandidateAspirations from="/candidates/$candidate" candidate_id={params.candidate} />
      <Link to="/candidates/$candidate/aspirations" params={{ candidate: params.candidate }}>
        show more
      </Link>
    </div>
  );
}
