"use client";
import { z } from "zod";
import { useState } from "react";
import { MultileChoicevibecheck } from "./MultileChoicevibecheck";
import { questions } from "./data";
import { OpenEndedVibeCheck } from "./OpenEndedVibeCheck";
import { useForm } from "@tanstack/react-form";

export const formSchema = z.array(
  z.object({
    query: z.string(),
    answer: z.string(),
    options: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .optional(),
  })
);

interface VibecheckFormProps {}

export function VibecheckForm({}: VibecheckFormProps) {
  const [vibes, setVibes] = useState<z.infer<typeof formSchema>>([]);
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm({
    defaultValues: [],
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="H1">Vibecheck</h1>

      <form className="flex h-full w-full flex-col items-center justify-center">
        {questions.map((question) => {
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
        })}
      </form>
    </div>
  );
}
