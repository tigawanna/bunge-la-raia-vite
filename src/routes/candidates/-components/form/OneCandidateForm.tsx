import { supabase } from "@/lib/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CandidateBasicDetailsForm } from "./basics-details/CandidateBasicDetailsForm";

interface OneCandidateFormProps {
  candidate_id: string;
}

export function OneCandidateForm({ candidate_id }: OneCandidateFormProps) {
  const query = useSuspenseQuery({
    queryKey: ["candidates", candidate_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .eq("id", candidate_id)
        .select()
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
  const candidate = query?.data;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <CandidateBasicDetailsForm candidate={candidate} />
    </div>
  );
}
