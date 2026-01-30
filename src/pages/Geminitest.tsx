import type { JSX } from "react";
import { useState } from "react";
import { geminiModel } from "../components/Geminifunction";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Geminitest({
  // className = "",
  // ...props
}: Props): JSX.Element {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  async function handleSend() {
    const result = await geminiModel.generateContent(input);
    const text = result.response.text();
    setOutput(text);
  }

  return (
    <div className="p-4 space-y-4">
      <textarea
        className="border p-2 w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Gemini something..."
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>

        <div className="border p-2 bg-gray-50 whitespace-pre-wrap py-2">
          {output}
        </div>
    </div>
  );
}
