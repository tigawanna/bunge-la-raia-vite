import { VibeCheckType } from "@/lib/supabase/extra-db-types";
import { VibeCheckView } from "@/routes/-component/shared/vibe-check/VibeCheckView";
import { Link } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { CandidateAspirationRowType } from "../types";

interface AspirationsViewProps {
  aspiration: CandidateAspirationRowType;
  candidate_id: string;
  viewer_id?: string;
}

export function AspirationsView({ aspiration, candidate_id, viewer_id }: AspirationsViewProps) {
  const vibes = aspiration.vibe_check as VibeCheckType;
  return (
    <div className="w-full h-full  flex flex-col gap-2 bg-bg-muted p-5 rounded-lg">
      <div className="w-full h-full  flex flex-col gap-3">
        <div className="w-full flex flex-col md:flex-row items-center underline underline-offset-8 text-3xl font-bold justify-center gap-2">
          <Link
            className="hover:text-accent-text hover:text-underline"
            to="/candidates/$candidate/aspirations/$aspiration"
            params={{ candidate: candidate_id, aspiration: aspiration.id }}>
            vying for {aspiration.vying_for} {new Date(aspiration.period).getFullYear()}
          </Link>
          {viewer_id === candidate_id && (
            <Link
              className="hover:text-accent-text hover:text-underline"
              to="/candidates/$candidate/aspirations/$aspiration/update"

              params={{ candidate: candidate_id, aspiration: aspiration.id }}
              search={{ form_step: 0, is_fresh: true,basics:true }}>
              <Edit />
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center justify-items-start gap-1 p-3">
          <h2 className="text-xl font-bold">Mission Statement</h2>
          <p className="text-balance text-center px-[5%] py-[1%] rounded-lg  text-sm">
            {aspiration.mission_statement}
          </p>
        </div>
        {vibes && vibes.length > 0 && (
          <div className="flex flex-col justify-center items-center gap-1 bg-bg-muted">
            <h2 className="text-xl font-bold">vibecheck </h2>
            <div className="w-full">
              {vibes && vibes.length > 0 && (
                <VibeCheckView vibe_check={vibes} />
              )}
            </div>
      
          </div>
        )}
      </div>
    </div>
  );
}
0;
