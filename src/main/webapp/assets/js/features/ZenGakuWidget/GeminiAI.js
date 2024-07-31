import {GoogleGenerativeAI} from 'https://esm.run/@google/generative-ai'
export {
    reply
}

let history = [];

const APIKey = 'AIzaSyDSqL7LpA1vryPHodJ-Mjbnb8c0pJYQC_Q';

const AI = new GoogleGenerativeAI(APIKey);
const model = AI.getGenerativeModel({ model: "gemini-1.5-flash",tools: [{codeExecution: {}}]},
);

async function reply(prompt) {
    const result = await model.generateContent(prompt+'');
    const response = await result.response;
    const text = response.text();
    return text;
}

// async function replyWithHistory(promt) {

// }

