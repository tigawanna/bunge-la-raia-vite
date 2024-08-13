import { VibeCheckType } from "./vibe-check-schema";


export interface VibeCheckQuestions {
  query: string;
  type: "multiple_choice" | "open_ended" | "yes_no";
  media?:[{type:"image",src:string}]
  options?:{
    key:string;
    value:string
  }[];
}

export type VibesFormType = {
  query: string;
  answer: string;
  options?:
    | {
        value: string;
        key: string;
      }[]
    | undefined;
}[];

export interface VibecheckFormMutationProps {
  vibe: VibesFormType;
}

export interface BaseVibecheckFormProps {
  question: VibeCheckQuestions;
  vibes: VibeCheckType;
  setVibes: React.Dispatch<React.SetStateAction<VibeCheckType>>;
  handleNext: () => void;
  handlePrevious: () => void;
  currentStep: number;
}
