import { useState } from "react";
import type { Essaycard } from "../types/questions.ts";
import { generateEssayFeedback } from "./FreeResponseFeedback.tsx";

interface EssayCardProps {
  questions: Essaycard[];
  onSubmitAll: (
    answers: {
      id: number;
      question: string;
      response: string;
      feedback: string;
    }[],
  ) => void;
}

export default function EssayCard({ questions, onSubmitAll }: EssayCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<
    {
      id: number;
      question: string;
      response: string;
      feedback: string;
    }[]
  >([]);

  const currentQuestion = questions[currentIndex];

  const getScoreColor = (s: string) => {
    if (s === "1/" || s === "2/" || s === "3/") return "text-red-600";
    if (s === "4/" || s === "5/" || s === "6/") return "text-yellow-600";
    if (s === "7/" || s === "8/" || s === "9/" || s === "10")
      return "text-green-600";
    return "text-gray-500";
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const fb = await generateEssayFeedback(
        currentQuestion.role,
        currentQuestion.question,
        response,
      );

      const responseScore = fb.slice(7, 9);

      setScore(responseScore);

      const answer = {
        id: currentQuestion.id,
        question: currentQuestion.question,
        response,
        feedback: fb,
      };

      setFeedback(fb);
      setSubmitted(true);

      setAnswers((prev) => [...prev, answer]);
    } catch (error) {
      console.error("Error generating feedback:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    const isLastQuestion = currentIndex === questions.length - 1;

    if (isLastQuestion) {
      onSubmitAll(answers);
      return;
    }
    setResponse("");
    setFeedback("");
    setSubmitted(false);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6 mt-6 mb-6">
        <div className="text-sm text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-800">
          {currentQuestion.role}
        </div>
        <p className="text-lg font-medium text-gray-900">
          {currentQuestion.question}
        </p>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          disabled={submitted}
          placeholder="Type your response here..."
          className="w-full min-h-[140px] rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-gray-800 disabled:bg-gray-100"
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-xs text-white text-center">
            <h2 className="text-black text-[16px] font-semibold mb-6">
              Asking Gemini for Feedback
            </h2>
            <div className="w-[50px] h-[50px] rounded-full border-4 border-white/30 border-t-gray-800 animate-spin mb-6"></div>
          </div>
        ) : null}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!response.trim()}
            className="w-full rounded-lg bg-gray-800 hover:bg-gray-600 py-2 text-white font-semibold"
          >
            Submit Response
          </button>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg p-4 text-blue-800">
              <div className="font-semibold mb-1">Gemini Feedback</div>
              <p className={`font-semibold text-sm ${getScoreColor(score)}`}>
                {feedback}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full rounded-lg border border-gray-800 py-2 text-gray-800 font-semibold hover:bg-gray-800 hover:text-white transition"
            >
              {currentIndex === questions.length - 1
                ? "Continue"
                : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
