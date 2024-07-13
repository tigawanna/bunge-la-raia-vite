import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { supabase } from "@/lib/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mps/")({
  component: MpsPage,
});

interface MpsPageProps {}

export function MpsPage({}: MpsPageProps) {
  const query = useSuspenseQuery({
    queryKey: ["mps"],
    queryFn: async() => {
      return await supabase.from("mps").select("*").limit(10);
    },
  });
  const data = query.data.data
  const error = query.error

  if (error) {
    return (
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
        <ErrorOutput error={error} />
      </div>
    );
  }
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center gap-2 ">
      <h1 className="text-xl">Mps page</h1>
      <ul className="w-full h-full  flex flex-wrap  items-center justify-center">
        {data?.map((mp) => {
          return (
            <li className="w-[95%] md:w-[45%] lg:w-[30%]  p-2 bg-bg-muted rounded-lg" key={mp.id}>
              {mp.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
