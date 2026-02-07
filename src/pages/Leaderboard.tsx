import { type User } from "@supabase/supabase-js"
import LeaderboardStatCard from "../components/LB_Stat_Card"
import {
  getUserInfo,
  getSessions,
  getAllSessionsUser,
  getAllSessionsForRole,
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

export type sortedUserType = {
  userId: string
  userName: string
  totalSessions: number
  totalQuestions: number
  totalScore: number
}

export default function Leaderboard() {
  const [userData, setUserData] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const [allSessionData, setAllSessionData] = useState<SessionType[] | null>(null)
  const [loadingAllSessions, setLoadingAllSessions] = useState(true)

  const firstName = userData?.user_metadata.name.split(" ")[0]
  const lastName = userData?.user_metadata.name.split(" ")[1]
  const sortedSessions = sortAllSessions(allSessionData) || []
  const topUsers = topUsersByNumberOfQuestions(sortedSessions)
  // console.log(sortedSessions)

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo()
      setUserData(user)
      setLoadingUser(false)
    }

    async function fetchAllSessions() {
      const sessions = await getSessions()
      setAllSessionData(sessions)
      setLoadingAllSessions(false)
    }

    fetchUser()
    fetchAllSessions()
  }, [])

  function sortAllSessions(sessions: SessionType[] | null) {
    if (!sessions || sessions === null || sessions === undefined) return
    let sortedSessions: sortedUserType[] = []
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
        })
      }
    }
    return sortedSessions
  }

  function topUsersByNumberOfQuestions(sortedSessions: sortedUserType[] | null) {
    if (sortedSessions === null || sortedSessions == undefined || !sortedSessions) return
    let topUsers: sortedUserType[] = []

    for (let i = 0; i <= 9; i++) {
      if (sortedSessions[i]) topUsers.push(sortedSessions[i])
    }

    topUsers = topUsers.sort((a, b) => b.totalQuestions - a.totalQuestions)
    return topUsers
  }

  /*PLANNING SESSION - 
So I'm going to access the real data, figure out exactly what I'm using, 

then I'm going to have create an object per card. I will import the userData to this Leaderboard file, I will digest it into something like an array of ojects
In the LeaderBoardComponents, I will have a big card for each "Top 10 topic" and then each of the users in that Top 10 will be their own card (created and ued exclusively in LB_Components)

For topics, I'll begin with overall number of q.s answered and overall correctness, before diving into those metrics per ind. role studied for
*/

  if (loadingUser || loadingAllSessions) {
    return <div> Loading... </div>
  }
  return (
    <div className='flex flex-col items-center bg-linear-to-br from-indigo-400 to-purple-500 pb-25 '>
      <div className='text-center p-6 text-5xl '>
        <h1>Welcome to the Leaderboard, {firstName}!</h1>
      </div>

      <div>
        <div className='text-center p-4 text-2xl '>
          <h1>Users That Have Answered The Most Questions</h1>
        </div>

        <div>
          <LeaderboardStatCard topTenArray={topUsers || []} />
        </div>
      </div>
    </div>
  )
}
