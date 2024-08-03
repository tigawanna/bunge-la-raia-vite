import { VibeCheckQuestions } from "@/routes/-component/shared/forms/vibe-check/types";

export const user_questions: VibeCheckQuestions[] = [
  {
    query: `Describe your ideal leader`,
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
    query: `What would you consider to be your political ideology?`,
    type: "multiple_choice",
    options: [
      { key: "a", value: "Free market capitalist " },
      { key: "b", value: "Libertarian" },
      { key: "c", value: "Socialist" },
      { key: "d", value: "Communist" },
      { key: "e", value: "Social Democrat" },
      { key: "f", value: "Conservative" },
      { key: "g", value: "Other" },
    ]
  },
    {
    query: "What kind of society would you model in your country?",
    type: "multiple_choice",
    options: [
      { key: "a", value: "Free market capitalist " },
      { key: "b", value: "European style capitalist" },
      { key: "c", value: "European style socialist" },
      { key: "d", value: "Asian style capitalist" },
      { key: "f", value: "Asian style socialist" },
      { key: "g", value: "Religious state" },

    ],
  },
  {
    query: `Do you believe in taxation as a means of revenue generation
     is fair if YES how much in income percentage do you think is fair ,
     if NO why? and what other ways can we sustain our society?`,
    type: "open_ended",
  },
  {
    query: `Are you patriotic? if YES what about our country makes you the proudest? if NO why?`,
    type: "open_ended",
  },
  {
    query: `If you were given the ability to ammend the constitution , what would you change?`,
    type: "open_ended",
  },
  {
    query: `if you were president for a day what problem would you solve or kick the process of solving into motion?`,
    type: "open_ended",
  },
];
