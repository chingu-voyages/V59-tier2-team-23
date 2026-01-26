import { type JSX } from 'react';
import type { Answer } from '../../utils/results';
import Expandable from '../Expandable';
import ViewQuestion from './ViewQuestion';
import ViewAnswer from './ViewAnswer';

type Props = {
    className?: string,
    answer: Answer,
    QA: {
        question: string,
        answer: string
    }
} & React.HTMLAttributes<HTMLDivElement>

export default function ResultBox({ className = '', QA, answer, ...props }: Props): JSX.Element {
    const { question, answer: correctAnswer } = QA;
    const label: string = `Question ${answer.Qid} - ${answer.correct ? "correct" : "Incorrect"}`;
    return (
        <Expandable layout="combined" label={label} className={`bg-result ${className}`} {...props}>
            <div className='flex flex-col gap-[0.25rem]'>
                <ViewQuestion question={question} />
                <ViewAnswer answer={correctAnswer} />
            </div>
        </Expandable>
    );
}