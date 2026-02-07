export interface DbAnswer {
  id: string;
  question_id: string;
  answer: string;
  is_correct: boolean;
  display_order: number;
}

export interface DbQuestion {
  id: string;
  role_id: string;
  question: string;
  rationale: string;
  difficulty: string;
  user_id: string | null;
  answers: DbAnswer[];
}

export interface DbRole {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}
