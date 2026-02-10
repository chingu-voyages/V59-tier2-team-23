import type { DbQuestion, DbAnswer, DbRole } from "../utils/dbTypes";
import { v4 as uuidv4 } from "uuid";
import { handleGenerateMoreQuestions } from "./MoreQuestions";

type AiItem = {
  question: string;
  rationale?: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: "A" | "B" | "C" | "D";
};

export default async function fetchNewQuestionsForRetry(
  role: DbRole,
  userId: string | undefined,
  count = 5,
): Promise<DbQuestion[]> {
  const text = await handleGenerateMoreQuestions(role.name);
  let aiArray: AiItem[];

  try {
    aiArray = JSON.parse(text);
  } catch (err) {
    throw new Error("Failed to return JSON");
    // console.log(aiArray);
  }

  const items = aiArray.slice(0, count);
  return items.map((it, idx) => {
    const qId = `ai-${uuidv4()}`;
    const answers: DbAnswer[] = [
      {
        id: `ai-${qId}-A`,
        question_id: qId,
        answer: it.choiceA,
        is_correct: it.correctAnswer === "A",
        display_order: 1,
      },
      {
        id: `ai-${qId}-B`,
        question_id: qId,
        answer: it.choiceB,
        is_correct: it.correctAnswer === "B",
        display_order: 2,
      },
      {
        id: `ai-${qId}-C`,
        question_id: qId,
        answer: it.choiceC,
        is_correct: it.correctAnswer === "C",
        display_order: 3,
      },
      {
        id: `ai-${qId}-D`,
        question_id: qId,
        answer: it.choiceD,
        is_correct: it.correctAnswer === "D",
        display_order: 4,
      },
    ];
    return {
      id: qId,
      role_id: role.id,
      question: it.question,
      rationale: it.rationale || "",
      user_id: userId || null,
      answers,
    } as DbQuestion;
  });
}
