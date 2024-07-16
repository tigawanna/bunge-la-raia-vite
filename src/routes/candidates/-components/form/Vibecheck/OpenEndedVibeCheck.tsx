import { z } from "zod";
import { VibeCheckQuestions } from "./data";
import { formSchema } from "./VibecheckForm";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/park/ui/button";

interface OpenEndedVibeCheckProps {
  question: VibeCheckQuestions;
  vibes: z.infer<typeof formSchema>;
  setVibes: React.Dispatch<React.SetStateAction<z.infer<typeof formSchema>>>;
}

export function OpenEndedVibeCheck({
  question,
  vibes,
  setVibes,
}: OpenEndedVibeCheckProps) {
  const [input, setInput] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-2">
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-5 rounded-lg bg-base-200/20 p-5 md:w-[60%]">
        <p className="H3 w-full">{question.query}</p>
        <TextareaAutosize
          value={input}
          onChange={handleChange}
          placeholder="Answer here .."
          className="bg-base-100 w-full p-1 min-h-24 rounded"
        />
        <Button
          type="button"
          className="iyems-center  btn flex justify-center gap-2 text-base-content"
          onClick={() =>
            setVibes((prev) => [
              ...prev,
              {
                query: question.query,
                answer: input,
              },
            ])
          }
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
