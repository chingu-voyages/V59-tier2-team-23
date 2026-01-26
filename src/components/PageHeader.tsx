import type { JSX } from "react"
import { NavLink } from "react-router"
import { useDate } from "../hooks"
import { format } from "../utils/date.ts"

type Props = {
    className?: string
} & React.HTMLAttributes<HTMLElement>

export default function PageHeader({ className = "", ...props }: Props): JSX.Element {
    const { date } = useDate();
    const navOptions: string[] = ["home", "roles"];// for each element in navOptions a NavLink is created. (to add more navigations just add them to navOptions)  
    return (<>
        <header className={`w-full px-[1rem] py-[0.75rem] sm:px-[1.5rem] bg-[var(--color-surface)] text-white text-nowrap leading-none flex flex-col gap-[1rem] justify-between  ${className}`} {...props}>
            <p className="text-end">{format(date)}</p>
            <nav className="flex justify-between items-end gap-[0.5rem]">
                <NavLink to="/" className="font-bold text-[1.5rem]">Quizest</NavLink>
                <ul className="flex justify-between gap-[1rem] overflow-x-auto overflow-y-hidden">
                    {navOptions.map((nav) => <li key={nav} className="capitalize"><NavLink to={`/${nav}`}>{nav}</NavLink></li>)}
                </ul>
            </nav>
        </header>
    </>);

}
