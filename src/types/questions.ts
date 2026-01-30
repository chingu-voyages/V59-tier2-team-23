export type OptionKey = "A" | "B" | "C" | "D";

export type AppStep = "ROLE_SELECTION" | "QUESTION" | "FEEDBACK" | "RESULTS";

export interface Flashcard {
  id: number;
  question: string;
  options: Record<OptionKey, string>;
  answer: OptionKey;
  rationale: string;
}

export interface RoleQuestions {
  role: string;
  focus: string;
  flashcards: Flashcard[];
}

export interface UserAnswer {
  Qid: number;
  selectedOption: OptionKey;
  correct: boolean;
}

export interface QuestionnaireResult {
  submitted: boolean;
  submittedAt: string;
  roleId: number;
  userAnswers: UserAnswer[];
}
