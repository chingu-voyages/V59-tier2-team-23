import type { JSX } from "react";
import { useState, useRef, useEffect } from "react";
import { geminiModel } from "../components/Geminifunction";
import { handleGenerateMoreQuestions } from "../components/MoreQuestions";

type Props = {
  // selectedRole?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Geminitest({}: // className = "",
// ...props
Props): JSX.Element {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    const maxHeight = window.innerHeight * 0.5;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [input]);

  async function handleSend() {
    const result = await geminiModel.generateContent(input);
    const text = result.response.text();
    setOutput(text);
  }

  return (
    <div className="p-4 space-y-4">
      <textarea
        ref={textareaRef}
        className="border p-2 w-full resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Gemini something..."
        style={{
          maxHeight: "40vh",
          overflowY: "auto",
        }}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      <p>
        Or use one of these buttons to generate 20 additional questions for the
        role of your choice.
      </p>

      <button
        id="scrumMasterButton"
        onClick={async () => {
          const result = await handleGenerateMoreQuestions("Scrum Master");
          setOutput(result);
        }}
        className="bg-red-600 text-white mx-2 px-4 py-2 rounded"
      >
        Scrum Master
      </button>

      <button
        id="scrumProductOwnerButton"
        onClick={async () => {
          const result = await handleGenerateMoreQuestions(
            "Scrum Product Owner",
          );
          setOutput(result);
        }}
        className="bg-red-600 text-white mx-2 px-4 py-2 rounded"
      >
        Scrum Product Owner
      </button>

      <button
        id="uiUxDesignerButton"
        onClick={async () => {
          const result = await handleGenerateMoreQuestions("UI/UX Designer");
          setOutput(result);
        }}
        className="bg-red-600 text-white mx-2 px-4 py-2 rounded"
      >
        UI/UX Designer
      </button>

      <button
        id="webDeveloperButton"
        onClick={async () => {
          const result = await handleGenerateMoreQuestions("Web Developer");
          console.log(result);
          //This adds one question into database using the save to ai function it take an object with this shape
          //interface AiQuestions {
          //   userId: string; get from supabse functions
          //   roleId: string; get from supabse functions

          //   question: string;
          //   rationale: string;
          //   choiceA: string;
          //   choiceB: string;
          //   choiceC: string;
          //   choiceD: string;
          //   correctAnswer: string;
          // }
          //  is it possible  to ask gemini to return data with the following structure ? if not i need to create another function to transform it
          // {question: string;
          //   rationale: string;
          //   choiceA: string;
          //   choiceB: string;
          //   choiceC: string;
          //   choiceD: string;
          //   correctAnswer: string;}
          //note: we need to also add  role id and user id from supabase

          setOutput(result);
        }}
        className="bg-red-600 text-white mx-2 px-4 py-2 rounded"
      >
        Web Developer
      </button>

      <button
        id="pythonDeveloperButton"
        onClick={async () => {
          const result = await handleGenerateMoreQuestions("Python Developer");
          setOutput(result);
        }}
        className="bg-red-600 text-white mx-2 px-4 py-2 rounded"
      >
        Python Developer
      </button>

      <div className="border p-2 bg-gray-50 whitespace-pre-wrap py-2">
        {output}
      </div>
    </div>
  );
}
