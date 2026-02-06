import { Link } from "react-router-dom";
import Acordion from "../components/Acordion";
import {
  getRoleQuestions,
  getRoles,
  getUserAnswers,
  getUserInfo,
  startSession,
  finishSession,
  getAllSessionsForRole,
  getAllSessionsUser,
  getSessions,
  getSessionDetails,
} from "../utils/getData";

const buttonStyles =
  " cursor-pointer px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-all w-fit";
const sectionStyles = "flex flex-col gap-4  p-4 rounded-lg shadow-lg m-4";
// const selectedRoleId = "44b53191-0f2c-4260-949b-e7143995f991"; //scrumMasters
const selectedRoleId = "12258174-d9a6-458c-8b61-2c2f469dfd1c"; //developer
const sessionId = "8fda9f4f-d356-4d66-9774-4c6afd29383f"; //update this every session starting new quiz
const score = -1000;
const totalQuestions = 5;
const userId = "8fda9f4f-d356-4d66-9774-4c6afd29383f"; //my userId

export default function SupabaseExamples() {
  return (
    <main className={sectionStyles}>
      <Acordion />

      <section className="flex gap-4 flex-wrap">
        <button onClick={getUserInfo} className={buttonStyles}>
          get user info
        </button>
        <button onClick={getRoles} className={buttonStyles}>
          Get roles
        </button>

        <button
          onClick={() => getRoleQuestions(selectedRoleId, userId)}
          className={buttonStyles}
        >
          Get Questions selected role
        </button>
        <button
          onClick={() => startSession(selectedRoleId, score, totalQuestions)}
          className={buttonStyles}
        >
          start session
        </button>
        <h2>Track Questions</h2>
        <button
          onClick={() => finishSession(0, sessionId)}
          className={buttonStyles}
        >
          finish session
        </button>
        {/*         
        <button onClick={getQuestions} className={buttonStyles}>
          Get All Questions
        </button>
        <button onClick={getAnswers} className={buttonStyles}>
          Get All Answers
        </button> */}
        <button
          onClick={() => getAllSessionsUser(userId)}
          className={buttonStyles}
        >
          Get User Sessions
        </button>
        <button
          onClick={() => getAllSessionsForRole(selectedRoleId)}
          className={buttonStyles}
        >
          Get all session for role
        </button>
        <button onClick={() => getSessions()} className={buttonStyles}>
          Get all session
        </button>
        <button onClick={getUserAnswers} className={buttonStyles}>
          Get User answers
        </button>
        <button
          onClick={() => getSessionDetails(sessionId)}
          className={buttonStyles}
        >
          get seesion details
        </button>
      </section>

      <section className="flex gap-4 flex-wrap"></section>

      <Link
        to="https://supabase.com/docs/reference/javascript/select"
        className="text-blue-600"
      >
        Go to Supabase Documentation
      </Link>
    </main>
  );
}
