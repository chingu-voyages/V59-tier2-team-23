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

export async function getRoleQuestions(selectedId: string) {
  const { data } = await supabase
    .from("questions")
    .select("*, answers(*)")
    .eq("role_id", selectedId);
  console.log(data);
  return data;
}

export async function getUserInfo() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Authenticated user info", user);
  return user;
}

export async function startSession() {
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
        role_id: "12258174-d9a6-458c-8b61-2c2f469dfd1c",
        score: -1,
      })
      .select();
    console.log("Current sesion data", data);
  }
}

export async function trackUserAnswers(
  questionId: string,
  sessionId: string,
  answerId: string,
  isCorrect: boolean,
) {
  //updates users questions, Do I need role Id? but im already getting the question for that role.....
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

export async function finishSession() {}
