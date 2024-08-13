import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { toaster } from "@/components/navigation/ParkuiToast";
import { CandidateRowType } from "@/routes/candidates/-components/types";
import { VibesFormType } from "./types";



interface VibecheckFormProps {
  vibe: VibesFormType;
  candidate: CandidateRowType
}
export function useVibeCheckMutation() {

  return useMutation({
    mutationFn: async ({ candidate, vibe }: VibecheckFormProps) => {
      return supabase.from("candidates").update({
        ...candidate,
        vibe_check: vibe,
      });
    },
    onSuccess: () => {

      toaster.create({
        title: "Vibe checked",
        type: "success",
      });
    },
    onError: (error) => {
      toaster.create({
        title: "Something went wrong",
        description: `${error.message}`,
        type: "error",
        duration: 20000,
      });
    },
  });
}
