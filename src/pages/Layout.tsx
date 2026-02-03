import type { JSX } from "react";
import { Outlet } from "react-router";
import { Header, Footer } from "../components";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Layout({
  className = "",
  ...props
}: Props): JSX.Element {
  return (
    <div className={`page h-full w-full flex flex-col ${className}`} {...props}>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
