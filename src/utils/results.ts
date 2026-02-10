import type { FreeResponseAnswer, UserAnswer } from "../types/questions";

export type Stats = {
    correct: number,
    incorrect: number,
    total: number,
    grade: number
}

export function aggregate(answers: (UserAnswer | FreeResponseAnswer)[]) {
    const stats = {
        correct: 0,
        incorrect: 0,
        total: 0,
        grade: 0,
    }
    let totalScore = 0;
    for (let answer of answers) {
        stats.total++;
        if (typeof answer.correct == 'boolean') {
            answer.correct ? stats.correct++ : stats.incorrect++;
            answer.correct ? totalScore += 100 : totalScore += 0;
        }
        else if (typeof answer.correct == 'number') {
            answer.correct > 50 ? stats.correct++ : stats.incorrect++;
            totalScore += answer.correct;
        }
    }

    stats.grade = totalScore / stats.total;
    return stats;
}

export function getGrade(stats: Stats): string {
    return Math.round(stats.correct / stats.total * 100) + "%";
}
export function getCorrect(stats: Stats): String {
    return stats.correct + "/" + stats.total;
}
