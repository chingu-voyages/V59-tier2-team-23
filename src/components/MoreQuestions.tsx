import { geminiModel } from "../components/Geminifunction";

export async function handleGenerateMoreQuestions(selectedRole: string) {
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
* generate this shape. for the 2 properties userId and roleId, empty strings to change later {
  userId: string,       // we get this from Supabase, not from Gemini or Context
  roleId: string,       // we get this from the selected role, not from Gemini

  question: string,     // the actual question text
  rationale: string,    // explanation of why the correct answer is correct
  choiceA: string,      // first option
  choiceB: string,      // second option
  choiceC: string,      // third option
  choiceD: string,      // fourth option
  correctAnswer: string // this needs to be exactly "A", "B", "C", or "D"
}

Constraints:

* [ ] Questions should be multiple choice questions.
* [ ] Questions should be tailored for someone with a 10th grade high school education
* [ ] Questions should reflect those that would be asked in a real interview.
* [ ] If the role is Scrum Master, the questions should also be helpful for passing the CSM certification test
* [ ] If the role is Scrum Product Owner, the questions should also be helpful for passing the CSPO certification test
* [ ] If the role is Web Developer or Python Developer, some of the generated questions should be about data structures and algorithms
* [ ] If the role is UI/UX Designer, the questions should not include questions that are specific to HTML, CSS, or programming languages. They should stress UI/UX concepts and practices, like general UI design, responsiveness, and accessibility.
* [ ] Generate exactly 5 new questions - no more, no less.

Format:

* [ ] Do not include any preamble, introduction, or explanation - only the list of questions.

`;

  console.log("Prompt sent to Gemini in MoreQuestions.tsx:");
  const result = await geminiModel.generateContent(prompt);
  console.log(result);
  return result.response.text();
}
