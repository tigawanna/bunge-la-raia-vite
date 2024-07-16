export interface VibeCheckQuestions {
  query: string;
  type: "multiple_choice" | "open_ended" | "yes_no";
  options?:{
    key:string;
    value:string
  }[];
}

export const questions: VibeCheckQuestions[] = [
  {
    query: `A virus of unknown origin with a 90% fatality rate has broken out and we only
       have enough vaccine doses for 10% of the population for it.
        What criteria would you use to pick the recipients?`,
    type: "open_ended", // optional field to specify the query type
  },
  {
    query:
      "Which of the following taxation strategies makes most sense to you?",
    type: "multiple_choice",
    options: [
      { key: "a", value: "a flat tax on everyone " },
      { key: "b", value: "a progressive tax that shields the lowest earners" },
      { key: "c", value: "tax cuts for the rich to spur economic growth" },
    ],
  },
  {
    query:
      "Besides taxation, what other ideas do you have for revenue generation?",
    type: "open_ended",
  },
  {
    query: `Would you sacrifice a pension fund for an investment that would create 
      1 million jobs for the current youths?`,
    type: "yes_no",
  },
  {
    query: "What are you most proud of about your country?",
    type: "open_ended",
  },
  {
    query: "What scandal would you be most likely to be caught in?",
    type: "open_ended",
  },
  {
    query: `Which one of your body parts would you sacrifice if a school full 
      of children was held hostage by people who demand a show of commitment?`,
    type: "open_ended",
  },
];
