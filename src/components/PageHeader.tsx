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
  const { user, signOut, isAuthLoading, isGuestLogin } = useAuth();
  const { date } = useDate();
  let navOptions: string[] = ["home"];

  if (!isAuthLoading && user) {
    navOptions = ["home", "roles", "logout"];
  }
  if (!isAuthLoading && isGuestLogin) {
    navOptions = ["home", "roles"];
  }

  return (
    <>
      <header
        className={`w-full px-4 py-3 sm:px-6 bg-(--color-surface) text-white text-nowrap leading-none flex flex-col gap-4 justify-between  ${className}`}
        {...props}
      >
        <p className="text-end">{format(date)}</p>
        <nav className="flex justify-between items-end gap-2">
          <NavLink to="/" className="font-bold text-[1.5rem]">
            Quizest
          </NavLink>
          <ul className="flex justify-between gap-4 overflow-x-auto overflow-y-hidden">
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
