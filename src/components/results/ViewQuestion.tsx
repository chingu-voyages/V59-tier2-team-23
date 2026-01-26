import type { JSX } from 'react';
import Expandable from '../Expandable';

type Props = {
    className?: string,
    question: string
} & React.HTMLAttributes<HTMLDivElement>

export default function ViewQuestion({ className = '', question, ...props }: Props): JSX.Element {
    return (
        <Expandable layout='seperate' label={'View The Question'} className={`bg-white ${className}`} {...props}>
            <div className='mt-[0.25rem] p-[1.25rem] '>{question}</div>
        </Expandable>
    );
}