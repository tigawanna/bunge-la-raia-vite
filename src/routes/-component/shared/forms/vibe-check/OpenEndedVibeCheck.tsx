import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { Button } from "@/components/park/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BaseVibecheckFormProps } from "./types";

interface OpenEndedVibeCheckProps extends BaseVibecheckFormProps {

}

export function OpenEndedVibeCheck({
  vibes,
  question,
  setVibes,
  handleNext,
  handlePrevious,
  currentStep,
}: OpenEndedVibeCheckProps) {
  const existingInput = vibes.find((item) => item.query === question.query);
  const [input, setInput] = useState(existingInput?.answer || "");
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-2">
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-5 rounded-lg bg-base-200/50 p-5 md:w-[60%]">
        <h4 className="H5 w-full">{question.query}</h4>
        {question.media && (
          <div className="w-full flex flex-wrap">
            {question.media.map((item, idx) => {
              if (item.type === "image") {
                return <img key={idx} src={item.src} alt={item.src} />;
              }
            })}
          </div>
        )}
        <div className={input.length < 20 ? "text-error flex text-sm" : "hidden"}>
          at leasst 20 characters {input.length}/20
        </div>
        <TextareaAutosize
          value={input}
          onChange={handleChange}
          placeholder="Answer here .."
          className="min-h-24 w-full rounded bg-bg-muted  p-2"
        />
        <div className="flex w-full justify-between gap-2">
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
          {input && input.length > 20 && (
            <Button
              type="button"
              variant="outline"
              className="items-center  btn flex justify-center gap-2 text-base-content"
              onClick={() => {
                setVibes((prev) => {
                  const isInLastArray = prev.findIndex((item) => item.query === question.query);
                  if (isInLastArray > -1) {
                    prev.splice(isInLastArray, 1, { query: question.query, answer: input });
                    return prev;
                  }
                  return [
                    ...prev,
                    {
                      query: question.query,
                      answer: input,
                    },
                  ];
                });
                handleNext();
              }}>
              Next
              <ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
