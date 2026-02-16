import type { DbQuestion, DbRole } from "./dbTypes";
import type { Flashcard, RoleQuestions, OptionKey } from "../types/questions";
import { supabase } from "./supabase";

//get all roles
export async function getRoles() {
  const { data, error } = await supabase.from("roles").select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
export async function getRole(roleId: string) {
  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .eq("id", roleId);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

//get role questions login users
export async function getRoleQuestions(selectedRoleId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from("questions")
      .select("*, answers(*)")
      .eq("role_id", selectedRoleId)
      .or(`user_id.is.null,user_id.eq.${userId}`);
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//get role questions guest users
export async function getRoleQuestionsGuest(selectedRoleId: string) {
  const { data, error } = await supabase
    .from("questions")
    .select("*, answers(*)")
    .eq("role_id", selectedRoleId)
    .is("user_id", null);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

//start session and get session id
export async function startSession(
  roleId: string,
  score: number,
  totalQuestions: number,
) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("Authentication error");
      return null;
    }
    const fName = user?.user_metadata?.name?.split(" ")[0] || "user";
    const { data, error } = await supabase
      .from("sessions")
      .insert({
        user_id: user?.id,
        role_id: roleId,
        user_name: fName,
        score: score,
        total_questions: totalQuestions,
      })
      .select()
      .single();
    if (error) {
      console.log("Error starting session");
      return null;
    }
    return data;
  } catch (error: unknown) {
    console.log("Error starting session", error);
    return null;
  }
}

//track user responses
export async function trackUserAnswers(
  questionId: string,
  sessionId: string,
  answerId: string,
  selectedOption: "A" | "B" | "C" | "D",
  isCorrect: boolean,
) {
  try {
    const { data, error } = await supabase
      .from("user_answers")
      .insert({
        question_id: questionId,
        session_id: sessionId,
        answer_id: answerId,
        selected_option: selectedOption,
        is_correct: isCorrect,
      })
      .select();
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//finish session
export async function finishSession(correctAnswers: number, sessionId: string) {
  try {
    const { data, error } = await supabase
      .from("sessions")
      .update({ score: correctAnswers, completed_at: new Date().toISOString() })
      .eq("id", sessionId)
      .select()
      .single();
    if (error) {
      console.log("error closing session", error);
      return null;
    }
    return data;
  } catch (error: unknown) {
    console.log("error closing session", error);
    return null;
  }
}

//gets users stats for leader dashboard get sessions for all users////
export async function getAllSessionsForRole(roleId: string) {
  const { data, error } = await supabase
    .from("sessions")
    .select("user_id, score, total_questions, completed_at, user_name")
    .eq("role_id", roleId)
    .not("completed_at", "is", null);
  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

//get one user session history
export async function getAllSessionsUser(userId: string) {
  const { data, error } = await supabase
    .from("sessions")
    .select("*, roles(name)")
    .eq("user_id", userId)
    .order("started_at", { ascending: false });
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

export async function getSessions() {
  const { data, error } = await supabase.from("sessions").select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
export async function getSession(sessionId: string) {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("id", sessionId);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
//get cuurent active session
export async function getCurrentActiveSession(userId: string) {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .is("completed_at", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}
//gets users stats for leader dashboard

//get quizHistory
export async function getQuizHistory(sessionId: string) {
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .select("id, role_id, completed_at")
    .eq("id", sessionId)
    .single();

  if (sessionError) {
    console.log(sessionError);
    return null;
  }

  const { data: userAnswers, error: answersError } = await supabase
    .from("user_answers")
    .select("question_id, selected_option, is_correct")
    .eq("session_id", sessionId)
    .order("answered_at", { ascending: true });

  if (answersError) {
    console.log(answersError);
    return null;
  }

  return {
    submitted: session.completed_at !== null,
    submittedAt: session.completed_at || new Date().toISOString(),
    roleId: session.role_id,
    id: session.id,
    userAnswers: userAnswers.map((answer) => ({
      Qid: answer.question_id,
      selectedOption: answer.selected_option,
      correct: answer.is_correct,
    })),
  };
}

//get details answers
export async function getSessionDetails(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from("user_answers")
      .select("*, questions(question, rationale), answers(answer)")
      .eq("session_id", sessionId);
    if (error) {
      console.log(error);
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

//save one ai generated questions with answers
interface AiQuestions {
  userId: string; //get from supabase
  roleId: string; //get from supabase
  question: string;
  rationale: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  correctAnswer: string;
}
export async function saveAiQuestions(aiQuestions: AiQuestions) {
  const {
    userId,
    roleId,
    question,
    rationale,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    correctAnswer,
  } = aiQuestions;

  const { data: newQuestion, error: questionError } = await supabase
    .from("questions")
    .insert({
      user_id: userId,
      role_id: roleId,
      question: question,
      rationale: rationale,
      difficulty: "intermediate",
      source: "user_generated",
    })
    .select()
    .single();

  if (questionError || !newQuestion) {
    console.log("Error saving questions");
    return null;
  }

  const { error: answersError } = await supabase.from("answers").insert([
    {
      question_id: newQuestion.id,
      answer: choiceA,
      is_correct: correctAnswer === "A",
      display_order: 1,
    },
    {
      question_id: newQuestion.id,
      answer: choiceB,
      is_correct: correctAnswer === "B",
      display_order: 2,
    },
    {
      question_id: newQuestion.id,
      answer: choiceC,
      is_correct: correctAnswer === "C",
      display_order: 3,
    },
    {
      question_id: newQuestion.id,
      answer: choiceD,
      is_correct: correctAnswer === "D",
      display_order: 4,
    },
  ]);

  if (answersError) {
    console.log("Error saving answers");
  }
  return newQuestion;
}
//save one ai generated questions with answers

//get login user info
export async function getUserInfo() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    return null;
  }

  return user;
}

//extra functions to get tables info
export async function getQuestions() {
  const { data, error } = await supabase.from("questions").select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

export async function getAnswers() {
  const { data, error } = await supabase.from("answers").select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

export async function getUserAnswers() {
  //keep track answers per session
  const { data, error } = await supabase.from("user_answers").select("*");
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

//Data transformers
export function transformToFlashcard(dbQuestion: DbQuestion): Flashcard {
  const sortedAnswers = [...dbQuestion.answers].sort(
    (a, b) => a.display_order - b.display_order,
  );

  const OptionKeys: OptionKey[] = ["A", "B", "C", "D"];
  const options: Record<OptionKey, string> = {
    A: sortedAnswers[0]?.answer || "",
    B: sortedAnswers[1]?.answer || "",
    C: sortedAnswers[2]?.answer || "",
    D: sortedAnswers[3]?.answer || "",
  };

  const answerIds: Record<OptionKey, string> = {
    A: sortedAnswers[0]?.id || "",
    B: sortedAnswers[1]?.id || "",
    C: sortedAnswers[2]?.id || "",
    D: sortedAnswers[3]?.id || "",
  };

  const correctAnswerIndex = sortedAnswers.findIndex((a) => a.is_correct);
  const correctAnswerKey = OptionKeys[correctAnswerIndex] || "A";

  return {
    id: dbQuestion.id,
    question: dbQuestion.question,
    options,
    answer: correctAnswerKey,
    rationale: dbQuestion.rationale || "",
    answerIds,
  };
}

export function transformToRoleQuestions(
  role: DbRole,
  questions: DbQuestion[],
): RoleQuestions {
  const seen = new Set<string>();
  const uniqueQuestions = questions.filter((question) => {
    if (seen.has(question.id)) return false;
    seen.add(question.id);
    return true;
  });

  return {
    id: role.id,
    role: role.name,
    focus: role.description,
    flashcards: uniqueQuestions.map(transformToFlashcard),
  };
}

export async function getRolesWithQuestions(
  userId?: string,
  isGuest: boolean = false,
): Promise<RoleQuestions[]> {
  const { data: roles } = await supabase
    .from("roles")
    .select("*")
    .order("name");

  if (!roles) return [];
  const rolesWithQuestions: RoleQuestions[] = [];
  for (const role of roles) {
    let questions;
    if (isGuest) {
      const { data } = await supabase
        .from("questions")
        .select("*, answers(*)")
        .eq("role_id", role.id)
        .is("user_id", null);

      questions = data;
    } else if (userId) {
      const { data } = await supabase
        .from("questions")
        .select("*, answers(*)")
        .eq("role_id", role.id)
        .or(`user_id.is.null,user_id.eq.${userId}`);
      questions = data;
    }

    if (questions && questions.length > 0) {
      rolesWithQuestions.push(
        transformToRoleQuestions(role, questions as DbQuestion[]),
      );
    }
  }

  return rolesWithQuestions;
}

//
export async function getLeaderboardData() {
  const { data, error } = await supabase
    .from("sessions")
    .select("user_id, user_name, score, total_questions, role_id, roles(name)")
    .not("completed_at", "is", null);
  if (error) {
    console.log(error);
    return null;
  }
  return data;
}

//Scores
//leader board by role
export async function getLeaderByBoardByRole(roleId: string) {
  const { data, error } = await supabase.rpc("leaderboard_by_role", {
    role_id_input: roleId,
  });

  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

//leader board global
export async function getLeaderBoardGlobal() {
  const { data, error } = await supabase.rpc("leaderboard_global");
  if (error) {
    console.log(error);
    return null;
  }

  return data;
}

export async function userPercentile(
  roleId: string,
  score: number,
  totalQuestions: number,
) {
  const { data, error } = await supabase.rpc("user_percentile_for_role", {
    role_id_input: roleId,
    user_score: score,
    user_total_questions: totalQuestions,
  });
  if (error) {
    console.log(error);
    return null;
  }

  return data;
}
