import type { FreeResponseAnswer } from "../types/questions";

interface FreeResponseResultsProps {
  responses: FreeResponseAnswer[];
  onBack?: () => void;
}

export default function FreeResponseResults({
  responses,
  onBack,
}: FreeResponseResultsProps) {
  const getScoreColor = (s: string) => {
    if (s === "1/" || s === "2/" || s === "3/") return "text-red-600";
    if (s === "4/" || s === "5/" || s === "6/") return "text-yellow-600";
    if (s === "7/" || s === "8/" || s === "9/" || s === "10")
      return "text-green-600";
    return "text-gray-500";
  };

  return (
    <div className="h-1000 bg-gray-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Free Response Results
        </h1>

        {responses.map((r, idx) => (
          <div key={r.id} className="bg-white rounded-xl shadow p-6 space-y-4">
            <div className="text-sm text-gray-500">Question {idx + 1}</div>

            <p className="text-lg font-semibold text-gray-900">{r.question}</p>

            <div>
              <div className="text-sm font-semibold text-gray-700 mb-1">
                Your Response
              </div>
              <p className="rounded-lg border border-gray-300 p-3 bg-gray-50 text-sm whitespace-pre-wrap">
                {r.response}
              </p>
            </div>

            <div className="rounded-lg p-4">
              <div className="font-semibold text-blue-800 mb-1">
                Gemini Feedback
              </div>
              <p
                className={`font-semibold text-sm ${getScoreColor(r.feedback.slice(7, 9))}`}
              >
                {r.feedback}
              </p>
            </div>
          </div>
        ))}

        {onBack && (
          <button
            onClick={onBack}
            className="w-full max-w-sm mx-auto block rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
