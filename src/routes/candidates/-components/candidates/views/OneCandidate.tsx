import { Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { oneCandidateQueryOptions } from "../../candidate-query-options";
import { CandidateBasicDetailsDialog } from "../form/CandidateBasicDetailsDialog";
import { VibeCheckView } from "@/routes/-component/shared/VibeCheckView";
import { VibeCheckType } from "@/lib/supabase/extra-db-types";
import { CandidateAspirations } from "../../aspirations/list/CandidateAspirations";
import Avatar from "boring-avatars";
import { Edit } from "lucide-react";

interface OneCandidateProps {}

export function OneCandidate({}: OneCandidateProps) {
  const params = useParams({ from: "/candidates/$candidate/" });
  const query = useSuspenseQuery(oneCandidateQueryOptions({ candidate_id: params.candidate }));
  const data = query.data.data;
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;

  return (
    <div className="w-full h-full flex flex-col p-2">
      <div className="w-full flex flex-col h-[200px] sm:h-[300px] items-center relative">
        <img
          src={viewer?.banner_url ?? "/black-flag.webp"}
          className="w-full h-[150px] sm:h-[200px] object-cover absolute top-0"
          onError={(e) => {
            e.currentTarget.src = "/black-flag.webp";
          }}
        />
        {viewer?.id === params.candidate && (
          <div className="absolute top-[2%] z-30 right-[2%]">
            <CandidateBasicDetailsDialog candidate={data} />
          </div>
        )}

        <div
          className="w-full flex sm:flex-row flex-col justify-center 
          sm:justify-between items-start sm:items-end gap-1 absolute top-[120px] bottom-0 left-0 z-20 
          p-4">
          {viewer?.avatar_url ? (
            <img
              src={viewer?.avatar_url}
              height={120}
              width={120}
              className="aspect-square sm:size-[150px] rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/kenya-globe.png";
              }}
            />
          ) : (
            <Avatar name={viewer?.email || "Maria Mitchell"} size={120} variant="bauhaus" />
          )}
          <div className=" flex flex-col h-fit justify-cente rrounded-lg p-1">
            <h1 className="text-xl">{viewer?.username}</h1>
            {viewer && (
              <Link
                to="/candidates/$candidate/update"
                className="border rounded-lg px-1 w-fit flex gap-2 justify-center items-center"
                params={{ candidate: params.candidate }}
                search={{ form_step: 0,basics:true }}>
                update <Edit className="size-3"/>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full  px-5 py-2  lg:max-w-[60%]">
        <h1 className=" ">bio</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga provident deserunt saepe
          odit in illo, eius hic cumque, minus reiciendis nisi, veritatis ut doloremque quaerat et
          quis magni culpa autem! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga
          provident deserunt saepe odit in illo, eius hic cumque, minus reiciendis nisi, veritatis
          ut doloremque quaerat et quis magni culpa autem! Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Fuga provident deserunt saepe odit in illo, eius hic cumque, minus
          reiciendis nisi, veritatis ut doloremque quaerat et quis magni culpa autem!
          {data?.bio}
        </p>
      </div>

      <div className="w-full">
        {/* @ts-expect-error */}
        {data?.vibe_check && data?.vibe_check.length > 0 && (
          <VibeCheckView vibe_check={data.vibe_check as VibeCheckType} />
        )}
      </div>
      <p>{data?.candidate_summary}</p>

      {/* <OneCandidateAspirations candidate_id={params.candidate} /> */}
      <CandidateAspirations from="/candidates/$candidate" candidate_id={params.candidate} />
      <Link to="/candidates/$candidate/aspirations" params={{ candidate: params.candidate }}>
        show more
      </Link>
    </div>
  );
}
