import { type User } from "@supabase/supabase-js"
import LeaderboardStatCard from "../components/LB_Stat_Card"
import {
  getUserInfo,
  // getLeaderboardData,
  getLeaderBoardGlobal,
  // getAllSessionsUser,
  // getAllSessionsForRole,
} from "../utils/getData"
import { useState, useEffect } from "react"

export type SessionType = {
  completed_at: string
  id: string
  role_id: string
  score: number
  started_at: string
  total_questions: number
  user_id: string
  user_name: string
}

export type SortedUserType = {
  user_id: string
  user_name: string
  total_sessions: number
  total_questions: number
  total_score: number
  average_grade: number
  role?: string
  metric_type?: "total_questions" | "average_grade"
}

type LeaderboardType =
  | {
      average_grade: number
      total_questions: number
      total_score: number
      total_sessions: number
      user_id: string
      user_name: string
    }[]
  | null

export type MetricType = "total_questions" | "average_grade"

export default function Leaderboard() {
  const [userData, setUserData] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardType>(null)
  const [loadingLeaderboardData, setLoadingLeaderboardData] = useState(true)

  const firstName = userData?.user_metadata.name.split(" ")[0]

  const topUsersByAmtStudied = calcUsersByAmtStudied(leaderboardData)
  const topUsersByGrade = calcUsersByGrade(leaderboardData)

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo()
      setUserData(user)
      setLoadingUser(false)
    }

    async function fetchLeaderboardData() {
      const leaderboard = await getLeaderBoardGlobal()
      setLeaderboardData(leaderboard)
      setLoadingLeaderboardData(false)
      console.log("leaderboard", leaderboard)
    }
    fetchUser()
    fetchLeaderboardData()
  }, [])

  function calcUsersByAmtStudied(leaderboard: LeaderboardType) {
    if (leaderboard === null || leaderboard == undefined || !leaderboard) return
    let sortUsersByAmtStudied: LeaderboardType = []
    let topUsersByAmtStudied: LeaderboardType = []

    for (let i = 0; i <= leaderboard.length - 1; i++) {
      if (leaderboard[i]) sortUsersByAmtStudied.push(leaderboard[i])
    }

    sortUsersByAmtStudied = sortUsersByAmtStudied.sort(
      (a, b) => b.total_questions - a.total_questions,
    )
    topUsersByAmtStudied = sortUsersByAmtStudied.slice(0, 10)
    return topUsersByAmtStudied
  }

  function calcUsersByGrade(leaderboard: LeaderboardType) {
    if (leaderboard === null || leaderboard == undefined || !leaderboard) return
    let sortUsersByGrade: LeaderboardType = []
    let topUsersByGrade: LeaderboardType = []

    for (let i = 0; i <= leaderboard.length - 1; i++) {
      if (leaderboard[i]) sortUsersByGrade.push(leaderboard[i])
    }

    sortUsersByGrade = sortUsersByGrade.sort((a, b) => b.average_grade - a.average_grade)
    topUsersByGrade = sortUsersByGrade.slice(0, 10)
    return topUsersByGrade
  }

  if (loadingUser || loadingLeaderboardData) {
    return <div> Loading... </div>
  }
  return (
    <div className='flex flex-col items-center bg-linear-to-br from-indigo-400 to-purple-500 pb-25 '>
      <div className='text-center p-10 text-5xl '>
        <h1>Welcome to the Leaderboard, {firstName}!</h1>
      </div>

      <div>
        <h1 className='text-center p-2 text-2xl '>Top 10 Strongest Studiers</h1>
        <LeaderboardStatCard
          topTenArray={topUsersByAmtStudied || []}
          metricType='total_questions'
        />
      </div>

      <div>
        <h1 className='text-center p-2 text-2xl '>Top 10 Best Grades</h1>
        <LeaderboardStatCard topTenArray={topUsersByGrade || []} metricType='average_grade' />
      </div>
    </div>
  )
}
