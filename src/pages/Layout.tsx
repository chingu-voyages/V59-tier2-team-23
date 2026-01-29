import type { JSX } from "react"
import { Outlet } from "react-router"
import { PageHeader, Footer } from "../components"

type Props = {
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

/* This page acts as a template, providing Header/Footer for all the other pages.  */
// Can we rename this to Layout?
export default function Layout({ className = "", ...props }: Props): JSX.Element {
  return (
    <div className={`page h-full w-full flex flex-col ${className}`} {...props}>
      <PageHeader />
      <Outlet></Outlet>{" "}
      {/* <- pages will be rendered here. For example: if you are at /roles then <Roles/> will be placed in <Outlet/>'s position */}
      <Footer />
    </div>
  )
}
