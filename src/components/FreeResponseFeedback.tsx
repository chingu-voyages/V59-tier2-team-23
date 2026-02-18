import { geminiModel } from "../components/Geminifunction";

export async function generateEssayFeedback(
  role: string,
  question: string,
  answer: string,
): Promise<string> {
  const prompt = `
You are an interview coach.

Role: ${role}
Question: ${question}
User Answer: ${answer}

Give concise, constructive feedback:
- Give a score on a scale of 1 to 10, written like Score: */10
- What could improve
- One concrete suggestion

Plain text only. No markdown-style formatting.
`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}
