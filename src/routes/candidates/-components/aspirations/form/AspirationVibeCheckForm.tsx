import { toaster } from "@/components/navigation/ParkuiToast";
import { supabase } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { CandidateAspirationRowType } from "../types";
import { VibecheckForm } from "@/components/forms/vibe-check/VibecheckForm";
import { VibecheckFormMutationProps } from "@/components/forms/vibe-check/types";
import { aspirant_questions } from "./aspirant-questions";

interface AspirationVibeCheckFormProps {
  candidate_id: string;
  aspiration: CandidateAspirationRowType;
  next: () => void;
}

export function AspirationVibeCheckForm({
  aspiration,
  candidate_id,
  next,
}: AspirationVibeCheckFormProps) {
  const { form_step } = useSearch({
    from: "/candidates/$candidate/aspirations/$aspiration/update",
  });
  const navigate = useNavigate({
    from: "/candidates/$candidate/aspirations/$aspiration/update",
  });
  const mutation = useMutation({
    mutationFn: async ({ vibe }: VibecheckFormMutationProps) => {
      const { error } = await supabase
        .from("candidate_aspirations")
        .update({
          vibe_check: vibe,
        })
        .eq("id", aspiration.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toaster.create({
        title: "Vibe checked",
        type: "success",
      });
      next();
    },
    onError: (error) => {
      toaster.create({
        title: "Something went wrong",
        description: `${error.message}`,
        type: "error",
        duration: 20000,
      });
    },
    meta: {
      invalidates: ["candidates", candidate_id, "candidate_aspirations"],
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <VibecheckForm
        navigate={navigate}
        questions={aspirant_questions}
        form_step={form_step}
        mutation={mutation}
        vibe_check={aspiration.vibe_check}
      />
    </div>
  );
}
