import type { JSX } from "react";
import { Outlet } from "react-router";
import { PageHeader, PageFooter } from "../components";

type Props = {
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>

/* This page acts as a template, providing Header/Footer for all the other pages.  */
export default function Page({ className = "", ...props }: Props): JSX.Element {
    return (
        <div className={`page ${className}`} {...props}>
            <PageHeader />
            <Outlet></Outlet> {/* <- pages will be rendered here. For example: if you are at /roles then <Roles/> will be placed in <Outlet/>'s position */}
            <PageFooter />
        </div>
    );
}