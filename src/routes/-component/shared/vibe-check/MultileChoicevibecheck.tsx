import { Button } from "@/components/park/ui/button";
import { Checkbox } from "@/components/park/ui/checkbox";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BaseVibecheckFormProps } from "./types";


interface MultileChoicevibecheckProps extends BaseVibecheckFormProps {

}

export function MultileChoicevibecheck({
  vibes,
  question,
  setVibes,
  handleNext,
  handlePrevious,
  currentStep,
}: MultileChoicevibecheckProps) {
  const existingInput = vibes.find((item) => item.query === question.query);
  const [checkedOption, setCheckedOptins] = useState(existingInput?.answer || "");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-2">
      <div className="flex h-full w-[90%] flex-col items-center justify-center gap-5 rounded-lg bg-base-200/40 p-5 md:w-[60%]">
        <h4 className="H5 w-full">{question.query}</h4>
        {/* optional media */}
        {question.media&&<div className="w-full flex flex-wrap">
            {question.media.map((item,idx) => {
              if(item.type === "image"){
                return (
                  <img key={idx} src={item.src} alt={item.src}/>
                )
              }
              
            })}
        </div>}
        <div className={checkedOption.length === 0 ? "text-error flex text-sm" : "hidden"}>
          Please select an option
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center gap-2  ">
          {question.options?.map((item) => {
            return (
              <div
                key={item.key}
                className={
                  item.value === checkedOption
                    ? "flex w-full flex-row items-center space-x-3 space-y-0 rounded-md  bg-bg-subtle p-2"
                    : "flex w-full flex-row items-center space-x-3 space-y-0 rounded-md p-2"
                }>
                <Checkbox
                  className="size-6 border"
                  checked={item.value === checkedOption}
                  onCheckedChange={() => {
                    setCheckedOptins(item.value);
                  }}
                />

                <div className="space-y-1 leading-none flex">
                  {/* <FormLabel className="text-lg">{item.key}</FormLabel> */}
                  <p>{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>

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
          {checkedOption.length !== 0 && (
            <Button
              type="button"
              variant="outline"
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
