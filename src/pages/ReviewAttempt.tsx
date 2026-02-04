import type { JSX } from 'react';
import Questionnaire from '../components/Questionnaire';
import { useParams } from 'react-router-dom';

import attempts from "../components/history/template.json";
import flashcards from "../data/questions.json" //temp
import type { QuestionnaireResult, RoleQuestions, UserAnswer } from '../types/questions';//temp

export default function ReviewAttempt(): JSX.Element {
    const { id } = useParams();
    const [lastResult] = attempts.filter((atmpt) => atmpt.id == id);
    const [selectedRole] = flashcards.filter((role) => role.id == lastResult.roleId);

    return (
        <Questionnaire
            stepInit='RESULTS'
            selectedRoleInit={selectedRole as RoleQuestions}
            userAnswersInit={lastResult.userAnswers as UserAnswer[]}
            lastResultInit={lastResult as QuestionnaireResult}
        />
    );
}