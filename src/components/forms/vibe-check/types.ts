export interface VibeCheckQuestions {
  query: string;
  type: "multiple_choice" | "open_ended" | "yes_no";
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
