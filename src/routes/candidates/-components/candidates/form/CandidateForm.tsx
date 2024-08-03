import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { UseNavigateResult, useSearch } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CandidateBasicDetailsForm } from "./CandidateBasicDetailsForm";
import { CandidateRowType } from "../../types";
import { CandidateVibeCheckForm } from "./CandidateVibeCheckForm";

interface CandidateFormProps {
  candidate?: CandidateRowType | null;
  navigate?: UseNavigateResult<"/candidates/$candidate">;
  start_from_basics?: boolean;
}

export function CandidateForm({ candidate, start_from_basics, navigate }: CandidateFormProps) {

  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;
  const [formStep, setFormStep] = useState(candidate && !start_from_basics ? 1 : 0);
  const canGoToNext = formStep < 1 && candidate;
  const canGoToPrevious = formStep > 0 && candidate;
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
          <CandidateBasicDetailsForm
            candidate={candidate}
            next={(asp) => {
              if (navigate && !candidate) {
                if (start_from_basics) {
                  navigate({
                    to: "/candidates/$candidate/update",
                    search: { is_fresh: true, form_step: 0 },
                    params: {
                      candidate: viewer?.id,
                    },
                  });
                }
                navigate({
                  to: "/candidates/$candidate/update",
                  search: { is_fresh: false, form_step: 0 },
                  params: {
                    candidate: viewer?.id,
                  },
                });
              }
              if (candidate) {
                setFormStep((prev) => prev + 1);
              }
            }}
          />
        )}
        {formStep === 1 && candidate && (
          <CandidateVibeCheckForm
            candidate={candidate}
            next={() => {
              if (navigate) {
                navigate({
                  to: "/candidates/$candidate/update",
                  search: { is_fresh: false, form_step: 0 },
                  params: {
                    candidate: viewer?.id,
                  },
                });
              }
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
