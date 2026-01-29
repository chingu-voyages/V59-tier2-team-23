import type { JSX } from 'react';
import type { Result, Scope } from '../../utils/results';
import { Link } from 'react-router-dom';

type Props = {
    className?: string
    result: Result,
    scope: Scope
} & React.HTMLAttributes<HTMLOListElement>


export default function ResultsGrid({ className = '', result, scope, ...props }: Props): JSX.Element {
    return (
        <ol className={`${className} grid grid-cols-[repeat(auto-fit,minmax(3rem,1fr))] justify-items-center sm:max-w-[90%] w-full  gap-[6vw] sm:gap-[3vw] `} {...props}>
            {result.answers.map((ans) => <li className={`w-full max-w-[8rem] text-center text-[150%] aspect-square rounded-[35%]  border-[0.1rem]  ${ans.correct ? 'bg-[#92F187]' : 'bg-[#F79696]'}`}><Link className='w-full h-full flex flex-col p-[0.2rem]' to={'/home'}> <span className='w-[50%] h-[50%] flex items-center justify-center'>{ans.Qid}</span> <span className={`w-[50%] h-[50%] ${ans.correct ? 'bg-[url(/src/assets/icons/checkmark.svg)]' : 'bg-[url(/src/assets/icons/xmark.svg)]'} bg-no-repeat bg-center ms-auto`}></span></Link></li>)}
        </ol>
    );
}