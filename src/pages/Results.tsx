import type { JSX } from 'react';
import { evaluate, type Result, type Scope } from '../utils/results';
import { ResultStats } from '../components';
import ans from '../assets/ans.json';
import qs from '../assets/qs.json';
import ResultsGrid from '../components/results/ResultsGrid';
import { Link } from 'react-router-dom';

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
            <div className='flex items-end justify-between w-full max-w-[15rem] mb-[1rem] gap-[0.5rem]'>
                <ResultStats result={result} />
                <button className='h-[2.2rem] rounded-[0.3rem] aspect-5/2 bg-[var(--color-surface)] text-white'>RETRY</button>
            </div>
            <div className='mb-[0.5rem] sm:mb-[1.5rem] '>If you would like to review any of the questions, you can select them from the list below.</div>
            <ResultsGrid className='mb-[2.5rem]' scope={scope} result={result} />
            <Link to={'/home'} className='mb-[1rem] h-[4rem] rounded-[0.5rem] w-full max-w-[20rem] max-h-[3.5rem] bg-[var(--color-surface)] flex items-center justify-center text-white text-[1.2rem]'>Back To Home</Link>
        </div>
    );
}