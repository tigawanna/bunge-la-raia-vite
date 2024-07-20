import { z } from "zod";
import { useState } from "react";
import { MultileChoicevibecheck } from "./MultileChoicevibecheck";
import { questions } from "./data";
import { OpenEndedVibeCheck } from "./OpenEndedVibeCheck";
import { YesNoChoicevibecheck } from "./YesNoChoicevibecheck";
import { Button } from "@/components/park/ui/button";
import { ChevronLeft } from "lucide-react";
import { useVibeCheckMutation } from "./use-mutate-vibecheck";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { CandidateRowType } from "../../../../../-components/types";

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
  candidate: CandidateRowType
}

export function VibecheckForm({candidate}: VibecheckFormProps) {
  const [vibes, setVibes] = useState<z.infer<typeof formSchema>>([]);
  const [currentStep, setCurrentStep] = useState(0);
  function handleNext() {
    setCurrentStep(currentStep + 1);
  }
  function handlePrevious() {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }
  const currentQuestion = questions[currentStep];
  const mutation = useVibeCheckMutation();

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
              {candidate &&
              <MutationButton mutation={mutation} onClick={() => mutation.mutate({candidate,vibe:vibes})}/>
              }</div>
          </div>
        )}
      </form>
    </div>
  );
}
