import { VibeCheckQuestions } from "@/routes/-component/shared/forms/vibe-check/types";

export const aspirant_questions: VibeCheckQuestions[] = [
  {
    query: `What do you bring to the table`,
    type: "open_ended", // optional field to specify the query type
  },

  {
    query: `Would do you believe the people want`,
    type: "open_ended",
  },
  {
    query: `In your opinion, what did the previous guy fall short on?`,
    type: "open_ended",
  },
  {
    query: `how do you intemd to addressthose failings`,
    type: "open_ended",
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
