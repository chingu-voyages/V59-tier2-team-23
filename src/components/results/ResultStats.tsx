import type { JSX } from 'react';
import { getCorrect, getGrade, type Result } from '../../utils/results';

type Props = {
    className?: string;
    result: Result;
} & React.HTMLAttributes<HTMLDivElement>

export default function ResultStats({ result, className = '', ...props }: Props): JSX.Element {
    return (
        <div className={`flex w-full max-w-[7.5rem] justify-between leading-none ${className}`} {...props}>
            <div>
                <h2 >Grade</h2>
                <p className="text-[1.5rem] ">{getGrade(result)}</p>
            </div>
            <div>
                <h2>Correct</h2>
                <p className="text-[1.5rem] ">{getCorrect(result)}</p>
            </div>
        </div>
    );
}