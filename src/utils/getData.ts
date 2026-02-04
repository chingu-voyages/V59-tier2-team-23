import { supabase } from "./supabase";
//get all roles
export async function getRoles() {
  const { data } = await supabase.from("roles").select("*");
  console.log("roles data", data);
  return data;
}

//get role questions login users
export async function getRoleQuestions(selectedRoleId: string, userId: string) {
  const { data } = await supabase
    .from("questions")
    .select("*, answers(*)")
    .eq("role_id", selectedRoleId)
    .or(`user_id.is.null,user_id.eq.${userId}`);
  console.log("selected role login user questions", data);
  return data;
}

//get role questions guest users
export async function getRoleQuestionsGuest(selectedRoleId: string) {
  const { data } = await supabase
    .from("questions")
    .select("*, answers(*)")
    .eq("role_id", selectedRoleId)
    .is("user_id", null);
  console.log("selected role questions guest", data);
  return data;
}

//start session and get session id
export async function startSession(
  roleId: string,
  score: number,
  totalQuestions: number,
) {
  //you need to be login so you can get the user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Authenticated user info", user);
  if (user) {
    const { data } = await supabase
      .from("sessions")
      .insert({
        user_id: user?.id,
        role_id: roleId,
        score: score,
        total_questions: totalQuestions,
      })
      .select()
      .single();

    console.log("Current session data", data);
    return data;
  }
}

//track user responses
export async function trackUserAnswers(
  questionId: string,
  sessionId: string,
  answerId: string,
  isCorrect: boolean,
) {
  const { data } = await supabase
    .from("user_answers")
    .insert({
      question_id: questionId,
      session_id: sessionId,
      answer_id: answerId,
      is_correct: isCorrect,
    })
    .select();
  console.log("user answers current session", data);
}

//finish session

export async function finishSession(correctAnswers: number, sessionId: string) {
  const { data } = await supabase
    .from("sessions")
    .update({ score: correctAnswers, completed_at: new Date().toISOString() })
    .eq("id", sessionId)
    .select();
  console.log(data);
}

//gets users stats for leader dashboard
export async function getAllSessionsForRole(roleId: string) {
  //for leader board and calculate percentage
  const { data } = await supabase
    .from("sessions")
    .select("user_id, score, total_questions, completed_at")
    .eq("role_id", roleId)
    .not("completed_at", "is", null);
  console.log("get all session for role", data);

  return data;
}

//get user session history
export async function getAllSessionsUser(userId: string) {
  const { data } = await supabase
    .from("sessions")
    .select("*, roles(name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  console.log("user sessions", data);
  return data;
}

//get details answers
export async function getSessionDetails(sessionId: string) {
  const { data } = await supabase
    .from("user_answers")
    .select("*, questions(question, explanation), answers(answer)")
    .eq("session_id", sessionId);

  console.log(data);
  return data;
}

//save one ai generated questions with answers
interface AiQuestions {
  userId: string;
  roleId: string;
  question: string;
  explanation: string;
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
    explanation,
    choiceA,
    choiceB,
    choiceC,
    choiceD,
    correctAnswer,
  } = aiQuestions;

  const { data: newQuestion } = await supabase
    .from("questions")
    .insert({
      user_id: userId,
      role_id: roleId,
      question: question,
      explanation: explanation,
      difficulty: "intermediate",
      source: "user_generated",
    })
    .select()
    .single();

  if (!newQuestion) return null;

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
  ]);

  return newQuestion;
}
//save one ai generated questions with answers

//get login user info
export async function getUserInfo() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Authenticated user info", user);
  return user;
}

//extra functions to get tables info

export async function getQuestions() {
  const { data } = await supabase.from("questions").select("*");
  console.log("questions", data);
  return data;
}

export async function getAnswers() {
  const { data } = await supabase.from("answers").select("*");
  console.log("answers", data);
  return data;
}

export async function getSessions() {
  const { data } = await supabase.from("sessions").select("*");
  console.log("sessions", data);
  return data;
}

export async function getUserAnswers() {
  //keep track answers per session
  const { data } = await supabase.from("user_answers").select("*");
  console.log("user_answers", data);
  return data;
}
//thi on is on te top too just wanted to have it on the tables functions too
// export async function getRoles() {
//   const { data } = await supabase.from("roles").select("*");
//   console.log("roles data", data);
//   return data;
// }
