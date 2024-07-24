import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { listCandidateQueryOptions } from "../candidate-query-options";

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
      <ul className="w-full h-full flex flex-wrap items-center gap-2 p-2">
        {data.map((item) => {
          return (
            <Link
              to="/candidates/$candidate"
              params={{ candidate: item.id }}
              key={item.id}
              className="w-[95%] sm:w-[45%] md:w-[30%] lg:w-[25%] p-2 bg-bg-muted rounded-lg flex flex-col gap-2">
              <div className="w-full flex items-center justify-between ">
                <h1 className="text-2xl">{item.name}</h1>
              </div>
              <img
                src={item.avatar_url ?? "unknown.jpg"}
                alt={item.name}
                className="h-[50%]l aspect-square"
              />
              <p className="text-sm line-clamp-4 p-1">{item.bio}</p>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
