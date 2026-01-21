import type { JSX } from "react";

type Props = {
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>

export default function Home({ className = "", ...props }: Props): JSX.Element {
    return (
        <div className={`${className}`} {...props}>
            <h1 className="text-[4rem] ">IAM HOME</h1>
        </div>
    );
}