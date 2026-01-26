import type { JSX } from 'react';
import Expandable from '../Expandable';

type Props = {
    className?: string,
    answer: string
} & React.HTMLAttributes<HTMLDivElement>

export default function ViewAnswer({ className = "", answer, ...props }: Props): JSX.Element {
    return (
        <Expandable layout='seperate' label={'View The Answer'} className={`bg-white ${className}`} {...props}>
            <div className='mt-[0.25rem] p-[1.25rem]'>{answer}</div>
        </Expandable>
    );
}