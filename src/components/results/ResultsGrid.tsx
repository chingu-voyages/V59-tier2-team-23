import type { JSX } from 'react';
import type { QuestionnaireResult, UserAnswer } from '../../types/questions';
import ResultBox from './ResultBox';

type Props = {
    className?: string
    result: QuestionnaireResult,
    onReview: (answer: UserAnswer, index: number) => void;
} & React.HTMLAttributes<HTMLOListElement>


export default function ResultsGrid({ className = '', onReview, result, ...props }: Props): JSX.Element {
    return (
        <ol className={`${className} grid grid-cols-[repeat(auto-fit,minmax(3rem,1fr))] justify-items-center sm:max-w-[90%] w-full  gap-[6vw] sm:gap-[3vw] `} {...props}>
            {result.userAnswers.map((ans, i) => <ResultBox onReview={onReview} key={ans.Qid} index={i} answer={ans} />)}
        </ol>
    );
}