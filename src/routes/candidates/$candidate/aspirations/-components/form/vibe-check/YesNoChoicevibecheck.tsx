import { z } from "zod";
import { formSchema } from "./VibecheckForm";
import { Button } from "@/components/park/ui/button";
import { Checkbox } from "@/components/park/ui/checkbox";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VibeCheckQuestions } from "./data";
import { FormLabel } from "@/components/park/ui/form-label";

interface YesNoChoicevibecheckProps {
  question: VibeCheckQuestions;
  vibes: z.infer<typeof formSchema>;
  setVibes: React.Dispatch<React.SetStateAction<z.infer<typeof formSchema>>>;
  handleNext: () => void;
  handlePrevious: () => void;
  currentStep:number;
}

export function YesNoChoicevibecheck({
  vibes,
  question,
  setVibes,
  handleNext,
  handlePrevious,
  currentStep
}: YesNoChoicevibecheckProps) {
  const existingInput = vibes.find((item) => item.query === question.query);
  const [yesOrNo, setYesOrNo] = useState(existingInput?.answer || "no");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-2">
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-5 rounded-lg bg-base-200/40 p-5 md:w-[60%]">
        <h4 className="H5 w-full">{question.query}</h4>
        <div className="flex h-full w-full flex-col items-center gap-2  ">
          <div
            className={
              yesOrNo === "yes"
                ? "flex w-full items-center  gap-3 rounded-md border bg-base-200 p-2"
                : "flex w-full items-center  gap-3 rounded-md border p-2"
            }>
            <Checkbox
              className="size-6 border-4"
              checked={yesOrNo === "yes"}
              onCheckedChange={() => {
                setYesOrNo("yes");
              }}
            />

            <div className="leading-none">
              <FormLabel className="">Yes</FormLabel>
            </div>
          </div>
          <div
            className={
              yesOrNo === "no"
                ? "flex w-full items-center  gap-3 rounded-md border bg-base-200 p-2"
                : "flex w-full items-center  gap-3 rounded-md border p-2"
            }>
            <Checkbox
              className="size-6 border-4"
              checked={yesOrNo === "no"}
              onCheckedChange={() => {
                setYesOrNo("no");
              }}
            />

            <div className="leading-none">
              <FormLabel className="">No</FormLabel>
            </div>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          {(currentStep > 0)&& (
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
          <Button
            type="button"
            variant="outline"
            className="iyems-center  btn flex justify-center gap-2 text-base-content"
            onClick={() => {
              setVibes((prev) => {
                return [
                  ...prev,
                  {
                    answer: yesOrNo,
                    query: question.query,
                    options: question.options,
                  },
                ];
              });
              handleNext();
            }}>
            Next
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
