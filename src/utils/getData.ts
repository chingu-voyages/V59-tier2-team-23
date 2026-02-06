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
  console.log(user?.user_metadata.name);
  if (user) {
    const fName = user?.user_metadata.name.split(" ")[0] || "user";
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
  selectedOption: "A" | "B" | "C" | "D",
  isCorrect: boolean,
) {
  const { data } = await supabase
    .from("user_answers")
    .insert({
      question_id: questionId,
      session_id: sessionId,
      answer_id: answerId,
      selected_option: selectedOption,
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
    .select()
    .single();
  console.log(data);
}

//gets users stats for leader dashboard get sessions for all users////
export async function getAllSessionsForRole(roleId: string) {
  console.log(roleId);
  const { data } = await supabase
    .from("sessions")
    .select("user_id, score, total_questions, completed_at, user_name")
    .eq("role_id", roleId)
    .not("completed_at", "is", null);
  console.log("get all session for role", data);

  return data;
}

//get one user session history
export async function getAllSessionsUser(userId: string) {
  console.log(userId);
  const { data, error } = await supabase
    .from("sessions")
    .select("*, roles(name)")
    .eq("user_id", userId)
    .order("started_at", { ascending: false });
  console.log(error);
  console.log("user sessions", data);
  return data;
}

export async function getSessions() {
  const { data } = await supabase.from("sessions").select("*");
  console.log("sessions", data);
  return data;
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
    .maybeSingle();
  return data;
}
//gets users stats for leader dashboard

//get quizHistory
export async function getQuizHistory(sessionId: string) {
  const { data: session } = await supabase
    .from("sessions")
    .select("id, role_id, completed_at")
    .eq("id", sessionId)
    .single();

  if (!session) return null;

  const { data: userAnswers } = await supabase
    .from("user_answers")
    .select("question_id, selected_option, is_correct")
    .eq("session_id", sessionId)
    .order("answered_at", { ascending: true });

  if (!userAnswers) return null;

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
  const { data } = await supabase
    .from("user_answers")
    .select("*, questions(question, rationale), answers(answer)")
    .eq("session_id", sessionId);

  console.log(data);
  return data;
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
    .single();
  console.log(newQuestion);
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
  console.log(newQuestion);
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

export async function getUserAnswers() {
  //keep track answers per session
  const { data } = await supabase.from("user_answers").select("*");
  console.log("user_answers", data);
  return data;
}
