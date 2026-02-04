import type { JSX } from 'react';
import Attempt from '../components/history/Attempt';

type Props = {
    className?: string
} & React.HTMLAttributes<HTMLDivElement>
import template from '../components/history/template.json'
import type { QuestionnaireResult } from '../types/questions';
export default function History({ className = '', ...props }: Props): JSX.Element {
    const allAttempts = template;
    return (
        <div className={`p-[1rem]  flex flex-col max-w-[40rem] w-full mx-auto  ${className}`} {...props}>
            <h1 className='text-[3rem] text-black font-bold'>History</h1>
            <div></div>
            <ol className=''>
                {allAttempts.map((atmpt) => {
                    return <li key={atmpt.id}>
                        <Attempt attempt={atmpt as QuestionnaireResult} />
                    </li>
                }
                )}
            </ol>
        </div >
    );
}