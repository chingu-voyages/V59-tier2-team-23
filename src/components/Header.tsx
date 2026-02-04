import type { JSX } from "react";
import { NavLink, useLocation } from "react-router";
import { useDate } from "../hooks";
import { formatDate } from "../utils/date.ts";
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
    navOptions = ["home", "roles", "history", "logout", "supabaseexamples"];
  }
  if (!isAuthLoading && isGuestLogin && pathname !== "/home") {
    navOptions = ["home", "roles"];
  }

  return (
    <>
      <header
        className={`w-full px-[1rem] py-[0.75rem] sm:px-[1.5rem] bg-[var(--color-surface)] text-white text-nowrap leading-none flex flex-col gap-[1rem] justify-between  ${className}`}
        {...props}
      >
        <p className="text-end">{formatDate(date)}</p>
        <nav className="flex justify-between items-end gap-[0.5rem]">
          <NavLink to="/" className="font-bold text-[1.5rem]">
            Quizest
          </NavLink>
          <ul className="flex justify-between gap-[1rem] overflow-x-auto overflow-y-hidden">
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
