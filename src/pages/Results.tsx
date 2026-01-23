import type { JSX } from 'react';
import { evaluate, type Result, type Scope } from '../utils/results';
import { ResultStats } from '../components';
import ans from '../assets/ans.json';
import qs from '../assets/qs.json';

type Props = {
    className?: string,
    result?: Result,
    scope?: Scope
} & React.HTMLAttributes<HTMLDivElement>


export default function Results({ className = '', scope, result, ...props }: Props): JSX.Element {
    scope = qs[0]; // temporary 
    result = evaluate(ans);// temporary

    return (
        <div className={`p-[0.5rem] ${className}`} {...props}>
            <h1 className='text-center font-bold mb-[1rem]'>{scope.role} prep results</h1>
            <div className='flex items-end justify-center gap-[2rem]'>
                <ResultStats result={result} />
                <button className='h-[2.2rem] rounded-[0.3rem] aspect-5/2 bg-[var(--color-surface)] text-white'>RETRY</button>
            </div>
        </div>
    );
}