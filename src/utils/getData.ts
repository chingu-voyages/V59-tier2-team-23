import type { DbQuestion, DbRole } from "./dbTypes"
import type { Flashcard, RoleQuestions, OptionKey } from "../types/questions"
import { supabase } from "./supabase"

//get all roles
export async function getRoles() {
  const { data } = await supabase.from("roles").select("*")
  return data
}
export async function getRole(roleId: string) {
  const { data } = await supabase.from("roles").select("*").eq("id", roleId)
  return data
}

//get role questions login users
export async function getRoleQuestions(selectedRoleId: string, userId: string) {
  const { data } = await supabase
    .from("questions")
    .select("*, answers(*)")
    .eq("role_id", selectedRoleId)
    .or(`user_id.is.null,user_id.eq.${userId}`)
  return data
}

//get role questions guest users
export async function getRoleQuestionsGuest(selectedRoleId: string) {
  const { data } = await supabase
    .from("questions")
    .select("*, answers(*)")
    .eq("role_id", selectedRoleId)
    .is("user_id", null)
  return data
}

//start session and get session id
export async function startSession(roleId: string, score: number, totalQuestions: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const fName = user?.user_metadata?.name?.split(" ")[0] || "user"
    const { data } = await supabase
      .from("sessions")
      .insert({
        user_id: user?.id,
        role_id: roleId,
        user_name: fName,
        score: score,
        total_questions: totalQuestions,
      })
      .select()
      .single()
    return data
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
  // const payload = {
  //   question_id: questionId,
  //   session_id: sessionId,
  //   answer_id: answerId,
  //   selected_option: selectedOption,
  //   is_correct: isCorrect,
  // };

  // console.log("trackUserAnswers payload:", payload);

  // const { data, error } = await supabase
  //   .from("user_answers")
  //   .insert(payload)
  //   .select();

  // console.log("trackUserAnswers response:", { data, error });

  // if (error) throw error;
  // return data;
  const { data } = await supabase
    .from("user_answers")
    .insert({
      question_id: questionId,
      session_id: sessionId,
      answer_id: answerId,
      selected_option: selectedOption,
      is_correct: isCorrect,
    })
    .select()
  console.log("user answers current session", data)
}

//finish session
export async function finishSession(correctAnswers: number, sessionId: string) {
  const { data } = await supabase
    .from("sessions")
    .update({ score: correctAnswers, completed_at: new Date().toISOString() })
    .eq("id", sessionId)
    .select()
    .single()
  return data
}

//gets users stats for leader dashboard get sessions for all users////
export async function getAllSessionsForRole(roleId: string) {
  console.log(roleId)
  const { data } = await supabase
    .from("sessions")
    .select("user_id, score, total_questions, completed_at, user_name")
    .eq("role_id", roleId)
    .not("completed_at", "is", null)

  return data
}

//get one user session history
export async function getAllSessionsUser(userId: string) {
  const { data } = await supabase
    .from("sessions")
    .select("*, roles(name)")
    .eq("user_id", userId)
    .order("started_at", { ascending: false })

  return data
}

export async function getSessions() {
  const { data } = await supabase.from("sessions").select("*")
  return data
}
export async function getSession(sessionId: string) {
  const { data } = await supabase.from("sessions").select("*").eq("id", sessionId)
  return data
}
//get cuurent active session
export async function getCurrentActiveSession(userId: string) {
  const { data } = await supabase
    .from("sessions")
    .select("*")
    .eq("user_id", userId)
    .is("completed_at", null)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle()
  return data
}
//gets users stats for leader dashboard

//get quizHistory
export async function getQuizHistory(sessionId: string) {
  const { data: session } = await supabase
    .from("sessions")
    .select("id, role_id, completed_at")
    .eq("id", sessionId)
    .single()

  if (!session) return null

  const { data: userAnswers } = await supabase
    .from("user_answers")
    .select("question_id, selected_option, is_correct")
    .eq("session_id", sessionId)
    .order("answered_at", { ascending: true })

  if (!userAnswers) return null

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
  }
}

//get details answers
export async function getSessionDetails(sessionId: string) {
  const { data } = await supabase
    .from("user_answers")
    .select("*, questions(question, rationale), answers(answer)")
    .eq("session_id", sessionId)

  console.log(data)
  return data
}

//save one ai generated questions with answers
interface AiQuestions {
  userId: string //get from supabase
  roleId: string //get from supabase
  question: string
  rationale: string
  choiceA: string
  choiceB: string
  choiceC: string
  choiceD: string
  correctAnswer: string
}
export async function saveAiQuestions(aiQuestions: AiQuestions) {
  const { userId, roleId, question, rationale, choiceA, choiceB, choiceC, choiceD, correctAnswer } =
    aiQuestions

  const { data: newQuestion } = await supabase
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
    .single()

  if (!newQuestion) return null

  await supabase.from("answers").insert([
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
  ])

  return newQuestion
}
//save one ai generated questions with answers

//get login user info
export async function getUserInfo() {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  console.log("Authenticated user info", user)
  return user
}

//extra functions to get tables info
export async function getQuestions() {
  const { data } = await supabase.from("questions").select("*")
  return data
}

export async function getAnswers() {
  const { data } = await supabase.from("answers").select("*")
  return data
}

export async function getUserAnswers() {
  //keep track answers per session
  const { data } = await supabase.from("user_answers").select("*")
  console.log("user_answers", data)
  return data
}

//Data transformers
export function transformToFlashcard(dbQuestion: DbQuestion): Flashcard {
  const sortedAnswers = [...dbQuestion.answers].sort((a, b) => a.display_order - b.display_order)

  const OptionKeys: OptionKey[] = ["A", "B", "C", "D"]
  const options: Record<OptionKey, string> = {
    A: sortedAnswers[0]?.answer || "",
    B: sortedAnswers[1]?.answer || "",
    C: sortedAnswers[2]?.answer || "",
    D: sortedAnswers[3]?.answer || "",
  }

  const answerIds: Record<OptionKey, string> = {
    A: sortedAnswers[0]?.id || "",
    B: sortedAnswers[1]?.id || "",
    C: sortedAnswers[2]?.id || "",
    D: sortedAnswers[3]?.id || "",
  }

  const correctAnswerIndex = sortedAnswers.findIndex((a) => a.is_correct)
  const correctAnswerKey = OptionKeys[correctAnswerIndex] || "A"

  return {
    id: dbQuestion.id,
    question: dbQuestion.question,
    options,
    answer: correctAnswerKey,
    rationale: dbQuestion.rationale || "",
    answerIds,
  }
}

export function transformToRoleQuestions(role: DbRole, questions: DbQuestion[]): RoleQuestions {
  return {
    id: role.id,
    role: role.name,
    focus: role.description,
    flashcards: questions.map(transformToFlashcard),
  }
}

export async function getRolesWithQuestions(
  userId?: string,
  isGuest: boolean = false,
): Promise<RoleQuestions[]> {
  const { data: roles } = await supabase.from("roles").select("*").order("name")

  if (!roles) return []
  const rolesWithQuestions: RoleQuestions[] = []
  for (const role of roles) {
    let questions
    if (isGuest) {
      const { data } = await supabase
        .from("questions")
        .select("*, answers(*)")
        .eq("role_id", role.id)
        .is("user_id", null)

      questions = data
    } else if (userId) {
      const { data } = await supabase
        .from("questions")
        .select("*, answers(*)")
        .eq("role_id", role.id)
        .or(`user_id.is.null,user_id.eq.${userId}`)
      questions = data
    }

    if (questions && questions.length > 0) {
      rolesWithQuestions.push(transformToRoleQuestions(role, questions as DbQuestion[]))
    }
  }

  return rolesWithQuestions
}

//
export async function getLeaderboardData() {
  const { data } = await supabase
    .from("sessions")
    .select("user_id, user_name, score, total_questions, role_id, roles(name)")
    .not("completed_at", "is", null)

  return data
}

//Scores
//leader board by role
export async function getLeaderByBoardByRole(roleId: string) {
  const { data } = await supabase.rpc("leaderboard_by_role", {
    role_id_input: roleId,
  })
  return data
}

//leader board global
export async function getLeaderBoardGlobal() {
  const { data } = await supabase.rpc("leaderboard_global")
  return data
}

export async function userPercentile(roleId: string, score: number, totalQuestions: number) {
  const { data } = await supabase.rpc("user_percentile_for_role", {
    role_id_input: roleId,
    user_score: score,
    user_total_questions: totalQuestions,
  })

  return data
}
