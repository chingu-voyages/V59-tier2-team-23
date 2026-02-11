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
  const obj = JSON.parse(cleanedResult);
  await saveAiQuestions({ ...obj, userId, roleId: role.id });
}
