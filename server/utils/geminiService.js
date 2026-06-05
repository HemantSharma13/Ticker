import { GoogleGenAI } from "@google/genai";

export const generateDescription = async (title) => {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  console.log("Gemini Key at service file:", process.env.GEMINI_API_KEY);

  const prompt = `
You are a productivity assistant.

Generate:
1. A professional task title from the given title.
2. A practical task description.

Return ONLY valid JSON in this format:
For specific details, check this:

{
  "title": "...",
  "description": "..."
}

User Task:${title}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const cleanedResponse = response.text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedResponse);
};
