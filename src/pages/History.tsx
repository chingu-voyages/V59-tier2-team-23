import { useEffect, useState, type JSX } from 'react';
import Attempt from '../components/history/Attempt';

type Props = {
    className?: string
} & React.HTMLAttributes<HTMLDivElement>
import type { QuestionnaireResult } from '../types/questions';
import { getAllSessionsUser } from '../utils/getData';
import { useAuth } from '../context/AuthContext';
export default function History({ className = '', ...props }: Props): JSX.Element {
    const [allAttempts, setAllAttempts] = useState<any[] | null>(null);
    const { user } = useAuth();
    useEffect(() => {
        async function updateHistory() {
            let allSessions;
            if (user) allSessions = await getAllSessionsUser(user.id);
            // if (user) allSessions = await getAllSessionsUser("8fda9f4f-d356-4d66-9774-4c6afd29383f"); // remove this line and uncomment the one above
            if (allSessions) setAllAttempts(allSessions);
        }
        updateHistory();
    }, [user]);

    if (allAttempts)
        return (
            <div className={`p-[1rem]  flex flex-col max-w-[40rem] w-full mx-auto  ${className}`} {...props}>
                <h1 className='text-[3rem] text-black font-bold'>History</h1>
                <div></div>

                <ol className=''>
                    {allAttempts.map((atmpt) => {
                        if (atmpt.completed_at)
                            return <li key={atmpt.id}>
                                <Attempt attempt={atmpt as QuestionnaireResult} />
                            </li>
                    }
                    )}
                </ol>
            </div >
        );
    else return <h1 className='ms-[2rem] text-black text-[3rem]'>PLEASE WAIT A SECOND</h1>

} 