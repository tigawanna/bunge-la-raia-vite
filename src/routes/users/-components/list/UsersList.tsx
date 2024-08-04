import { NoItemsFound } from "@/components/wrappers/NoItemsFond";
import { TanstackSupabaseError } from "@/lib/supabase/components/TanstackSupabaseError";
import { useSuspenseQuery } from "@tanstack/react-query";
import { listUsersQueryOptions } from "./users-query-options";
import Avatar from "boring-avatars";
import { Link } from "@tanstack/react-router";

interface UsersListProps {
  q: string;
}

export function UsersList({ q = "" }: UsersListProps) {
  const query = useSuspenseQuery(listUsersQueryOptions({ search_query: q }));
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
            <Link
              to="/users/$user"
              params={{ user: item.id }}
              key={idx}
              className="w-[95%] p-2 sm:w-[45%] md:w-[30%]  flex flex-col hover:text-accent-text justify-center gap-2 bg-bg-emphasized rounded-lg">
              <div className="w-full flex  gap-2 ">
                {item?.avatar_url ? (
                  <img
                    src={item?.avatar_url}
                    className="size-[50px] rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = "https://picsum.photos/50/50";
                    }}
                  />
                ) : (
                  <Avatar name={item.email || "Maria Mitchell"} size={50} variant="bauhaus" />
                )}

                <div className="w-full flex flex-col  ">
                  <h1 className="text-xl">{item.username}</h1>
                  <p className="text-xs brightness-90">{item.email}</p>
                </div>
              </div>
              <h1 className="text-xs line-clamp-2 p-1">{item.bio}</h1>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
