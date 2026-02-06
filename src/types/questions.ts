export type OptionKey = "A" | "B" | "C" | "D";

export type AppStep = "ROLE_SELECTION" | "QUESTION" | "FEEDBACK" | "RESULTS";

export interface Flashcard {
  id: number | string;
  question: string;
  options: Record<OptionKey, string>;
  answer: OptionKey;
  rationale: string;
  answerIds: Record<OptionKey, string>;
}

export interface RoleQuestions {
  id: string;
  role: string;
  focus: string;
  flashcards: Flashcard[];
}

export interface UserAnswer {
  Qid: number | string;
  selectedOption: OptionKey;
  correct: boolean;
}

export interface QuestionnaireResult {
  submitted: boolean;
  submittedAt: string;
  roleId: number;
  userAnswers: UserAnswer[];
}
