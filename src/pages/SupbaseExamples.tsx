import { Link } from "react-router-dom";
import Acordion from "../components/Acordion";
import {
  getAnswers,
  getQuestions,
  getRoleQuestions,
  getRoles,
  getSessions,
  getUserAnswers,
  getUserInfo,
  startSession,
  trackUserAnswers,
  finishSession,
} from "../utils/getData";

const buttonStyles =
  " cursor-pointer px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-all w-fit";
const sectionStyles = "flex flex-col gap-4  p-4 rounded-lg shadow-lg m-4";
const selectedRoleId = "44b53191-0f2c-4260-949b-e7143995f991"; //scrumMasters
const questionId = "9b08cd26-9201-408b-96ac-60240901fab6";
const sessionId = "2fd7d608-b049-4891-b6d4-fff7f4e734e2";
const answerId = "7e1ff0a6-b17a-4ff0-925c-386589fa189a";
const isCorrect = false;
const score = -100;
const totalQuestions = 5;
const userId = "add user id";

export default function SupabaseExamples() {
  return (
    <main className={sectionStyles}>
      <Acordion />
      <h2 className="text-gray-800">
        Supabase tables info 5 total open console log to see
      </h2>
      <section className="flex gap-4 flex-wrap">
        <button onClick={getRoles} className={buttonStyles}>
          Get roles
        </button>
        <button onClick={getQuestions} className={buttonStyles}>
          Get All Questions
        </button>
        <button onClick={getAnswers} className={buttonStyles}>
          Get All Answers
        </button>
        <button onClick={getSessions} className={buttonStyles}>
          Get User Sessions
        </button>
        <button onClick={getUserAnswers} className={buttonStyles}>
          Get User answers
        </button>
      </section>
      <h3>Some other queries</h3>
      <button
        onClick={() => getRoleQuestions(selectedRoleId, userId)}
        className={buttonStyles}
      >
        Get Questions selected role
      </button>
      <p className="text-gray-700">
        needs to be login before this this step since we need user data from
        login provider
      </p>
      <section className="flex gap-4 flex-wrap">
        <button onClick={getUserInfo} className={buttonStyles}>
          get user info
        </button>

        <button
          onClick={() => startSession(selectedRoleId, score, totalQuestions)}
          className={buttonStyles}
        >
          start session
        </button>
        <button
          onClick={() =>
            trackUserAnswers(questionId, sessionId, answerId, isCorrect)
          }
          className={buttonStyles}
        >
          Track user answers
        </button>
        <button
          onClick={() => finishSession(0, sessionId)}
          className={buttonStyles}
        >
          finish session
        </button>
      </section>

      <Link
        to="https://supabase.com/docs/reference/javascript/select"
        className="text-blue-600"
      >
        Go to Supabase Documentation
      </Link>
    </main>
  );
}
