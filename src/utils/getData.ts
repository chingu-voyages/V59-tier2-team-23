import { supabase } from "./supabase";

export async function getRoles() {
  const { data } = await supabase.from("roles").select("*");
  console.log("roles data", data);
  return data;
}

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

export async function getRoleQuestions(selectedRoleId: string) {
  const { data } = await supabase
    .from("questions")
    .select("*, answers(*)")
    .eq("role_id", selectedRoleId);
  console.log("selected role questions", data);
  return data;
}

export async function getUserInfo() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Authenticated user info", user);
  return user;
}

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

export async function finishSession(correctAnswers: number, sessionId: string) {
  const { data } = await supabase
    .from("sessions")
    .update({ score: correctAnswers, completed_at: new Date().toISOString() })
    .eq("id", sessionId)
    .select();
  console.log(data);
}

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

export async function getAllSessionsUser(userId: string) {
  const { data } = await supabase
    .from("sessions")
    .select("*, roles(name)")
    .eq("user_id", userId);

  console.log("user sessions", data);
  return data;
}

export async function sessionDetails(sessionId: string) {
  const { data } = await supabase
    .from("user_answers")
    .select("*, questions(question, explanation), answers(answer)")
    .eq("session_id", sessionId);

  console.log(data);

  return data;
}
