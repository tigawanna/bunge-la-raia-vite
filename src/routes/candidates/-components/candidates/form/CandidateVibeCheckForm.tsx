import { toaster } from "@/components/navigation/ParkuiToast";
import { supabase } from "@/lib/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { VibecheckForm } from "@/routes/-component/shared/vibe-check/VibecheckForm";
import { VibecheckFormMutationProps, VibesFormType } from "@/routes/-component/shared/vibe-check/types";
import { CandidateRowType } from "../../types";
import { candidate_questions } from "./candidate-questions";

interface CandidateVibeCheckFormProps {
  candidate: CandidateRowType;
  next: () => void;
}

export function CandidateVibeCheckForm({candidate,next}: CandidateVibeCheckFormProps) {
  const { form_step } = useSearch({
    from: "/candidates/$candidate/update",
  });
  const navigate = useNavigate({
    from: "/candidates/$candidate/update",
  });
  const mutation = useMutation({
    mutationFn: async ({ vibe }: VibecheckFormMutationProps) => {
      const { error } = await supabase
        .from("candidates")
        .update({
          vibe_check: vibe,
        })
        .eq("id", candidate.id);
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
      invalidates: ["candidates", candidate.id],
    },
  });

  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <h1 className="text-xl font-bold">Candidate Vibe Check</h1>
      <VibecheckForm
        navigate={navigate}
        questions={candidate_questions}
        form_step={form_step}
        mutation={mutation}
        vibe_check={candidate?.vibe_check as VibesFormType}
      />
    </div>
  );
}
