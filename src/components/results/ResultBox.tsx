import { type JSX } from 'react';
import type { FreeResponseAnswer, UserAnswer } from '../../types/questions';

type Props = {
    answer: UserAnswer | FreeResponseAnswer,
    index: number
    onReview: (answer: UserAnswer | FreeResponseAnswer, index: number) => void
} & React.HTMLAttributes<HTMLLIElement>

export default function ResultBox({ index, answer, onReview, ...props }: Props): JSX.Element {
    if (typeof answer.correct == 'boolean')
        return (
            <li className={`w-full max-w-24 text-center text-[150%] sm:text-[200%] aspect-square rounded-[35%]  border-[0.1rem]  ${answer.correct ? 'bg-[#92F187]' : 'bg-[#F79696]'}`} {...props}>
                <button onClick={() => onReview(answer, index)} className='w-full h-full flex flex-col p-[0.2rem]' >
                    <span className='w-[50%] h-[50%] flex items-center justify-center'>{index + 1}</span>
                    <span className={`w-[50%] h-[50%] ${answer.correct ? 'bg-[url(/src/assets/icons/checkmark.svg)]' : 'bg-[url(/src/assets/icons/xmark.svg)]'} bg-no-repeat bg-center ms-auto`} />
                </button>
            </li>);
    else if (typeof answer.correct == 'number') return (<li className={`w-full max-w-24 text-center text-[150%] sm:text-[200%] aspect-square rounded-[35%]  border-[0.1rem] ${answer.correct <= 50 && 'bg-[#F79696]'}  ${answer.correct > 50 && answer.correct < 70 && 'bg-yellow-200'} ${answer.correct >= 70 && 'bg-[#92F187]'}  '`} {...props}>
        <button onClick={() => onReview(answer, index)} className='w-full h-full flex flex-col p-[0.2rem]' >
            <span className='w-[50%] h-[50%] flex items-center justify-center'>{index + 1}</span>
            <span className={`w-full h-[50%] text-[50%] flex items-end justify-center  bg-no-repeat bg-center ms-auto`}>{answer.correct / 10}/10</span>
        </button>
    </li>);
    else return <></>
}