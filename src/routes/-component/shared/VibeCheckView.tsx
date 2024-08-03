import { VibeCheckType } from "@/lib/supabase/extra-db-types";
import { CircleCheck,} from "lucide-react";
interface VibeCheckViewProps {
  vibe_check: VibeCheckType;
}

export function VibeCheckView({ vibe_check }: VibeCheckViewProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="flex h-full w-[90%] flex-col gap-3  p-2">
        {vibe_check.map((vibe, idx) => {
          return (
            <li
              key={idx}
              className="flex w-full flex-col gap-1 rounded-lg  border bg-bg-subtle p-3">
              <h2 className="text-sm border-b brightness-90">Q: {vibe.query}</h2>
              {/* <p className="pl-2 text-sm">A: {aspiration.answer}</p> */}
              {vibe.options ? (
                <div>
                  {vibe.options?.map(({ key, value }) => {
                    if (value == vibe.answer) {
                      return (
                        <p className="text-success text-sm flex items-center gap-1" key={key}>
                          <CircleCheck className="size-4" />
                          {value}
                        </p>
                      );
                    }
                    return <p className="text-sm brightness-50" key={key}>{value}</p>;
                  })}
                </div>
              ) : (
                <p className="text-sm text-success">A: {vibe.answer}</p>
              )}
            </li>
          );
        })}
      </ul>
      {/* <Accordion.Root multiple className="px-3">
        {vibe_check.map((vibe) => {
          return (
            <Accordion.Item key={vibe.query} value={vibe.query}>
              <Accordion.ItemTrigger>
                <p>Q: {vibe.query}</p>
                <Accordion.ItemIndicator>
                  <ChevronDownIcon />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                {vibe.options ? (
                  <div>
                    {vibe.options?.map(({ key, value }) => {
                      if (value == vibe.answer) {
                        return (
                          <p className="font-bold text-success flex items-center gap-1" key={key}>
                            <CircleCheck className="size-4" />
                            {value}
                          </p>
                        );
                      }
                      return <p key={key}>{value}</p>;
                    })}
                  </div>
                ) : (
                  <p>A: {vibe.answer}</p>
                )}
              </Accordion.ItemContent>
            </Accordion.Item>
          );
        })}
      </Accordion.Root> */}
    </div>
  );
}
