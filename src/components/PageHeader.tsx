import type { JSX } from "react";
import { NavLink } from "react-router";
import { useDate } from "../hooks";
import { format } from "../utils/date.ts";
import { useAuth } from "../context/AuthContext.tsx";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export default function PageHeader({
  className = "",
  ...props
}: Props): JSX.Element {
  const { user, signOut, isAuthLoading, isGuessLogin } = useAuth();
  const { date } = useDate();
  let navOptions: string[] = ["home"];

  if (!isAuthLoading && user) {
    navOptions = ["home", "roles", "logout"];
  }
  if (!isAuthLoading && isGuessLogin) {
    navOptions = ["home", "roles"];
  }

  return (
    <>
      <header
        className={`w-full px-[1rem] py-[0.75rem] sm:px-[1.5rem] bg-[var(--color-surface)] text-white text-nowrap leading-none flex flex-col gap-[1rem] justify-between  ${className}`}
        {...props}
      >
        <p className="text-end">{format(date)}</p>
        <nav className="flex justify-between items-end gap-[0.5rem]">
          <NavLink to="/" className="font-bold text-[1.5rem]">
            Quizest
          </NavLink>
          <ul className="flex justify-between gap-[1rem] overflow-x-auto overflow-y-hidden">
            {navOptions.map((nav) => (
              <li key={nav} className="capitalize">
                {nav === "logout" ? (
                  <NavLink to={"/"} onClick={signOut}>
                    {nav}
                  </NavLink>
                ) : (
                  <NavLink to={`/${nav}`}>{nav}</NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
