import { useState } from "react";
import type { Essaycard } from "../types/questions.ts";
import { handleGenerateFreeResponse } from "./FreeResponseAI.tsx";
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
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<
    {
      id: number;
      question: string;
      response: string;
      feedback: string;
    }[]
  >([]);

  const newData = handleGenerateFreeResponse(questions[0]?.role);

  console.log(newData);

  const currentQuestion = questions[currentIndex];

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const fb = await generateEssayFeedback(
        currentQuestion.role,
        currentQuestion.question,
        response,
      );

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

  console.log(answers);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold">
          You’ve completed the {questions[0]?.role} free response.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-sm text-gray-500">
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div className="text-xs font-semibold uppercase tracking-wide text-blue-600">
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
          className="w-full min-h-[140px] rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-xs text-white text-center">
            <h2 className="text-black text-lg mb-8">
              Asking Gemini for feedback
            </h2>
            <div className="w-[50px] h-[50px] rounded-full border-4 border-white/30 border-t-[#3498db] animate-spin"></div>
          </div>
        ) : null}

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
              <div className="font-semibold mb-1">AI Feedback</div>
              <p className="text-sm">{feedback}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full rounded-lg border border-blue-600 py-2 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
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
