import { type JSX } from 'react';
import type { UserAnswer } from '../../types/questions';

type Props = {
    answer: UserAnswer,
    index: number
    onReview: (answer: UserAnswer, index: number) => void
} & React.HTMLAttributes<HTMLLIElement>

export default function ResultBox({ index, answer, onReview, ...props }: Props): JSX.Element {
    return (
        <li className={`w-full max-w-[6rem] text-center text-[150%] sm:text-[200%] aspect-square rounded-[35%]  border-[0.1rem]  ${answer.correct ? 'bg-[#92F187]' : 'bg-[#F79696]'}`} {...props}>
            <button onClick={() => onReview(answer, index)} className='w-full h-full flex flex-col p-[0.2rem]' >
                <span className='w-[50%] h-[50%] flex items-center justify-center'>{index + 1}</span>
                <span className={`w-[50%] h-[50%] ${answer.correct ? 'bg-[url(/src/assets/icons/checkmark.svg)]' : 'bg-[url(/src/assets/icons/xmark.svg)]'} bg-no-repeat bg-center ms-auto`} />
            </button>
        </li>);
}