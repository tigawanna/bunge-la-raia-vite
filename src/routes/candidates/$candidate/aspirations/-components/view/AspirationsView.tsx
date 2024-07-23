import { AspirationsRowType, VibeCheckType } from "@/lib/supabase/extra-db-types";



interface AspirationsViewProps {
  aspiration: AspirationsRowType["Row"]
}

export function AspirationsView({aspiration}:AspirationsViewProps){
    const vibes = aspiration.vibe_check as VibeCheckType;
    return (
      <div className="w-full h-full  flex flex-col gap-2">
      <div className="w-full h-full  flex flex-col gap-2 p-5">
        <div className="w-full flex flex-col md:flex-row items-center  gap-2 text-lg">
          <h1 className="">vying for: {aspiration.vying_for}</h1>
          <h1 className="">{new Date(aspiration.period).getFullYear()}</h1>
   
        </div>
        <div className="w-full flex flex-col p-2 ">
          <div className="text-sm flex flex-col gap-1">
            <span>Mission Statement</span>
            {aspiration.mission_statement}</div>
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
      </div>
    );
}
