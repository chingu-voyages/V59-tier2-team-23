import type { JSX } from 'react';

type Props = {
    className?: string,
    attempt: any
} & React.HTMLAttributes<HTMLDivElement>

import { formatDateTime } from '../../utils/date';
import { NavLink } from 'react-router-dom';
export default function Attempt({ className = '', attempt, ...props }: Props): JSX.Element {
    let statsColor = '';
    const ratio = attempt.score;
    if (ratio >= 70) statsColor = 'bg-green-600 text-white'
    else if (ratio >= 50) statsColor = 'bg-yellow-600 text-white'
    else statsColor = 'bg-red-600 text-white'

    return (
        <div className='border p-[1rem] rounded-[0.5rem] my-[1rem]'>
            <div className='flex justify-between'>
                <h2 className='inline font-bold mb-[1rem] text-[1.2rem]'>{attempt.roles.name}</h2>
                <span>{formatDateTime(new Date(attempt.completed_at))}</span>
            </div>
            <div className={`flex justify-between w-full leading-none text-[1rem]  ${className}`} {...props}>
                <div className='w-[6rem] flex items-center font-bold'>
                    <span className={`${statsColor} border rounded-full p-[0.5rem] me-[0.5rem]`}>{attempt.score}%</span>
                    <span className={`${statsColor} border rounded-full p-[0.5rem]`}>{attempt.score / 100 * attempt.total_questions + '/' + attempt.total_questions}</span>
                </div>
                <NavLink to={`/history/${attempt.id}`} className='h-full p-[0.5rem] text-center w-[5rem] text-[1rem] rounded-lg bg-blue-600 py-3 text-white font-semibold
            hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition'>Review</NavLink>
            </div>
        </div>);
}