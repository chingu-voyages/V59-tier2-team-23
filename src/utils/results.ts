import type { UserAnswer } from "../types/questions"
export type Stats = {
  correct: number
  incorrect: number
  total: number
}
export type UserPercentiles = {
  percentile_score: number
  percentile_studied: number
  total_users: number
}[]

export function aggregate(answers: UserAnswer[]) {
  const stats = {
    correct: 0,
    incorrect: 0,
    total: 0,
  }
  for (let answer of answers) {
    stats.total++
    answer.correct ? stats.correct++ : stats.incorrect++
  }
  return stats
}

export function getGrade(stats: Stats): string {
  return Math.round((stats.correct / stats.total) * 100) + "%"
}
export function getCorrect(stats: Stats): String {
  return stats.correct + "/" + stats.total
}
