// import type { JSX } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("No VITE_GEMINI_API_KEY found");
}

const genAI = new GoogleGenerativeAI(apiKey);
// const ai = new GoogleGenAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",  // This is set up for Gemini 2.5 flash
});

// import { GoogleGenAI } from "@google/genai";

// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({});

// async function geminiai() {
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: "What is the capital of Montana?",
//   });
//   return(response.text);
// }

// geminiai();