import { VibeCheckQuestions } from "@/routes/-component/shared/vibe-check/types";


export const candidate_questions: VibeCheckQuestions[] = [
  {
    query: `A virus of unknown origin with a 90% fatality rate has broken out and we only
       have enough vaccine doses for 10% of the population for it.
        What criteria would you use to pick the recipients?`,
    type: "open_ended",
  },
  {
    query: "Which of the following taxation strategies makes most sense to you?",
    type: "multiple_choice",
    options: [
      { key: "a", value: "a flat tax on everyone " },
      { key: "b", value: "a progressive tax that shields the lowest earners" },
      { key: "c", value: "tax cuts for the rich to spur economic growth" },
    ],
  },
  {
    query: "Besides taxation, what other ideas do you have for revenue generation?",
    type: "open_ended",
  },


  {
    query: "In your opinion,What is the worst scandal you can point out in the country?",
    type: "open_ended",
  },
  {
    query: "How would you have handled the previous scandal you defined?",
    type: "open_ended",
  },

  {
    query: "what measures would you put in place to prevent the scandal?",
    type: "open_ended",
  },
      {
    query: `Do you think the conditions in our prisons are too humane?`,
    type: "yes_no",
  },
    {
    query: `Do you believe a life sentence is humane?`,
    type: "yes_no",
  },
  {
    query: `What constitutional ammendments do you think are required for progress?`,
    type: "open_ended",
  },
  {
    query: `What laws do you think are no longer relevent/necessary?`,
    type: "open_ended",
  },

  {
    query: `What is your idea of an inclusive goverment?`,
    type: "open_ended",
  },
    {
    query: `Waht are your opinions on citizens being homeless in their own country?`,
    type: "open_ended",
  },
  {
    query: "Where do you think tax money is better spent?",
    type: "multiple_choice",
    options: [
      { key: "a", value: "Pay seven figure salaries and benefits to elected officials " },
      { key: "b", value: "Socila progrmmes like school feeding programmes, food banks , homeless shelters , orphanages ... " },
      { key: "c", value: "Build a new house of worship in every county" },
    ],
  },
  {
    query: `Unemployment and an ever growing young population are common challenges in most countries , 
    what would be your high level idea on how to fix it?`,
    type: "open_ended",
  },
  {
    query: `All public servants should exclusively use public transport ,hospitals and schools.`,
    type: "yes_no",
  },
  {
    query: `All elected officials should live in the areas where they got the most votes`,
    type: "yes_no",
  }
  
];
