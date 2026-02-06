# getData.ts Walkthrough

Hey team, here's a walkthrough of the data functions I built in `getData.ts`

So the way it works is, first, the user needs to be logged in for most of this stuff to function. From there, `getRoles()` grabs all the available roles from the database. Once they pick a role, `getRoleQuestions(roleId, userId)` pulls the questions and answers for that role. There's also a `getRoleQuestionsGuest()` version for users who aren't logged in.

After that, we call `startSession(roleId, score, totalQuestions)`, which creates a new session in the database and gives us back a session ID. That session ID is key because the rest of the functions need it to work.

Then, as the user goes through the quiz, `trackUserAnswers()` saves each answer to the database, whether they got it right or wrong, all tied to that session ID.

When they're done, `finishSession(correctAnswers, sessionId)` updates the session with the final score and a timestamp so we know it's completed.

I'm making a PR so you can see everything. I'll try to do a more detailed video too, and we can do a call if you have questions.

---

## @Brian

Wanted to explain how the Gemini response needs to be shaped so it works with the `saveAiQuestions()` function I wrote on the getData file.

The function expects an object that looks like this:

```ts
{
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
```

So basically, Gemini only needs to give us back the question, the rationale, four choices, and which letter is correct. The `userId` and `roleId` we already have on the frontend from the logged-in user and the role they picked.

The important thing is `correctAnswer` has to be just the letter, like `"A"`, not the full answer text. Because in the function I'm checking `correctAnswer === "A"`, `correctAnswer === "B"`, etc. to flag which answer is the right one when saving to the database.

---

## @Emily

Here's what you need from the data functions for the leaderboard.

The main one is `getAllSessionsForRole(roleId)`. This gives you back all the completed sessions for a specific role. Each session has `user_name`, `score`, `total_questions`, and `completed_at`. So from there you can do the math to get percentages and figure out the rankings however you want to display them.

There's also `getAllSessionsUser(userId)` which gives you all the sessions for one specific user, ordered by most recent. Each one includes the role name too. That one's useful if you need like a personal history view for the user.

And then `getAllSessions()` just returns everything if you ever need all the sessions at once.

I already put some test data in the database so you should have stuff to work with right away. I'm making a PR so you can see all the code. Let me know if anything is confusing.
