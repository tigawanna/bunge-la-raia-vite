"use client";
import { z } from "zod";
import { useState } from "react";
import { MultileChoicevibecheck } from "./MultileChoicevibecheck";
import { questions } from "./data";
import { OpenEndedVibeCheck } from "./OpenEndedVibeCheck";
import { YesNoChoicevibecheck } from "./YesNoChoicevibecheck";
import { Button } from "@/components/park/ui/button";
import { ChevronLeft } from "lucide-react";

export const formSchema = z.array(
  z.object({
    query: z.string(),
    answer: z.string(),
    options: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
  }),
);
export type VibesFormSchema = z.infer<typeof formSchema>;
interface VibecheckFormProps {}

export function VibecheckForm({}: VibecheckFormProps) {
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
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="H1">Vibecheck</h1>

      <form className="flex h-full w-full flex-col items-center justify-center">
        {currentStep < questions.length && (
          <div className="flex w-full flex-col items-center justify-center p-2">
            {currentStep + 1} / {questions.length}
          </div>
        )}
        {/* {questions.map((question) => {
          if (question.type === "multiple_choice") {
            return (
              <MultileChoicevibecheck
                key={question.query}
                question={question}
                vibes={vibes}
                setVibes={setVibes}
              />
            );
          }
          if (question.type === "open_ended") {
            return (
              <OpenEndedVibeCheck
                key={question.query}
                question={question}
                vibes={vibes}
                setVibes={setVibes}
              />
            );
          }
          return null;
        })} */}
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
          <div className="flex w-full flex-col items-center justify-center">
            <ul className="flex h-full w-[90%] flex-col gap-3  p-5">
              {vibes.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex w-full flex-col gap-1 rounded-lg  border bg-base-200/70 p-3">
                    <h2 className="H5 border-b">Q: {item.query}</h2>
                    <p className="pl-2 ">A: {item.answer}</p>
                  </li>
                );
              })}
            </ul>
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
          </div>
        )}
      </form>
    </div>
  );
}
