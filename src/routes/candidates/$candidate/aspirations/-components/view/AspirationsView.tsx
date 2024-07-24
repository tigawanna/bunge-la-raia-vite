import { AspirationsRowType, VibeCheckType } from "@/lib/supabase/extra-db-types";
import { Link } from "@tanstack/react-router";
import { Edit } from "lucide-react";

interface AspirationsViewProps {
  aspiration: AspirationsRowType["Row"];
  candidate_id: string;
  viewer_id?: string;
}

export function AspirationsView({ aspiration, candidate_id, viewer_id }: AspirationsViewProps) {
  const vibes = aspiration.vibe_check as VibeCheckType;
  return (
    <div className="w-full h-full  flex flex-col gap-2">
      <div className="w-full h-full  flex flex-col gap-3">
        <div className="w-full flex flex-col md:flex-row items-center underline underline-offset-8 text-3xl font-bold justify-center gap-2">
          <h1 className="">
            vying for {aspiration.vying_for} {new Date(aspiration.period).getFullYear()}
          </h1>
          {viewer_id === candidate_id && (
            <Link
              to="/candidates/$candidate/aspirations/$aspiration/update"
              params={{ candidate: candidate_id, aspiration: aspiration.id }}>
              <Edit />
            </Link>
          )}
        </div>

        <div className="flex flex-col items-center justify-items-start gap-1 p-3">
          <h2 className="text-xl font-bold">Mission Statement</h2>
          <p className="text-balance text-center px-[5%] py-[1%] rounded-lg bg-bg-muted text-sm">
            {aspiration.mission_statement}
          </p>
        </div>
        {vibes && vibes.length > 0 && (
          <div className="flex flex-col justify-center items-center gap-1 bg-bg-muted">
            <h2 className="text-xl font-bold">vibecheck </h2>
            <ul className="flex h-full w-[90%] flex-col gap-3  p-2">
              {vibes.map((aspiration, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex w-full flex-col gap-1 rounded-lg  border bg-bg-subtle p-3">
                    <h2 className="text-sm border-b">Q: {aspiration.query}</h2>
                    <p className="pl-2 text-sm">A: {aspiration.answer}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
0;
