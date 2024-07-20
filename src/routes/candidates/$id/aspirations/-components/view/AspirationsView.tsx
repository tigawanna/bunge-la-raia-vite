import { AspirationsRowType, VibeCheckType } from "@/lib/supabase/extra-db-types";



interface AspirationsViewProps {
  aspiration: AspirationsRowType["Row"]
}

export function AspirationsView({aspiration}:AspirationsViewProps){
    const vibes = aspiration.vibe_check as VibeCheckType;
    return (
      <div className="w-full h-full p-2  flex flex-col gap-2">
        <div className="w-full flex flex-col items-center justify-evenly ">
          <h1 className="text-2xl">{aspiration.vying_for}</h1>
          <h1 className="text-2xl">{aspiration.period}</h1>
          <h1 className="text-2xl">{aspiration.created_at}</h1>
        </div>
        <div className="w-full flex flex-col items-center justify-evenly ">
          <p className="text-sm">{aspiration.mission_statement}</p>
          <ul className="flex h-full w-[90%] flex-col gap-3  p-5">
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
      </div>
    );
}
