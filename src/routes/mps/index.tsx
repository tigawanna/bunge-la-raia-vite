import { ErrorOutput } from "@/components/wrappers/ErrorOutput";
import { supabase } from "@/lib/supabase/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader, Trash } from "lucide-react";

export const Route = createFileRoute("/mps/")({
  component: MpsPage,
});

interface MpsPageProps {}

export function MpsPage({}: MpsPageProps) {
  const query = useSuspenseQuery({
    queryKey: ["mps"],
    queryFn: async() => {
      return await supabase.from("mps").select("*").limit(10).order("id", { ascending: true })
    },
  });
  const delete_mp_mutation = useMutation({
    mutationFn: async (id: number) => {
      return await supabase.from("mps").delete().eq("id", id)
    },
    onSuccess: (data) => {
      console.log("deletion result  ============ ",data)
      if(data.error){
        console.log("deletion error ============ ",data.error)
      }
      query.refetch()
    }
  })
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
      <h1 className="text-xl">Mps page</h1>{" "}
      {delete_mp_mutation.isPending && <Loader className="animate-spin" />}
      <ul className="w-full h-full  flex flex-col gap-2 items-center justify-center">
        {data?.map((mp) => {
          return (
            <li
              className="w-[95%] md:w-[45%] lg:w-[30%]  p-2 bg-bg-muted rounded-lg flex gap-2 justify-between items-center"
              key={mp.id}>
              {mp.name}
              <Trash onClick={() => delete_mp_mutation.mutate(mp.id)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
