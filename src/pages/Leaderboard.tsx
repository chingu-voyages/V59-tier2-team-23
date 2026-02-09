import { type User } from "@supabase/supabase-js"
import LeaderboardStatCard from "../components/LB_Stat_Card"
import {
  getUserInfo,
  getSessions,
  // getAllSessionsUser,
  // getAllSessionsForRole,
} from "../utils/getData"
// import { useUserData } from "../utils/fetchStats"
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
  userId: string
  userName: string
  totalSessions: number
  totalQuestions: number
  totalScore: number
  averageGrade: number
  role?: string
  metricType?: "totalQuestions" | "averageGrade"
}

export type MetricType = "totalQuestions" | "averageGrade"

export default function Leaderboard() {
  const [userData, setUserData] = useState<User | null>(null)
  // const [loadingUser, setLoadingUser] = useState(true)

  const [allSessionData, setAllSessionData] = useState<SessionType[] | null>(null)
  // const [loadingAllSessions, setLoadingAllSessions] = useState(true)

  const firstName = userData?.user_metadata.name.split(" ")[0]
  // const lastName = userData?.user_metadata.name.split(" ")[1]
  const sortedSessions = sortAllSessions(allSessionData) || []
  const topUsersByAmtStudied = calcUsersByAmtStudied(sortedSessions)
  const topUsersByGrade = calcUsersByGrade(sortedSessions)

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo()
      setUserData(user)
      // setLoadingUser(false)
    }

    async function fetchAllSessions() {
      const sessions = await getSessions()
      setAllSessionData(sessions)
      // setLoadingAllSessions(false)
    }

    fetchUser()
    fetchAllSessions()
  }, [])

  function sortAllSessions(sessions: SessionType[] | null) {
    if (!sessions || sessions === null || sessions === undefined) return
    let sortedSessions: SortedUserType[] = []
    for (let i = 0; i <= sessions.length - 1; i++) {
      let selectedSession =
        sortedSessions.find((session) => session.userId == sessions[i].user_id) || undefined

      if (selectedSession) {
        selectedSession.totalSessions += 1
        selectedSession.totalQuestions += sessions[i].total_questions
        selectedSession.totalScore += sessions[i].score
      } else {
        sortedSessions.push({
          userId: sessions[i].user_id,
          userName: sessions[i].user_name,
          totalSessions: 1,
          totalQuestions: sessions[i].total_questions,
          totalScore: sessions[i].score,
          averageGrade: (sessions[i].score / sessions[i].total_questions) * 100,
        })
      }
    }
    return sortedSessions
  }

  function calcUsersByAmtStudied(sortedSessions: SortedUserType[] | null) {
    if (sortedSessions === null || sortedSessions == undefined || !sortedSessions) return
    let topUsersByAmtStudied: SortedUserType[] = []

    for (let i = 0; i <= 9; i++) {
      if (sortedSessions[i]) topUsersByAmtStudied.push(sortedSessions[i])
    }

    topUsersByAmtStudied = topUsersByAmtStudied.sort((a, b) => b.totalQuestions - a.totalQuestions)
    return topUsersByAmtStudied
  }

  function calcUsersByGrade(sortedSessions: SortedUserType[] | null) {
    if (sortedSessions === null || sortedSessions == undefined || !sortedSessions) return
    let topUsersByGrade: SortedUserType[] = []

    for (let i = 0; i <= 9; i++) {
      if (sortedSessions[i]) topUsersByGrade.push(sortedSessions[i])
    }

    topUsersByGrade = topUsersByGrade.sort((a, b) => b.averageGrade - a.averageGrade)
    return topUsersByGrade
  }

  // if (loadingUser || loadingAllSessions) {
  //   return <div> Loading... </div>
  // }
  return (
    <div className='flex flex-col items-center bg-linear-to-br from-indigo-400 to-purple-500 pb-25 '>
      <div className='text-center p-6 text-5xl '>
        <h1>Welcome to the Leaderboard, {firstName}!</h1>
      </div>

      <div>
        <h1 className='text-center p-4 text-2xl '>Top Ten Strongest Studiers</h1>
        <LeaderboardStatCard topTenArray={topUsersByAmtStudied || []} metricType='totalQuestions' />
      </div>

      <div>
        <h1 className='text-center p-4 text-2xl '>Top Ten Best Grades</h1>
        <LeaderboardStatCard topTenArray={topUsersByGrade || []} metricType='averageGrade' />
      </div>
    </div>
  )
}
