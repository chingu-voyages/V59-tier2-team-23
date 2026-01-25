import type { JSX } from "react";
import { LoginButtons, WelcomeMessage } from "../components";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Home({ className = "", ...props }: Props): JSX.Element {
  return (
    <div
      className={`${className} h-auto flex flex-col items-center w-4/5 mx-auto text-center min-w-42.5`}
      {...props}
    >
      <img src="\images\temp-logo.png" alt="App Logo" className="h-48" />
      <WelcomeMessage />
      <p className="text-[1.2rem]">
        Quizest is your handy source for interview preparation and practice
        questions. Providing a selection of industry relevant questions along
        with their answers and amplifying informaiton for the most popular roles
        in the tech industry.
        <br />
        {/* Roles in Quizest currently include Scrum Masters, Product Owners, UI/UX Designers, Web Developers, and Python Developers.
        For each role you would like to prepare for, select the role from the list in the Role Selection page then simply answer the questions as they appear.
        For each question, you will be be able to see if your answer was correct and if not, what the correct answer was, along with amplifying information.
        At the end of the quiz, you will be given your overall score. */}
        <br />
        To get started, simply click the button below.
      </p>
      <LoginButtons />
    </div>
  );
}
