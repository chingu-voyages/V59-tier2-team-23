import questionsData from "../data/questions.json";
import { useState } from "react";
import type {
  RoleQuestions,
  Flashcard,
  UserAnswer,
  OptionKey,
  QuestionnaireResult,
  AppStep,
} from "../types/questions.ts";

const roles = questionsData as RoleQuestions[];

interface RoleSelectorProps {
  roles: RoleQuestions[];
  selectedRole: RoleQuestions | null;
  onSelect: (role: RoleQuestions) => void;
  onBegin: () => void;
}

interface QuestionCardProps {
  question: Flashcard;
  selectedOption: OptionKey | null;
  onSelect: (option: OptionKey) => void;
  onSubmit: () => void;
  current: number;
  total: number;
}

interface FeedbackProps {
  question: Flashcard;
  userAnswer: UserAnswer;
  onNext: () => void;
  current: number;
  total: number;
}

// interface ResultsProps {
//   result: QuestionnaireResult;
// }

export default function Questionnaire() {
  const [step, setStep] = useState<AppStep>("ROLE_SELECTION");
  const [selectedRole, setSelectedRole] = useState<RoleQuestions | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [lastQuestion, setLastQuestion] = useState<Flashcard | null>(null);
  const [lastUserAnswer, setLastUserAnswer] = useState<UserAnswer | null>(null);

  function RoleSelector({
    roles,
    selectedRole,
    onSelect,
    onBegin,
  }: RoleSelectorProps) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center">Select Your Role</h2>

          <div className="space-y-3">
            {roles.map((role) => {
              const isSelected = selectedRole?.role === role.role;

              return (
                <button
                  key={role.role}
                  onClick={() => onSelect(role)}
                  className={`
                w-full rounded-xl border p-4 text-left transition
                ${
                  isSelected
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-gray-200 hover:bg-blue-50"
                }
              `}
                >
                  <h3 className="font-semibold">{role.role}</h3>
                  <p className="text-sm text-gray-600">{role.focus}</p>
                </button>
              );
            })}
          </div>

          <button
            onClick={onBegin}
            disabled={!selectedRole}
            className="
          w-full rounded-lg bg-blue-600 py-3 text-white font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-blue-700 transition
        "
          >
            Begin Questionnaire
          </button>
        </div>
      </div>
    );
  }

  function QuestionCard({
    question,
    selectedOption,
    onSelect,
    onSubmit,
    current,
    total,
  }: QuestionCardProps) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center text-sm text-gray-500">
            Question <span className="font-semibold">{current}</span> /{" "}
            <span className="font-semibold">{total}</span>
          </div>
          <h3 className="text-lg font-semibold text-center p-3 rounded-lg">
            {question.question}
          </h3>

          <div className="space-y-3">
            {Object.entries(question.options).map(([key, value]) => {
              const isSelected = selectedOption === key;

              return (
                <button
                  key={key}
                  onClick={() => onSelect(key as OptionKey)}
                  className={`
                w-full rounded-lg border p-3 text-left transition
                ${
                  isSelected
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white border-gray-300 hover:bg-blue-50"
                }
              `}
                >
                  <span className="font-semibold mr-2">{key}.</span>
                  {value}
                </button>
              );
            })}
          </div>

          <button
            onClick={onSubmit}
            disabled={!selectedOption}
            className="
          w-full rounded-lg bg-blue-600 py-3 text-white font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:bg-blue-700 transition
        "
          >
            Submit Answer
          </button>
        </div>
      </div>
    );
  }

  function Feedback({
    question,
    userAnswer,
    onNext,
    current,
    total,
  }: FeedbackProps) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center text-sm text-gray-500">
            Question <span className="font-semibold">{current}</span> /{" "}
            <span className="font-semibold">{total}</span>
          </div>
          <h3 className="text-lg font-semibold text-center">
            {question.question}
          </h3>

          <div className="space-y-3">
            {Object.entries(question.options).map(([key, value]) => {
              const isCorrect = key === question.answer;
              const isSelected = key === userAnswer.selectedOption;

              let styles = "border-gray-300 bg-white";

              if (isCorrect) {
                styles = "border-green-500 bg-green-100";
              } else if (isSelected && !userAnswer.correct) {
                styles = "border-red-500 bg-red-100";
              }

              return (
                <div
                  key={key}
                  className={`w-full rounded-lg border p-3 ${styles}`}
                >
                  <span className="font-semibold mr-2">{key}.</span>
                  {value}
                </div>
              );
            })}
          </div>

          <p className="text-sm text-gray-700">
            <strong>Reasoning:</strong> {question.rationale}
          </p>

          <button
            onClick={onNext}
            className="
          w-full rounded-lg bg-blue-600 py-3 text-white font-semibold
          hover:bg-blue-700 transition
        "
          >
            Next Question
          </button>
        </div>
      </div>
    );
  }

  function Results() {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <h2 className="text-2xl font-bold">Results</h2>
          {/* Result Component */}
        </div>
      </div>
    );
  }

  if (step === "ROLE_SELECTION") {
    return (
      <RoleSelector
        roles={roles}
        selectedRole={selectedRole}
        onSelect={setSelectedRole}
        onBegin={() => {
          if (!selectedRole) return;
          setCurrentIndex(0);
          setUserAnswers([]);
          setStep("QUESTION");
        }}
      />
    );
  }

  if (!selectedRole) return null;

  const totalQuestions = selectedRole.flashcards.length;

  const currentQuestion = selectedRole.flashcards[currentIndex];

  if (step === "QUESTION") {
    return (
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        current={currentIndex + 1}
        total={totalQuestions}
        onSelect={setSelectedOption}
        onSubmit={() => {
          if (!selectedOption) return;

          const correct = selectedOption === currentQuestion.answer;

          const answerRecord: UserAnswer = {
            Qid: currentQuestion.id,
            selectedOption,
            correct,
          };

          setUserAnswers((prev) => [...prev, answerRecord]);
          setLastQuestion(currentQuestion);
          setLastUserAnswer(answerRecord);

          setSelectedOption(null);
          setStep("FEEDBACK");
        }}
      />
    );
  }

  if (step === "FEEDBACK" && lastQuestion && lastUserAnswer) {
    return (
      <Feedback
        question={lastQuestion}
        userAnswer={lastUserAnswer}
        current={currentIndex + 1}
        total={totalQuestions}
        onNext={() => {
          const nextIndex = currentIndex + 1;

          if (nextIndex < selectedRole.flashcards.length) {
            setCurrentIndex(nextIndex);
            setStep("QUESTION");
          } else {
            setStep("RESULTS");
          }
        }}
      />
    );
  }

  if (step === "RESULTS") {
    const result: QuestionnaireResult = {
      submitted: true,
      submittedAt: new Date().toISOString(),
      roleId: roles.indexOf(selectedRole) + 1,
      userAnswers,
    };

    console.log(result);

    return <Results />;
  }

  return null;
}
