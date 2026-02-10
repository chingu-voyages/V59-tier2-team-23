import { useState, type SetStateAction } from "react";
import type { FreeResponseAnswer, RoleQuestions, UserAnswer } from "../types/questions.ts";
import { v4 } from "uuid";
import type { FreeDbQuestion } from "../utils/dbTypes.ts";

interface EssayCardProps {
  questions: FreeDbQuestion[];
  onSubmitAll: (
    answers: (UserAnswer | FreeResponseAnswer)[],
  ) => void;
  currentIndex: number,
  selectedRole: RoleQuestions,
  setUserAnswers: React.Dispatch<SetStateAction<(UserAnswer | FreeResponseAnswer)[]>>
  setCurrentIndex: React.Dispatch<SetStateAction<number>>
  userAnswers: (UserAnswer | FreeResponseAnswer)[];
}

const exampleFeedback = () =>
  "This is placeholder feedback. Your response demonstrates thoughtful reflection and relevant experience.";

export default function EssayCard({ currentIndex, userAnswers, setCurrentIndex, selectedRole, setUserAnswers, onSubmitAll }: EssayCardProps) {
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = selectedRole.flashcards[currentIndex];

  const handleSubmit = () => {
    const fb = exampleFeedback();

    const answer = {
      id: v4(),
      FQid: currentQuestion.id,
      question: currentQuestion.question,
      response,
      feedback: fb,
      correct: Math.ceil(Math.random() * 100)
    };

    setFeedback(fb);
    setSubmitted(true);
    setUserAnswers((prev) => [...prev, answer]);


  };

  const handleNext = () => {
    const isLastQuestion = currentIndex === selectedRole?.flashcards.length - 1;

    if (isLastQuestion) {
      onSubmitAll(userAnswers);
      return;
    }

    setResponse("");
    setFeedback("");
    setSubmitted(false);
    setCurrentIndex((prev) => prev + 1);
  };

  // console.log(answers);

  if (!currentQuestion) {// <- I don't think we need it anymore
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold">
          You’ve completed the {selectedRole.role} free response.
        </h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-sm text-gray-500">
          Question {currentIndex + 1} of {selectedRole?.flashcards.length}
        </div>
        <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {selectedRole.role}
        </div>
        <p className="text-lg font-medium text-gray-900">
          {currentQuestion.question}
        </p>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          disabled={submitted}
          placeholder="Type your response here..."
          className="w-full min-h-[140px] rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
        />

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!response.trim()}
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold"
          >
            Submit Response
          </button>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
              <div className="font-semibold mb-1">AI Feedback { }</div>
              <p className="text-sm">{feedback}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full rounded-lg border border-blue-600 py-2 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              {currentIndex === selectedRole.flashcards.length - 1
                ? "Show Results"
                : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
