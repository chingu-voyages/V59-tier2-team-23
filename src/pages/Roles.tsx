import type { JSX } from "react";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Roles({
  className = "",
  ...props
}: Props): JSX.Element {
  return (
    <div className={`${className} h-9/12`} {...props}>
      <h1 className="text-[4rem]">IAM ROLES</h1>
    </div>
  );
}
