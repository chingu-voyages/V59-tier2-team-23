import type { JSX } from "react";
import { useState, useRef, useEffect } from "react";
import { geminiModel } from "../components/Geminifunction";
// import existingQuestions from "../data/questions.json";
import { handleGenerateMoreQuestions } from "../components/MoreQuestions";

type Props = {
  selectedRole: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Geminitest({
  selectedRole,
}: // className = "",
// ...props
Props): JSX.Element {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto"; // Reset height to auto to recalculate
    const maxHeight = window.innerHeight * 0.5; // 50% of viewport height
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [input]);

  async function handleSend() {
    const result = await geminiModel.generateContent(input);
    const text = result.response.text();
    setOutput(text);
  }

//   async function handleGenerateMoreScrumMasterQuestions(selectedRole: string) {
//     const prompt = `
//     Persona:

// * [ ] I am a ${selectedRole}.
// * [ ] I am in either the early stages of building my career or I am looking to switch to a different job.
// * [ ] I am an active member of Chingu, Inc.

// Input:
// * [ ] The Chingu, Inc. website is at https://chingu.io
// * [ ] The handbook for active participants in Chingu, Inc. is https://github.com/chingu-voyages/Handbook
// * [ ] I want to create a list of practice questions for the ${selectedRole} role to help me practice for face-to-face interviews with prospective employers

// Additional Context:
// * Here are existing questions already in my library:
// ${JSON.stringify(existingQuestions, null, 2)}

// Constraints:

// * [ ] Questions should be multiple choice questions.
// * [ ] Questions should be tailored for someone with a 10th grade high school education
// * [ ] Questions should reflect those that would be asked in a real interview.
// * [ ] If the role is Scrum Master, the questions should also be helpful for passing the CSM certification tests
// * [ ] Generate exactly 20 new questions - no more, no less.

// Format:

// * [ ] Produce exactly 20 flashcards, numbered 1 through 20.
// * [ ] Do not include any preamble, introduction, or explanation - only the list of questions.
// `;

//     const result = await geminiModel.generateContent(prompt);
//     const text = result.response.text();
//     setOutput(text);
//   }

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

      <button
        onClick={async () => {
          const result = await handleGenerateMoreQuestions("Scrum Master")
          setOutput(result);
        }}
        className="bg-red-600 text-white mx-2 px-4 py-2 rounded"
      >
        Get More Scrum Master Questions
      </button>
      <div className="border p-2 bg-gray-50 whitespace-pre-wrap py-2">
        {output}
      </div>
    </div>
  );
}
