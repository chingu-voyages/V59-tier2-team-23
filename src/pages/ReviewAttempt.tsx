import { useEffect, useState, type JSX } from 'react';
import Questionnaire from '../components/Questionnaire';
import { useParams } from 'react-router-dom';

import type { QuestionnaireResult, RoleQuestions, UserAnswer } from '../types/questions';
import { getQuizHistory, getRole, getRoleQuestions, getSession } from '../utils/getData';
import { useAuth } from '../context/AuthContext';
import { structureRole } from '../utils/structureData';

export default function ReviewAttempt(): JSX.Element {
    const [lastResult, setLastResult] = useState<QuestionnaireResult | null>(null)
    const [selectedRole, setSelectedRole] = useState<RoleQuestions>();
    const { user } = useAuth();
    const { id } = useParams();
    useEffect(() => {
        async function updateSelectedRole() {
            if (!id) return;

            const session = await getSession(id);
            if (!session) return;

            const attempt = await getQuizHistory(session[0].id);
            setLastResult(attempt);

            const role = await getRole(session[0].role_id);
            if (!user || !role) return
            const questions = await getRoleQuestions(session[0].role_id, user.id);
            setSelectedRole(structureRole(role[0], questions));
        }
        updateSelectedRole();
    }, [id, user]);

    if (lastResult && selectedRole)
        return (
            <Questionnaire
                stepInit='RESULTS'
                selectedRoleInit={selectedRole as RoleQuestions}
                userAnswersInit={lastResult?.userAnswers as UserAnswer[]}
                lastResultInit={lastResult as QuestionnaireResult}
            />
        );
    else return <h1 className='ms-[2rem] text-[3rem]'>PLEASE WAIT A SECOND</h1>
}