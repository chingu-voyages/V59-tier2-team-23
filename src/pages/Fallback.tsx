import type { JSX } from "react";

type Props = {
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>

export default function Fallback({ className = "", ...props }: Props): JSX.Element {
    return (
        <div className={`${className}`} {...props}>
            <h1 className="text-[4rem]">ERROR 404, This page doesn't exist</h1>
        </div>
    );
}