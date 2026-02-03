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
const questionId = "68a4cad8-ac00-41b6-8200-ba1a13393a08";
const sessionId = "04beb9ef-43ab-4d87-929c-53f232912358";
const answerId = "";
const isCorrect = false;

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
        onClick={() => getRoleQuestions("12258174-d9a6-458c-8b61-2c2f469dfd1c")}
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
        <button onClick={startSession} className={buttonStyles}>
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
        <button onClick={finishSession} className={buttonStyles}>
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
