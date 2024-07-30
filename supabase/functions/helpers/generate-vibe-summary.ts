/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import  { GoogleGenerativeAI } from "npm:@google/generative-ai"



const apiKey = Deno.env.get("GEMINI_API_KEY");
console.log(apiKey)
if(!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "this is civilization game modelled on the kenyan political system , based on the query answer combinatiosn make a semi detalied summary of the candidate and below that highlight their strong points and concerns about them in markdown",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

interface GenerateVibeSummary{
    inputText:string;
}
export async function generateVibeSummary({inputText}:GenerateVibeSummary) {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    // history: [
    //   {
    //     role: "user",
    //     parts: [
    //       {text: "[{\"query\":\"A virus of unknown origin with a 90% fatality rate has broken out and we only\\n       have enough vaccine doses for 10% of the population for it.\\n        What criteria would you use to pick the recipients?\",\"answer\":\"the children , industry experts , critical workers\"},{\"query\":\"Which of the following taxation strategies makes most sense to you?\",\"answer\":\"a progressive tax that shields the lowest earners\",\"options\":[{\"key\":\"a\",\"value\":\"a flat tax on everyone \"},{\"key\":\"b\",\"value\":\"a progressive tax that shields the lowest earners\"},{\"key\":\"c\",\"value\":\"tax cuts for the rich to spur economic growth\"}]},{\"query\":\"Besides taxation, what other ideas do you have for revenue generation?\",\"answer\":\"venom farming , hyena skins , organ leasing\"},{\"query\":\"Would you sacrifice a pension fund for an investment that would create \\n      1 million jobs for the current youths?\",\"answer\":\"no\"},{\"query\":\"What are you most proud of about your country?\",\"answer\":\"the diversity of our landscape, people and the cultures that make us kenyans\"},{\"query\":\"What scandal would you be most likely to be caught in?\",\"answer\":\"emblezzling of goverment funds , my tendancy to make long term investments might land me ina situation where my actions are mistaken for misapropration of state funds\"},{\"query\":\"Which one of your body parts would you sacrifice if a school full \\n      of children was held hostage by people who demand a show of commitment?\",\"answer\":\"head body kenes and toes\"},{\"query\":\"Which of the following taxation strategies makes most sense to you?\",\"answer\":\"a progressive tax that shields the lowest earners\",\"options\":[{\"key\":\"a\",\"value\":\"a flat tax on everyone \"},{\"key\":\"b\",\"value\":\"a progressive tax that shields the lowest earners\"},{\"key\":\"c\",\"value\":\"tax cuts for the rich to spur economic growth\"}]},{\"query\":\"Would you sacrifice a pension fund for an investment that would create \\n      1 million jobs for the current youths?\",\"answer\":\"yes\"},{\"query\":\"Which of the following taxation strategies makes most sense to you?\",\"answer\":\"a progressive tax that shields the lowest earners\",\"options\":[{\"key\":\"a\",\"value\":\"a flat tax on everyone \"},{\"key\":\"b\",\"value\":\"a progressive tax that shields the lowest earners\"},{\"key\":\"c\",\"value\":\"tax cuts for the rich to spur economic growth\"}]},{\"query\":\"Would you sacrifice a pension fund for an investment that would create \\n      1 million jobs for the current youths?\",\"answer\":\"no\"},{\"query\":\"Which of the following taxation strategies makes most sense to you?\",\"answer\":\"a progressive tax that shields the lowest earners\",\"options\":[{\"key\":\"a\",\"value\":\"a flat tax on everyone \"},{\"key\":\"b\",\"value\":\"a progressive tax that shields the lowest earners\"},{\"key\":\"c\",\"value\":\"tax cuts for the rich to spur economic growth\"}]},{\"query\":\"Would you sacrifice a pension fund for an investment that would create \\n      1 million jobs for the current youths?\",\"answer\":\"no\"},{\"query\":\"What constitutional ammendments do you think would be most helpful to the country?\",\"answer\":\"reduce the requirements for recalling leaders who stop representing the people\"},{\"query\":\"What is your idea of an inclusive goverment?\",\"answer\":\"majority youth living as regular citizens\"},{\"query\":\"Unemployment and an ever growing young population are common challenges in most countries , \\n    what would be your high level idea on how to fix it?\",\"answer\":\"provide state form land to be used fro agriculture to provide reliable food supply to our massive cities\"},{\"query\":\"All public servants should exclusively use public transport ,hospitals and schools.\",\"answer\":\"yes\"}]"},
    //     ],
    //   },
    //   {
    //     role: "model",
    //     parts: [
    //       {text: "## Candidate Summary\n\nThis candidate leans towards progressive policies, particularly prioritizing the needs of the lower earners and the youth. They favor a progressive tax system,  are willing to invest in job creation even at the cost of pension funds, and believe in providing state land for agriculture to address unemployment and food security. This candidate also champions inclusivity, envisioning a government with a strong youth presence and advocating for the use of public services by all public servants. \n\nWhile their focus on youth and social welfare is admirable, the candidate's economic plan hinges on potentially unrealistic and unsustainable solutions. The reliance on agriculture, venom farming, hyena skins, and organ leasing raises concerns about feasibility and ethical implications. The candidate's willingness to sacrifice personal body parts for a hostage situation, while demonstrating a sense of sacrifice, also raises questions about their judgment and ability to make rational decisions under pressure. \n\n**Strong Points:**\n\n* **Progressive Taxation:**  Advocates for a progressive tax system that protects the lower earners, demonstrating an understanding of income inequality and a commitment to social justice.\n* **Youth-Focused:**  Prioritizes youth employment and representation in government, acknowledging the demographic realities and potential of the young population.\n* **Inclusive Government:**  Strives for a government that reflects the diversity of Kenyan society, particularly emphasizing the role of youth.\n* **Social Welfare:**  Demonstrates a commitment to improving the lives of ordinary citizens through policies aimed at reducing unemployment, ensuring food security, and promoting inclusivity.\n\n**Concerns:**\n\n* **Unrealistic Economic Solutions:**  The reliance on unconventional and potentially unsustainable revenue sources like venom farming, hyena skins, and organ leasing raises concerns about their economic understanding and feasibility.\n* **Lack of Detail:**  The candidate's proposed solutions lack concrete details and practical implementation plans, raising questions about their ability to translate vision into action.\n* **Judgment and Decision-Making:**  The candidate's willingness to sacrifice personal body parts in a hostage situation raises concerns about their ability to make rational and measured decisions under pressure.\n* **Potential for Corruption:**  The candidate's potential vulnerability to embezzlement scandals raises concerns about their integrity and ability to manage public funds responsibly. \n"},
    //     ],
    //   },
    // ],
  });
    const result = await chatSession.sendMessage(inputText);
  console.log(result.response.text());
  return result
}

