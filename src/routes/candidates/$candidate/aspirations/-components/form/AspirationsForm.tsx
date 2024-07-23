import { CandidateAspirationRowType } from "../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { useState } from "react";
import { AspirationBasicsForm } from "./AspirationBasicsForm";
import { VibecheckForm } from "./vibe-check/VibecheckForm";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AspirationsFormProps {
  aspiration?: CandidateAspirationRowType;
}

export function AspirationsForm({ aspiration }: AspirationsFormProps) {
  const { userQuery } = useViewer();
  const viewer = userQuery?.data?.data;
  const [formStep, setFormStep] = useState(0);
  if (viewer?.id == null) return;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {formStep === 0 && (
        <AspirationBasicsForm
          aspiration={aspiration}
          viewer={{
            id: viewer?.id,
          }}
          next={() => {
            setFormStep((prev) => prev + 1);
          }}
        />
      )}
      {formStep === 1 && (
        <VibecheckForm
          candidate_id={viewer?.id}
          aspiration={aspiration}
          next={() => {
            setFormStep((prev) => prev + 1);
          }}
        />
      )}
      <div className="w-full h-full flex flex-col items-center justify-between">
        <ChevronLeft onClick={() => setFormStep((prev) => prev - 1)}/>
        <ChevronRight onClick={() => setFormStep((prev) => prev + 1)}/>
      </div>
    </div>
  );
}
