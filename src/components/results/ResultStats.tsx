import type { JSX } from 'react';
import { getCorrect, getGrade, type Stats } from '../../utils/results';

type Props = {
    className?: string;
    stats: Stats;
} & React.HTMLAttributes<HTMLDivElement>

export default function ResultStats({ stats, className = '', ...props }: Props): JSX.Element {
    return (
        <div className={`flex w-full max-w-32 justify-between leading-none ${className}`} {...props}>
            <div>
                <h2 >Grade</h2>
                <p className="text-[1.5rem] ">{getGrade(stats)}</p>
            </div>
            <div>
                <h2>Correct</h2>
                <p className="text-[1.5rem] ">{getCorrect(stats)}</p>
            </div>
        </div>
    );
}