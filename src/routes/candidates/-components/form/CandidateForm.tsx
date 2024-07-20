import { supabase } from "@/lib/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BasicDetails } from "./basics-details/BasicDetails";

interface CandidateFormProps {
  id?: string;
}

export function CandidateForm({ id }: CandidateFormProps) {
  const query = useSuspenseQuery({
    queryKey: ["candidates", id],
    queryFn: async () => {
      if (!id) {
        return new Promise<{ data: undefined }>((resolve, _) => {
          resolve({ data: undefined });
        });
      } else {
        const candidate = await supabase.from("candidates").select("*").eq("id", id).single();
        return candidate;
      }
    },
  });
  const candidate = query?.data?.data;

  return (
    <div className="w-full h-full flex flex-col p-2 gap-4 items-center justify-center">
      <div className="w-full h-full flex p-2 gap-4 items-center justify-center ">
        <BasicDetails candidate={candidate} />
      </div>
    </div>
  );
}
