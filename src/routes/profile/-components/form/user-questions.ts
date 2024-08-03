import { VibeCheckQuestions } from "@/components/forms/vibe-check/types";

export const user_questions: VibeCheckQuestions[] = [
  {
    query: `How would you define your ideal leader`,
    type: "open_ended", // optional field to specify the query type
  },
  {
    query: `A genie asks you for 3 wishes , what are yoou wishing for?`,
    type: "open_ended",
  },
  {
    query: `infamous trolley problem , a trolley is coming down a aset o tracks , 5 people are stuck
    directly in it's path , there's a lever allowing you to redirect the trolley to another track that 
    has 1 person stuck on it instead . 
    Would you pull the lever and actively doom the one person while saving 5 or would you keep your hands clean 
    and let it run through the 5 people
`,
    type: "multiple_choice",
    media: [{type:"image",src:"/trolley-problem.png"}],
    options: [
      { key: "a", value: "pull the lever and doom the one person" },
      { key: "b", value: "keep your hands clean and let it run through the 5 people" },
    ]
  },
  {
    query: `What do you think are the issues the people have`,
    type: "open_ended",
  },
  {
    query: `What potential does this area have to offer?`,
    type: "open_ended",
  },
  {
    query: `how do you intend to make it work for the people?`,
    type: "open_ended",
  },
  {
    query: `What gives you hope about this area?`,
    type: "open_ended",
  },
];
