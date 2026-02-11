import type { DbRole } from "../utils/dbTypes";
import { handleGenerateMoreQuestions } from "./MoreQuestions";
import { saveAiQuestions } from "../utils/getData";

export default async function fetchNewQuestionsForRetry(
  role: DbRole,
  userId: string | undefined,
  count = 1,
) {
  const text = await handleGenerateMoreQuestions(role.name);
  console.log(role.id, userId, count);
  const cleanedResult = text
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/gi, "")
    .trim()
    .replace(/^\d+\.\s*/, "");
  const parsedArray = JSON.parse(cleanedResult);
  const questionsArray = Array.isArray(parsedArray)
    ? parsedArray
    : [parsedArray];
  for (const questionObject of questionsArray) {
    await saveAiQuestions({ ...questionObject, userId, roleId: role.id });
  }
}
