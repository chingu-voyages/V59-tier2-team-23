import type { JSX } from 'react';
import ResultBox from './ResultBox';
import { getQA, type Result, type Scope } from '../../utils/results';

type Props = {
    className?: string,
    result: Result,
    scope: Scope
} & React.HTMLAttributes<HTMLOListElement>

export default function ResultsContainer({ className = '', result, scope, ...props }: Props): JSX.Element {
    return (
        <ol className={`${className} flex flex-col items-center gap-[1rem] w-full max-w-[35rem] mb-[1rem]`} {...props}>
            {result?.answers.map((answer) => <li className='w-full' key={answer.Qid}><ResultBox answer={answer} QA={getQA(scope, answer.Qid)} /></li>)}
        </ol>
    );
}