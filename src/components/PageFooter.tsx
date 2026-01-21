import type { JSX } from "react";

type Props = {
    className?: string;
} & React.HTMLAttributes<HTMLElement>

export default function PageFooter({ className = "", ...props }: Props): JSX.Element {
    return (
        <footer className={`${className}`} {...props}>

        </footer>
    );
}