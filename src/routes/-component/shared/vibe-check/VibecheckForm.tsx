import { useState } from "react";
import { MultileChoicevibecheck } from "./MultileChoicevibecheck";
import { VibecheckFormMutationProps, VibeCheckQuestions, VibesFormType } from "./types";
import { OpenEndedVibeCheck } from "./OpenEndedVibeCheck";
import { YesNoChoicevibecheck } from "./YesNoChoicevibecheck";
import { Button } from "@/components/park/ui/button";
import { ChevronLeft } from "lucide-react";
import { MutationButton } from "@/lib/tanstack/query/MutationButton";
import { UseMutationResult } from "@tanstack/react-query";
import { UseNavigateResult } from "@tanstack/react-router";
import { ValidRoutes } from "@/lib/tanstack/types";

interface VibecheckFormProps {
  vibe_check?: VibesFormType|null;
  navigate: UseNavigateResult<ValidRoutes>;
  form_step: number;
  questions: VibeCheckQuestions[];
  mutation: UseMutationResult<void, Error, VibecheckFormMutationProps, unknown>;
}

export function VibecheckForm({ navigate, form_step, questions, mutation,vibe_check }: VibecheckFormProps) {
  const [vibes, setVibes] = useState<VibesFormType>(vibe_check??[]);
  function handleNext() {
    // setCurrentStep(currentStep + 1);
    if (form_step < questions.length) {
      navigate({
        search: {
          form_step: form_step + 1,
        },
      });
    }
  }
  function handlePrevious() {
    if (form_step === 0) return;
    navigate({
      search: {
        form_step: form_step - 1,
      },
    });
    // setCurrentStep(currentStep - 1);
  }
  const currentStep = form_step;
  const currentQuestion = questions[form_step];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">


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
                type="button"
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
