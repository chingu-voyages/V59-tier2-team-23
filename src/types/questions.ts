export type OptionKey = "A" | "B" | "C" | "D";

export type AppStep =
  | "ROLE_SELECTION"
  | "QUESTION_SELECTION"
  | "FR_QUESTION"
  | "MC_QUESTION"
  | "BOTH_QUESTION"
  | "FEEDBACK"
  | "RESULTS"
  | "FR_RESULTS";

export type QuestionType = "FREE_RESPONSE" | "MULTIPLE_CHOICE" | "BOTH";

export interface Flashcard {
  id: number | string;
  question: string;
  options: Record<OptionKey, string>;
  answer: OptionKey;
  rationale: string;
  answerIds: Record<OptionKey, string>;
}
export interface Essaycard {
  id: number;
  role: string;
  question: string;
  feedback: string;
}

export interface Essaycard {
  id: number;
  role: string;
  question: string;
  feedback: string;
}

export interface RoleQuestions {
  id: string;
  role: string;
  focus: string;
  flashcards: Flashcard[];
}

export interface QuestionTypeOption {
  type: QuestionType;
  title: string;
  description: string;
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
  id: string;
  userAnswers: UserAnswer[];
}

export type FreeResponseAnswer = {
  id: number;
  question: string;
  response: string;
  feedback: string;
};

export const QUESTION_TYPES: QuestionTypeOption[] = [
  {
    type: "FREE_RESPONSE",
    title: "Free Response",
    description: "Write detailed answers in your own words.",
  },
  {
    type: "MULTIPLE_CHOICE",
    title: "Multiple Choice",
    description: "Select from predefined answers.",
  },
  {
    type: "BOTH",
    title: "Both",
    description: "Answer using multiple choice and expand with free response.",
  },
];
