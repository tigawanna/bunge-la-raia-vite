import { supabase } from "@/lib/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";


interface CandidatesListProps {
  q: string;
}

export function CandidatesList({ q }: CandidatesListProps) {
  const query = useSuspenseQuery({
    queryKey: ["candidates", q],
    queryFn: async () => {
      return await supabase
        .from("candidates")
        .select(
        `id,
          name,
          avatar_url,
          account_id,
          bio,
          created_at,
          embedding,
          gps,
          period,
          vibe_check,
          vying_for`
        )
        .ilike("name", `%${q}%`);
    },
  });
  const candidates = query.data.data ?? [];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="w-full h-full flex flex-wrap items-center gap-2 p-2">
        {candidates.map((item) => {
          return (
            <li
              key={item.id}
              className="w-[95%] sm:w-[45%] md:w-[30%] lg:w-[25%] p-2 bg-bg-muted rounded-lg flex flex-col gap-2">
              <div className="w-full flex items-center justify-between ">
                <h1 className="text-2xl">{item.name}</h1>
                <h4 className=" border-2 border-accent-fg px-1 rounded-lg">
                  vying for {item.vying_for}
                </h4>
              </div>
              <img
                src={item.avatar_url ?? "unknown.jpg"}
                alt={item.name}
                className="h-[50%]l aspect-square"
              />
              <p className="text-sm line-clamp-4 p-1">{item.bio}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
