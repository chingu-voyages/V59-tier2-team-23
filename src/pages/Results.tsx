import type { JSX } from 'react';
import { evaluate, type Result, type Scope } from '../utils/results';
import { ResultStats } from '../components';
import ans from '../assets/ans.json';
import qs from '../assets/qs.json';
import ResultsContainer from '../components/results/ResultsContainer';

type Props = {
    className?: string,
    result?: Result,
    scope?: Scope
} & React.HTMLAttributes<HTMLDivElement>


export default function Results({ className = '', scope, result, ...props }: Props): JSX.Element {
    scope = qs[0]; // temporary 
    result = evaluate(ans.userAnswers);// temporary

    return (
        <div className={`py-[1rem] px-[1.5rem] flex flex-col items-center   ${className}`} {...props}>
            <h1 className='text-[1.5rem] text-center  mb-[1rem]'>{scope.role} prep results</h1>
            <div className='flex items-end justify-between w-full max-w-[15rem] mb-[1.5rem] gap-[0.5rem]'>
                <ResultStats result={result} />
                <button className='h-[2.2rem] rounded-[0.3rem] aspect-5/2 bg-[var(--color-surface)] text-white'>RETRY</button>
            </div>
            <ResultsContainer scope={scope} result={result} />
        </div>
    );
}