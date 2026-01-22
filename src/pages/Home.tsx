import type { JSX } from "react";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Home({ className = "", ...props }: Props): JSX.Element {
  return (
    <div className={`${className} h-8/12 flex flex-col items-center w-4/5 mx-auto text-center`} {...props}>
      <img src="\images\temp-logo.png" alt="App Logo" className="h-1/4"/>
      <h1 className="text-[2rem] sm:text-[3rem] md:text-[4rem]">WELCOME TO QUIZEST</h1>
      <p className="text-[1.2rem]">Explanation / description / promotion of the app here. Feel free to come up with ideas for this section.</p>
      {/* <select className="border p-2 rounded mt-[10px]">
        <option value="">Choose Your Role</option>
        <option value="scrummaster">Scrum Master</option>
        <option value="productowner">Product Owner</option>
        <option value="uiuxdesigner">UI/UX Designer</option>
        <option value="webdeveloper">Web Developer</option>
        <option value="pythondeveloper">Python Developer</option>
      </select> */}
      <button className="border p-2 rounded mt-[10px]">Choose Your Role</button>
    </div>
  );
}
