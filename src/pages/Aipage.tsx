import type { JSX } from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom"

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Aipage({
  className = "",
  ...props
}: Props): JSX.Element {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendToGemini(q: string) {
    const KEY = import.meta.env.VITE_GEMINI_API_KEY;
    if (!KEY) throw new Error("No VITE_GEMINI_API_KEY found");

    setLoading(true);
    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1.5/models/text-bison-001:generateText?key=${KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: { text: q },
            temperature: 0.2,
            maxOutputTokens: 256,
          }),
        },
      );

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Gemini API error: ${resp.status} ${text}`);
      }

      const data = await resp.json();
      const generatedAnswer =
        data?.candidates?.[0]?.output ||
        data?.output?.[0]?.content ||
        JSON.stringify(data);
      setAnswer(generatedAnswer);
    } catch (err: any) {
      setAnswer(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${className} h-auto flex flex-col items-center w-4/5 mx-auto text-center min-w-42.5`}
      {...props}
    >
      <p className="text-[1.2rem]">This is a test page for AI.</p>

      <div className="flex flex-col items-center">
        <input
          type="text"
          value={question}
          placeholder="What question would you like to ask?"
          onChange={(e) => setQuestion(e.target.value)}
          className="border-3 p-5 rounded-lg mt-5 w-100"
        />
        <div className="flex">
          <button
            className="border-3 m-5 p-3 rounded-lg"
            onClick={() => sendToGemini(question)}
            disabled={loading || !question.trim()}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
          <button
            className="border-3 m-5 p-3 rounded-lg"
            onClick={() => {
              setQuestion("");
              setAnswer(null);
            }}
          >
            Clear
          </button>
        </div>
        <p className = "border-3 m-5 p-3 rounded-lg w-100 h-auto">
            {answer}
        </p>
      </div>
    </div>
  );
}
