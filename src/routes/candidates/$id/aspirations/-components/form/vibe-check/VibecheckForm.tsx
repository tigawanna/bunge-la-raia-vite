import { z } from "zod";
import { useState } from "react";
import { MultileChoicevibecheck } from "./MultileChoicevibecheck";
import { questions } from "./data";
import { OpenEndedVibeCheck } from "./OpenEndedVibeCheck";
import { YesNoChoicevibecheck } from "./YesNoChoicevibecheck";
import { Button } from "@/components/park/ui/button";
import { ChevronLeft } from "lucide-react";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { toaster } from "@/components/navigation/ParkuiToast";
import { CandidateAspirationRowType } from "../../types";

export const formSchema = z.array(
  z.object({
    query: z.string(),
    answer: z.string(),
    options: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  })
);
export type VibesFormType = z.infer<typeof formSchema>;
interface VibecheckFormProps {
  candidate_id: string;
  aspiration: CandidateAspirationRowType;
  next: () => void;
}

interface VibecheckFormMutationProps {
  vibe: VibesFormType;
}
export function VibecheckForm({ candidate_id, aspiration,next }: VibecheckFormProps) {
  const [vibes, setVibes] = useState<z.infer<typeof formSchema>>(aspiration.vibe_check??[]);
  const [currentStep, setCurrentStep] = useState(0);
  function handleNext() {
    setCurrentStep(currentStep + 1);
  }
  function handlePrevious() {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }
  const currentQuestion = questions[currentStep];

  const mutation = useMutation({
    mutationFn: async ({ vibe }: VibecheckFormMutationProps) => {
      const { error } = await supabase.from("candidate_aspirations").update({
        vibe_check: vibe,
      });
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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="H1">Vibecheck</h1>

      <form className="flex h-full w-full flex-col items-center justify-center">
        {currentStep < questions.length && (
          <div className="flex w-full flex-col items-center justify-center p-2">
            {currentStep + 1} / {questions.length}
          </div>
        )}

        {currentQuestion?.type === "multiple_choice" && (
          <MultileChoicevibecheck
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            key={currentQuestion.query}
            question={currentQuestion}
            vibes={vibes}
            setVibes={setVibes}
          />
        )}

        {currentQuestion?.type === "open_ended" && (
          <OpenEndedVibeCheck
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            key={currentQuestion.query}
            question={currentQuestion}
            vibes={vibes}
            setVibes={setVibes}
          />
        )}

        {currentQuestion?.type === "yes_no" && (
          <YesNoChoicevibecheck
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            key={currentQuestion.query}
            question={currentQuestion}
            vibes={vibes}
            setVibes={setVibes}
          />
        )}
        {currentStep === questions.length && (
          <div className="flex w-full flex-col items-center justify-center p-5 pb-[5%]">
            <ul className="flex h-full w-[90%] flex-col gap-3  p-5">
              {vibes.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex w-full flex-col gap-1 rounded-lg  border bg-bg-subtle p-3">
                    <h2 className="text-sm border-b">Q: {item.query}</h2>
                    <p className="pl-2 text-sm">A: {item.answer}</p>
                  </li>
                );
              })}
            </ul>
            <div className="w-full flex justify-evenly items-center gap-2">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="iyems-center  btn flex justify-center gap-2 text-base-content"
                  onClick={() => {
                    handlePrevious();
                  }}>
                  <ChevronLeft />
                  Previous
                </Button>
              )}

              <MutationButton
                mutation={mutation}
                onClick={() => mutation.mutate({ vibe: vibes })}
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
