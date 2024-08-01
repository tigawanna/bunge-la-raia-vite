import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { listCandidateQueryOptions } from "../../candidate-query-options";

interface CandidatesListProps {
  q: string;
}

export function CandidatesList({ q }: CandidatesListProps) {
  const query = useSuspenseQuery(
    listCandidateQueryOptions({
      search_query: q,
    })
  );
  const data = query.data?.data ?? [];
    const error = query.data.error || query.error;
    if (error) {
      return <TanstackSupabaseError error={error} />;
    }
    if (data.length < 1) {
      return <NoItemsFound />;
    }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="w-full h-full flex flex-wrap items-center gap-2 p-2 
      justify-center md:justify-start">
        {data.map((item) => {
          return (
            <Link
              to="/candidates/$candidate"
              params={{ candidate: item.id }}
              key={item.id}
              className="min-h-[300px] md:h-[300px] w-[95%] sm:w-[45%] md:w-[30%] lg:w-[25%] p-2 
              bg-bg-muted rounded-lg flex flex-col  gap-2 hover:text-accent-text relative">
              <img
                src={item.avatar_url ?? "unknown.jpg"}
                alt={item.name}
                className="size-full  object-cover rounded-lg absolute inset-0"
              />
              <div className="w-full absolute z-20 bottom-0 left-0 right-0 p-2 bg-slate-900/50">
                <h1 className="text-2xl">{item.name}</h1>
              <p className="text-sm line-clamp-2 ">{item.bio}</p>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
