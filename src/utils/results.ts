
export type Answer = {
    Qid: number,
    selectedOption: string
    correct: boolean
}

type Flashcard = {
    id: number,
    question: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string
    },
    answer: string,
    rationale: string
}

export type Scope = {
    role: string,
    focus: string,
    flashcards: Flashcard[]
}

export type Result = {
    stats: {
        correct: number, incorrect: number, total: number
    },
    answers: Answer[]
}

export function evaluate(answers: Answer[]): Result {
    const flashcards = getAllFlashcards();

    for (let answer of answers) {
        for (let flashcard of flashcards) {
            if (flashcard.id !== answer.Qid) continue;
            answer.correct = flashcard.answer === answer.selectedOption;
            break; // already found the flashcard no need to keep looking (go evalutate next question)
        }
    }

    return {
        stats: aggregate(answers),
        answers: answers
    };
}

function aggregate(answers: Answer[]) {
    const stats = {
        correct: 0,
        incorrect: 0,
        total: 0
    }
    for (let answer of answers) {
        stats.total++;
        answer.correct ? stats.correct++ : stats.incorrect++;
    }
    return stats;
}


import qs from '../assets/qs.json'; // temporary
export function getAllFlashcards() {
    let flashcards: Flashcard[] = [];
    for (let item of qs) {
        flashcards = [...flashcards, ...item.flashcards]
    }
    return flashcards;
}

export function getGrade(result: Result): string {
    const stats = result.stats;
    return Math.round(stats.correct / stats.total * 100) + "%";
}
export function getCorrect(result: Result): String {
    const stats = result.stats;
    return stats.correct + "/" + stats.total;
}

type Option = "A" | "B" | "C" | "D";
export function getQA(scope: Scope, Qid: number) {
    const [flashcard] = scope.flashcards.filter((f) => f.id == Qid);
    return {
        question: flashcard.question,
        answer: flashcard.answer + ". " + flashcard.options[flashcard.answer as Option]
    };
}