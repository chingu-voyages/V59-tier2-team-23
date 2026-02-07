import type { JSX } from "react";
import { NavLink, useLocation } from "react-router";
import { useDate } from "../hooks";
import { format } from "../utils/date.ts";
import { useAuth } from "../context/AuthContext.tsx";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export default function Header({
  className = "",
  ...props
}: Props): JSX.Element {
  const { user, signOut, isAuthLoading, isGuestLogin } = useAuth();
  const { date } = useDate();
  const { pathname } = useLocation();
  const activeLink = pathname.slice(1);

  let navOptions: string[] = ["home"];
  if (!isAuthLoading && user) {
    navOptions = ["home", "roles", "geminitest", "logout"];
  }
  if (!isAuthLoading && isGuestLogin && pathname !== "/home") {
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
                {
                  <NavLink
                    to={`${nav === "logout" ? "/" : `/${nav}`}`}
                    className={`${nav === activeLink || activeLink === "" ? "bg-[#525151]" : ""}  p-2  flex justify-center items-center hover:bg-[#5e5c5c]`}
                    onClick={() => {
                      if (nav === "logout") {
                        signOut();
                      }
                      return;
                    }}
                  >
                    {nav}
                  </NavLink>
                }
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
