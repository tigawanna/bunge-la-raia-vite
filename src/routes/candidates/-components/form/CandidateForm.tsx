import { supabase } from "@/lib/supabase/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BasicDetails } from "./basics-details/BasicDetails";
import { VibecheckForm } from "./vibe-check/VibecheckForm";
import { useState } from "react";
import { Button } from "@/components/park/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CandidateFormProps {
  id?: string;
}

export function CandidateForm({ id }: CandidateFormProps) {
  const [formStep, setFormStep] = useState(1);
  const totalSteps = 2;
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

  function handleNextFormStep() {
    setFormStep((prev) => {
      if (prev === totalSteps) {
        return prev;
      }
      return prev + 1;
    });
  }

  function handlePreviousFormStep() {
    setFormStep((prev) => {
      if (prev === 1) {
        return prev;
      }
      return prev - 1;
    });
  }

  return (
    <div className="w-full h-full flex flex-col p-2 gap-4 items-center justify-center">
      <div className="w-full h-full flex p-2 gap-4 items-center justify-center ">
        {formStep > 1 && (
          <Button
            type="button"
            variant="outline"
            className="items-center  bflex justify-center gap-2 "
            onClick={() => {
              handlePreviousFormStep();
            }}>
            <ChevronLeft />
          </Button>
        )}
        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
          {/* <VibecheckForm /> */}
          {formStep === 1 && (
            <BasicDetails
              candidate={candidate}

            />
          )}
          {formStep === 2 && (
            <VibecheckForm
              candidate={candidate}

            />
          )}

          <div className="flex w-fit justify-between gap-[10%]"></div>
        </div>
        {formStep < totalSteps && (
          <Button
            type="button"
            variant="outline"
            className="iyems-center  btn flex justify-center gap-2 text-base-content"
            onClick={() => {
              handleNextFormStep();
            }}>
            <ChevronRight />
          </Button>
        )}
      </div>
      <span className="text-sm p-2">
        {formStep} / {totalSteps}
      </span>
    </div>
  );
}
