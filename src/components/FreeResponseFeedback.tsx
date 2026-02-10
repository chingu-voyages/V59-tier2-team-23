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
- What was good
- What could improve
- One concrete suggestion

Plain text only.
`;

  const result = await geminiModel.generateContent(prompt);
  return result.response.text();
}
