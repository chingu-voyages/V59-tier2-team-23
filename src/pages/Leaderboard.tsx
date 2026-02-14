import { type User } from "@supabase/supabase-js"
import LeaderboardStatCard from "../components/LB_Stat_Card"
import {
  getUserInfo,
  // getLeaderboardData,
  getLeaderBoardGlobal,
  getLeaderByBoardByRole,
  userPercentile,
  getRoles,
  // getAllSessionsUser,
  // getAllSessionsForRole,
} from "../utils/getData"
import { useState, useEffect } from "react"
import { stringify } from "uuid"
// import Roles from "./Roles"

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
  role_name?: string
  metric_type?: "total_questions" | "average_grade"
}

type LeaderboardType = {
  average_grade: number
  role_name: string
  total_questions: number
  total_score: number
  total_sessions: number
  user_id: string
  user_name: string
}

type PairedLeaderboardType = {
  role_name: string
  amount_leaderboard: LeaderboardType[]
  grades_leaderboard: LeaderboardType[]
}

export type MetricType = "total_questions" | "average_grade"

export default function Leaderboard() {
  const [userData, setUserData] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardType[]>([])
  const [loadingLeaderboardData, setLoadingLeaderboardData] = useState(true)

  const [userPercentileData, setUserPercentileData] = useState()
  const [roleLeaderboards, setRoleLeaderboards] = useState<any[]>([])
  const [sortedLeaderboards, setSortedLeaderboards] = useState<LeaderboardType[][]>([])

  const [roleData, setRoleData] = useState<any[] | null>(null)

  const firstName = userData?.user_metadata.name.split(" ")[0]

  const topUsersByAmtStudied = calcUsersByAmtStudied(leaderboardData)
  const topUsersByGrade = calcUsersByGrade(leaderboardData)
  const pairedLeaderboards = specificLeaderboardPairs(sortedLeaderboards)
  // console.log("allLeaderboards by grade per role: ", allGradeRoleLeaderboards)
  console.log("SORTED LEADERBOARDS: ", sortedLeaderboards)

  function specificLeaderboardPairs(list: LeaderboardType[][]) {
    if (!list || list === null || list === undefined) return

    let pairedLeaderboards: PairedLeaderboardType[] = []
    for (let i = 0; i <= list.length - 1; i++) {
      let current: PairedLeaderboardType = {
        role_name: list[i][0].role_name,
        amount_leaderboard: calcUsersByAmtStudied(list[i]),
        grades_leaderboard: calcUsersByGrade(list[i]),
      }
      pairedLeaderboards.push(current)
    }
    return pairedLeaderboards
  }

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo()
      setUserData(user)
      setLoadingUser(false)
      // console.log("userData", userData)
    }

    async function fetchRoles() {
      const roles = await getRoles()
      setRoleData(roles)
      console.log("roles", roles)
    }

    async function fetchLeaderboardData() {
      const leaderboard = await getLeaderBoardGlobal()
      setLeaderboardData(leaderboard)
      setLoadingLeaderboardData(false)
      // console.log("leaderboard", leaderboard)
    }

    // roleId: string, score: number, totalQuestions: number
    async function getUserPercentileByRole(roleId: string, score: number, totalQuestions: number) {
      const userPercentileStat = await userPercentile(roleId, score, totalQuestions)
      setUserPercentileData(userPercentileStat)
      // console.log("userPercentileStat", userPercentileStat)
    }

    fetchUser()
    fetchRoles()
    fetchLeaderboardData()
    getUserPercentileByRole("12258174-d9a6-458c-8b61-2c2f469dfd1c", 10, 50)
  }, [])

  useEffect(() => {
    if (!roleData || roleData === null) return
    if (!leaderboardData || leaderboardData === null) return
    ///one state for ALL ROLE-SPECIFIC LEADERBOARDS, added to automatically here
    async function fetchLeaderboardDataByRole(roleId: string) {
      const leaderboardByRole = await getLeaderByBoardByRole(roleId)
      setRoleLeaderboards((prevItems) => [...prevItems, leaderboardByRole])
      // console.log("roleLeaderboards: ", leaderboardByRole)
    }
    for (let i = 0; i <= roleData.length - 1; i++) {
      fetchLeaderboardDataByRole(roleData[i].id)
    }
  }, [leaderboardData])

  /// SORT OUT ANY LEADERBOARDS THE USER IS NOT A PART OF (aka roles user has never studied for)
  useEffect(() => {
    if (!userData || userData === null || !roleLeaderboards || roleLeaderboards === null) return
    let activeUserId = userData.id
    // console.log("ALL Role Leaderboards in one: ", roleLeaderboards) /// returns 10 boards instead of 5

    let activeLeaderboards = []

    for (let i = 0; i <= roleLeaderboards.length - 1; i++) {
      let thisLeaderboard = roleLeaderboards[i]
      if (thisLeaderboard.some((user: SortedUserType) => user.user_id === activeUserId)) {
        activeLeaderboards.push(thisLeaderboard)
        setSortedLeaderboards(activeLeaderboards)
      }
    }
  }, [leaderboardData, userData, roleLeaderboards])

  // If so, display a "top ten" for every role user has studied for, both amt and grade,
  // // and also display a userPercentile for that role
  // Also, if we had mor users, it would be really cool to add a Xth place for the user under each Top 10, but I probably won't do it in this voyage time

  function calcUsersByAmtStudied(leaderboard: LeaderboardType[]): LeaderboardType[] {
    if (leaderboard === null || leaderboard == undefined || !leaderboard) return []
    let sortUsersByAmtStudied: LeaderboardType[] = []
    let topUsersByAmtStudied: LeaderboardType[] = []

    for (let i = 0; i <= leaderboard.length - 1; i++) {
      if (leaderboard[i]) sortUsersByAmtStudied.push(leaderboard[i])
    }

    sortUsersByAmtStudied = sortUsersByAmtStudied.sort(
      (a, b) => b.total_questions - a.total_questions,
    )
    topUsersByAmtStudied = sortUsersByAmtStudied.slice(0, 10)
    return topUsersByAmtStudied || []
  }

  function calcUsersByGrade(leaderboard: LeaderboardType[]): LeaderboardType[] {
    if (leaderboard === null || leaderboard == undefined || !leaderboard) return []

    let sortUsersByGrade: LeaderboardType[] = []
    let topUsersByGrade: LeaderboardType[] = []

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

      {pairedLeaderboards?.map((lb) => (
        <>
          <h1 className='text-center p-2 text-2xl '> The Stats for {lb.role_name}</h1>

          <LeaderboardStatCard topTenArray={lb.amount_leaderboard} metricType='total_questions' />
          <LeaderboardStatCard topTenArray={lb.grades_leaderboard} metricType='average_grade' />
        </>
      ))}
    </div>
  )
}
