import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listMCAsQueryOptions } from "./mcas-query-options";


interface MCAListProps {
  q: string;
}

export function MCAList({ q = "" }: MCAListProps) {
  const query = useSuspenseQuery(listMCAsQueryOptions({ search_query: q }));
  const data = query.data ?? [];
  const error = query.error ?? null;
  if (error) {
    return <TanstackSupabaseError error={error} />;
  }
  if (data.length < 1) {
    return <NoItemsFound />;
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="w-full h-full flex flex-wrap items-center justify-center gap-2">
        {data?.map((item, idx) => {
          return (
            <li
              // to="/candidates/$candidate/aspirations/$aspiration"
              // params={{ candidate: candidate_id, aspiration: item.id }}
              key={idx}
              className="w-[95%] p-2 sm:w-[45%] md:w-[30%]  flex flex-col hover:text-accent-text justify-center gap-2 bg-bg-emphasized rounded-lg">
              <div className="w-full flex gap-2 ">
                  <h1 className="text-4xl p-1 bg-bg-subtle">{item.id}</h1>
              <div className="w-full flex flex-col gap-2 ">
                <h1 className="text-xl">{item.name}</h1>
                {/* <h1 className="text-sm">{item.capital}</h1> */}
              </div>
                </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
