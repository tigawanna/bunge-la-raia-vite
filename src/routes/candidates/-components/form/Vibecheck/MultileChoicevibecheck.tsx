import { z } from "zod";
import { formSchema } from "./VibecheckForm";
import { Button } from "@/components/shadcn/ui/button";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/shadcn/ui/form";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { VibeCheckQuestions } from "../data";

interface MultileChoicevibecheckProps {
  question: VibeCheckQuestions;
  vibes: z.infer<typeof formSchema>;
  setVibes: React.Dispatch<React.SetStateAction<z.infer<typeof formSchema>>>;
}

export function MultileChoicevibecheck({
  question,
  vibes,
  setVibes,
}: MultileChoicevibecheckProps) {
  const [checkedOption, setCheckedOptins] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-2">
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-5 rounded-lg bg-base-200/20 p-5 md:w-[60%]">
        <p className="H3">{question.query}</p>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2  ">
          {question.options?.map((item, idx) => {
            return (
              <FormItem
                key={item.key}
                className={
                  item.value === checkedOption
                    ? "flex w-full flex-row items-center space-x-3 space-y-0 rounded-md border bg-base-200 p-2"
                    : "flex w-full flex-row items-center space-x-3 space-y-0 rounded-md border p-2"
                }
              >
                <FormControl>
                  <Checkbox
                    checked={item.value === checkedOption}
                    onCheckedChange={(e) => {
                      setCheckedOptins(item.value);
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-lg">{item.key}</FormLabel>
                  <FormDescription>{item.value}</FormDescription>
                </div>
              </FormItem>
            );
          })}
        </div>

        <Button
          type="button"
          className="iyems-center  btn flex justify-center gap-2 text-base-content"
          onClick={() => {
            setVibes((prev) => {
              return [
                ...prev,
                {
                  answer: checkedOption,
                  query: question.query,
                  options: question.options,
                },
              ];
            });
          }}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
