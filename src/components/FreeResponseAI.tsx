// import type { JSX } from "react";
// import { useState, useRef, useEffect } from "react";
import { geminiModel } from "../components/Geminifunction";
import existingQuestions from "../data/essayquestions.json";
import type { GeneratedEssayQuestion } from "../types/questions";

// type Props = {
//   selectedRole: string;
//   className?: string;
// } & React.HTMLAttributes<HTMLDivElement>;

export async function handleGenerateFreeResponse(
  selectedRole: string,
): Promise<GeneratedEssayQuestion[]> {
  const prompt = `
  Persona:

* [ ] I am a ${selectedRole}.
* [ ] I am in either the early stages of building my career or I am looking to switch to a different job.
* [ ] I am an active member of Chingu, Inc.

Input:
* [ ] The Chingu, Inc. website is at https://chingu.io
* [ ] The handbook for active participants in Chingu, Inc. is https://github.com/chingu-voyages/Handbook
* [ ] I want to create a list of practice questions for the ${selectedRole} role to help me practice for face-to-face interviews with prospective employers

Additional Context:
* Here are existing questions already in my library:
${JSON.stringify(existingQuestions, null, 2)}

Constraints:

* [ ] Questions should be free response questions.
* [ ] Questions should be tailored for someone with a 10th grade high school education.
* [ ] Questions should reflect those that would be asked in a real interview.
* [ ] If the role is Scrum Master, the questions should also be helpful for passing the CSM certification test
* [ ] If the role is Scrum Product Owner, the questions should also be helpful for passing the CSPO certification test
* [ ] If the role is Web Developer or Python Developer, some of the generated questions should be about data structures and algorithms
* [ ] If the role is UI/UX Designer, the questions should not include questions that are specific to HTML, CSS, or programming languages. They should stress UI/UX concepts and practices, like general UI design, responsiveness, and accessibility.
* [ ] Generate exactly 3 questions - no more, no less.

Format:

* [ ] Produce exactly 3 free response questions.
* [ ] Do not include any preamble, introduction, or explanation - only the list of questions in data format exactly like the existing questions in my library.

  IMPORTANT:
  - Output MUST be valid JSON
  - Output MUST be an array
  - No markdown
  - No comments
  `;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse Gemini response", text);
    throw new Error("Invalid AI response format");
  }
}
