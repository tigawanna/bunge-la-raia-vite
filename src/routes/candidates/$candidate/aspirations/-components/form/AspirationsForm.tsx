import { CandidateAspirationRowType } from "../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";
import { AspirationBasicsForm } from "./AspirationBasicsForm";
import { VibecheckForm } from "./vibe-check/VibecheckForm";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UseNavigateResult } from "@tanstack/react-router";

interface AspirationsFormProps {
  aspiration?: CandidateAspirationRowType;
  navigate?: UseNavigateResult<"/candidates/$candidate/aspirations/new">;
}

export function AspirationsForm({ aspiration, navigate }: AspirationsFormProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;
  const [formStep, setFormStep] = useState(0);
  const canGoToNext = formStep < 1 && aspiration;
  const canGoToPrevious = formStep > 0 && aspiration;
  function handleNext() {
    if (canGoToNext) {
      setFormStep((prev) => prev + 1);
    }
  }
  function handlePrevious() {
    if (canGoToPrevious) {
      setFormStep((prev) => prev - 1);
    }
  }
  if (viewer?.id == null) return;
  return (
    <div className="w-full h-full flex items-center justify-center gap-2">
      {canGoToPrevious && (
        <ChevronLeft className="size-20 hidden lg:flex" onClick={() => handlePrevious()} />
      )}

      <div className="w-full h-full flex flex-col items-center justify-between p-2">
        {formStep === 0 && (
          <AspirationBasicsForm
            aspiration={aspiration}
            viewer={{
              id: viewer?.id,
            }}
            next={(asp) => {
              if (navigate && !aspiration) {
                navigate({
                  to: "/candidates/$candidate/aspirations/$aspiration/update",
                  params: {
                    candidate: viewer?.id,
                    aspiration: asp.id,
                  },
                });
              }
              if (aspiration) {
                setFormStep((prev) => prev + 1);
              }
            }}
          />
        )}
        {formStep === 1 && aspiration && (
          <VibecheckForm
            candidate_id={viewer?.id}
            aspiration={aspiration}
            next={() => {
              handleNext();
            }}
          />
        )}
        <div className="w-full h-full lg:hidden flex items-center justify-between gap-2">
          {canGoToPrevious && <ChevronLeft className="size-8" onClick={() => handlePrevious()} />}
          {canGoToNext && <ChevronRight className="size-8" onClick={() => handleNext()} />}
        </div>
      </div>
      {canGoToNext && (
        <ChevronRight className="size-20 hidden lg:flex" onClick={() => handleNext()} />
      )}
    </div>
  );
}
