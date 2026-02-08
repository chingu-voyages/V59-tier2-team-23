import { useState, type JSX, useEffect } from "react";
import type {
  RoleQuestions,
  Flashcard,
  Essaycard,
  UserAnswer,
  OptionKey,
  QuestionnaireResult,
  AppStep,
  FreeResponseAnswer,
  QuestionTypeOption,
} from "../types/questions.ts";
import { aggregate } from "../utils/results.ts";
import ResultStats from "./results/ResultStats.tsx";
import ResultsGrid from "./results/ResultsGrid.tsx";
import { Link } from "react-router-dom";
import EssayCard from "./EssayCard.tsx";
import FreeResponseResults from "./FreeResponseResults.tsx";
import { v4 as uuidv4 } from 'uuid';
import {
  finishSession,
  getRolesWithQuestions,
  startSession,
  trackUserAnswers,
} from "../utils/getData.ts";
import { useAuth } from "../context/AuthContext.tsx";
import Skeleton from "@mui/material/Skeleton";
import essayQuestionsData from "../data/essayquestions.json";

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
  onPrev: () => void;
  current: number;
  total: number;
}

interface QuestionSelectorProps {
  types: QuestionTypeOption[];
  selectedType: QuestionTypeOption | null;
  onSelect: (type: QuestionTypeOption) => void;
  onBegin: () => void;
}
interface Props {
  stepInit?: AppStep;
  selectedRoleInit?: RoleQuestions;
  userAnswersInit?: UserAnswer[];
  lastResultInit?: QuestionnaireResult

}
export default function Questionnaire({ stepInit, selectedRoleInit, userAnswersInit, lastResultInit }: Props) {
  const [step, setStep] = useState<AppStep>(stepInit || "ROLE_SELECTION");//
  const [selectedRole, setSelectedRole] = useState<RoleQuestions | null>(null);//
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);//
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [lastQuestion, setLastQuestion] = useState<Flashcard | null>(null);
  const [lastUserAnswer, setLastUserAnswer] = useState<UserAnswer | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<QuestionnaireResult | null>(null);//

  useEffect(() => {
    if (selectedRoleInit) setSelectedRole(selectedRoleInit)
  }, [selectedRoleInit])
  useEffect(() => {
    if (userAnswersInit) setUserAnswers(userAnswersInit);
  }, [userAnswersInit])
  useEffect(() => {
    if (lastResultInit) setLastResult(lastResultInit)
  }, [lastResultInit])
  const { user, isGuestLogin, isAuthLoading } = useAuth();
  const [roles, setRoles] = useState<RoleQuestions[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<QuestionTypeOption | null>(
    null,
  );
  const [freeResponses, setFreeResponses] = useState<FreeResponseAnswer[]>([]);
  const QUESTION_TYPES: QuestionTypeOption[] = [
    {
      type: "FREE_RESPONSE",
      title: "Free Response",
      description: "Write detailed answers in your own words.",
    },
    {
      type: "MULTIPLE_CHOICE",
      title: "Multiple Choice",
      description: "Select from predefined answers.",
    },
    {
      type: "BOTH",
      title: "Both",
      description:
        "Answer using multiple choice and expand with free response.",
    },
  ];

  const roleQuestions: Essaycard[] = selectedRole
    ? essayQuestionsData.filter((q) => q.role === selectedRole.role)
    : [];

  useEffect(() => {
    if (isAuthLoading) return;

    async function loadRoles() {
      setIsLoading(true);
      const data = await getRolesWithQuestions(user?.id, isGuestLogin);
      setRoles(data);
      if (data) setIsLoading(false);
    }

    loadRoles();
  }, [user, isGuestLogin, isAuthLoading]);

  if (isLoading || isAuthLoading)
    return (
      <div className="w-screen h-screen flex  flex-col items-center justify-center  gap-2">
        <Skeleton
          variant="rectangular"
          width="80%"
          height={50}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={50}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={50}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={50}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width="80%"
          height={50}
          animation="wave"
        />
      </div>
    );

  function RoleSelector({
    roles,
    selectedRole,
    onSelect,
    onBegin,
  }: RoleSelectorProps) {
    return (
      <div className="sm:min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 mt-10 mb-10">
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
                ${isSelected
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

  function QuestionSelector({
    types,
    selectedType,
    onSelect,
    onBegin,
  }: QuestionSelectorProps) {
    return (
      <div className="sm:min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 mt-10 mb-10">
          <h2 className="text-2xl font-bold text-center">
            Select Question Format
          </h2>

          <div className="space-y-3">
            {types.map((t) => {
              const isSelected = selectedType?.type === t.type;

              return (
                <button
                  key={t.type}
                  onClick={() => onSelect(t)}
                  className={`
                  w-full rounded-xl border p-4 text-left transition
                  ${isSelected
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white border-gray-200 hover:bg-blue-50"
                    }
                `}
                >
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm text-gray-600">{t.description}</p>
                </button>
              );
            })}
          </div>

          <button
            onClick={onBegin}
            disabled={!selectedType}
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
        <div className="w-full max-w-md space-y-6 mt-10 mb-10">
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
                ${isSelected
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

  type ResultProps = {
    className?: string;
    result: QuestionnaireResult;
    onReview: (answer: UserAnswer, index: number) => void;
    onRetry: () => void;
  } & React.HTMLAttributes<HTMLDivElement>;

  function Results({
    className = "",
    result,
    onRetry,
    onReview,
    ...props
  }: ResultProps): JSX.Element {
    const stats = aggregate(result!.userAnswers);

    return (
      <div
        className={`py-[1rem] px-[1.5rem] flex flex-col items-center   ${className}`}
        {...props}
      >
        <h1 className="text-[1.5rem] text-center  mb-[1rem]">
          {selectedRole?.role} prep results
        </h1>
        <div className="flex items-end justify-between w-full max-w-115 mb-[1rem] gap-[0.5rem]">
          <ResultStats stats={stats} />
          <button
            onClick={onRetry}
            className="h-[2.2rem] rounded-[0.3rem] aspect-5/2 bg-[var(--color-surface)] text-white"
          >
            Retry
          </button>
          <button
            // onClick={}
            className="h-[2.2rem] rounded-[0.3rem] bg-(--color-surface) px-3 text-white"
          >
            Retry With New Questions
          </button>
        </div>
        <div className="mb-[0.5rem] sm:mb-[1.5rem] ">
          If you would like to review any of the questions, you can select them
          from the list below.
        </div>
        <ResultsGrid
          onReview={onReview}
          className="mb-[2.5rem]"
          result={result}
        />
        <div className=" flex flex-col w-full items-center xs:justify-center gap-[0.3rem] xs:flex-row xs:gap-[0.5rem]">
          <Link
            to={"/home"}
            className="mb-[1rem] h-[4rem] rounded-[0.5rem] w-full max-w-[12rem] max-h-[3.5rem] bg-[var(--color-surface)] flex items-center justify-center text-white text-[1.2rem]"
          >
            Back To Home
          </Link>
          {user?.id && <Link to={'/history'} className='mb-[1rem] h-[4rem] rounded-[0.5rem] w-full max-w-[12rem] max-h-[3.5rem] bg-[var(--color-surface)] flex items-center justify-center text-white text-[1.2rem]'>View History</Link>}
        </div>
      </div >
    );
  }

  function Feedback({
    question,
    userAnswer,
    onNext,
    onPrev,
    current,
    total,
  }: FeedbackProps) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 mt-10 mb-10">
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
          <div className="flex flex-col gap-[0.5rem]">
            <div className="flex gap-[0.5rem]">
              {submitted && (
                <button
                  disabled={currentIndex == 0}
                  onClick={onPrev}
                  className="
              w-full rounded-lg bg-blue-600 py-3 text-white font-semibold
            hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition
            "
                >
                  Previous
                </button>
              )}
              <button
                onClick={onNext}
                disabled={
                  submitted &&
                  currentIndex + 1 == selectedRole?.flashcards.length
                }
                className="
              w-full rounded-lg bg-blue-600 py-3 text-white font-semibold
              hover:bg-blue-700 transition
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition

              "
              >
                {!submitted &&
                  currentIndex + 1 < selectedRole?.flashcards.length! &&
                  "Next Question"}
                {!submitted &&
                  currentIndex + 1 == selectedRole?.flashcards.length! &&
                  "Show Results"}
                {submitted && "Next"}
              </button>
            </div>
            {submitted && (
              <button
                onClick={() => setStep("RESULTS")}
                className="
            w-full rounded-lg bg-blue-600 py-3 text-white font-semibold
            hover:bg-blue-700 transition
            "
              >
                Back to Results
              </button>
            )}
          </div>
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
          setStep("QUESTION_SELECTION");
        }}
      />
    );
  }

  if (step === "QUESTION_SELECTION") {
    return (
      <QuestionSelector
        types={QUESTION_TYPES}
        selectedType={selectedType}
        onSelect={setSelectedType}
        onBegin={async () => {
          if (!selectedType || !selectedRole) return;
          setCurrentIndex(0);
          setUserAnswers([]);
          if (selectedType.type === "FREE_RESPONSE") {
            setStep("FR_QUESTION");
          }
          if (selectedType.type === "MULTIPLE_CHOICE") {
            const session = await startSession(
              selectedRole.id,
              0,
              selectedRole.flashcards.length,
            );
            if (session) {
              setSessionId(session.id);
            }
            setStep("MC_QUESTION");
          }
          if (selectedType.type === "BOTH") {
            setStep("BOTH_QUESTION");
          }
        }}
      />
    );
  }

  if (!selectedRole) return null;

  const totalQuestions = selectedRole.flashcards.length;
  const currentQuestion = selectedRole.flashcards[currentIndex];

  if (step === "MC_QUESTION") {
    return (
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        current={currentIndex + 1}
        total={totalQuestions}
        onSelect={setSelectedOption}
        onSubmit={async () => {
          if (!selectedOption) return;

          const correct = selectedOption === currentQuestion.answer;
          if (sessionId) {
            await trackUserAnswers(
              currentQuestion.id as string,
              sessionId,
              currentQuestion.answerIds[selectedOption],
              selectedOption,
              correct,
            );
          }

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
  if (step === "FR_QUESTION") {
    return (
      <EssayCard
        questions={roleQuestions}
        onSubmitAll={(answers) => {
          setFreeResponses(answers);
          setStep("FR_RESULTS");
        }}
      />
    );
  }

  if (step === "BOTH_QUESTION") {
    return (
      <EssayCard
        questions={roleQuestions}
        onSubmitAll={(answers) => {
          setFreeResponses(answers);
          setStep("MC_QUESTION");
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

          if (nextIndex < selectedRole.flashcards.length && !submitted) {
            setCurrentIndex(nextIndex);
            setStep("MC_QUESTION");
          } else if (nextIndex < selectedRole.flashcards.length && submitted) {
            setCurrentIndex(nextIndex);
            setLastUserAnswer(userAnswers[nextIndex]);
            setLastQuestion(selectedRole.flashcards[nextIndex]);
          } else {
            setStep("RESULTS");
          }
        }}
        onPrev={() => {
          const prevIndex = currentIndex - 1;
          if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
            setLastUserAnswer(userAnswers[prevIndex]);
            setLastQuestion(selectedRole.flashcards[prevIndex]);
          }
        }}
      />
    );
  }

  if (step === "FR_RESULTS") {
    return (
      <FreeResponseResults
        responses={freeResponses}
        onBack={() => {
          // Decide where to go next
          if (selectedType?.type === "BOTH") {
            setCurrentIndex(0);
            setStep("MC_QUESTION");
          } else {
            setStep("ROLE_SELECTION");
          }
        }}
      />
    );
  }

  if (step === "RESULTS") {
    if (!submitted) {
      setSubmitted(true);
      const correctCount = userAnswers.filter(
        (answer) => answer.correct,
      ).length;
      if (sessionId) finishSession(correctCount, sessionId!);
    }
    if (!lastResult)
      setLastResult({
        submitted: true,
        submittedAt: new Date().toISOString(),
        roleId: roles.indexOf(selectedRole),
        userAnswers,
        id: uuidv4()
      });
    return (
      <Results
        onRetry={(): void => {
          setCurrentIndex(0);
          setUserAnswers([]);
          setSelectedOption(null);
          setLastQuestion(null);
          setLastUserAnswer(null);
          setSubmitted(false);
          setLastResult(null);
          setStep("MC_QUESTION");
        }}
        onReview={(answer: UserAnswer, index: number) => {
          const question = selectedRole.flashcards[index];
          setLastQuestion(question);
          setLastUserAnswer(answer);
          setCurrentIndex(index);
          setStep("FEEDBACK");
        }}
        result={lastResult!}
      />
    );
  }

  return null;
}
