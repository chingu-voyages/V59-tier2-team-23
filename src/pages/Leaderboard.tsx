import { type User } from "@supabase/supabase-js"
import LeaderboardStatCard from "../components/LB_Stat_Card"
import {
  getUserInfo,
  getLeaderBoardGlobal,
  getLeaderByBoardByRole,
  // userPercentile,
  getRoles,
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
  role_name?: string
  metric_type?: "total_questions" | "average_grade"
}

export type LeaderboardType = {
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

  const [roleData, setRoleData] = useState<any[] | null>(null)

  // const [userPercentileData, setUserPercentileData] = useState<number | null>(null)
  const [roleLeaderboards, setRoleLeaderboards] = useState<any[]>([])
  const [sortedLeaderboards, setSortedLeaderboards] = useState<LeaderboardType[][]>([])

  const [rankedByAmt, setRankedByAmt] = useState<LeaderboardType[]>([])
  const [rankedByGrade, setRankedByGrade] = useState<LeaderboardType[]>([])
  const [pairedLeaderboards, setPairedLeaderboards] = useState<PairedLeaderboardType[]>([])

  const firstName = userData?.user_metadata.name.split(" ")[0]

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
    return pairedLeaderboards || []
  }

  useEffect(() => {
    const listByAmtStudied = calcUsersByAmtStudied(leaderboardData)
    setRankedByAmt(listByAmtStudied)

    const listByGrade = calcUsersByGrade(leaderboardData)
    setRankedByGrade(listByGrade)

    const listPairedLeaderboards: PairedLeaderboardType[] =
      specificLeaderboardPairs(sortedLeaderboards) || []
    setPairedLeaderboards(listPairedLeaderboards)
  }, [leaderboardData, sortedLeaderboards])

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo()
      setUserData(user)
      setLoadingUser(false)
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
    }

    fetchUser()
    fetchRoles()
    fetchLeaderboardData()
  }, [])

  useEffect(() => {
    if (!roleData) return
    const roles = roleData

    async function fetchLeaderboardDataByRole() {
      const allLeaderboards = await Promise.all(
        roles.map((role) => getLeaderByBoardByRole(role.id)),
      )
      setRoleLeaderboards(allLeaderboards)
      console.log("all Leaderboards for ind. roles: ", allLeaderboards)
    }
    fetchLeaderboardDataByRole()
    //////////////////////////
  }, [roleData])

  /// SORT OUT ANY LEADERBOARDS THE USER IS NOT A PART OF (aka roles user has never studied for)
  useEffect(() => {
    if (!userData || userData === null || !roleLeaderboards || roleLeaderboards === null) return
    let activeUserId = userData.id
    let activeLeaderboards = []

    for (let i = 0; i <= roleLeaderboards.length - 1; i++) {
      let thisLeaderboard = roleLeaderboards[i]
      if (thisLeaderboard.some((user: SortedUserType) => user.user_id === activeUserId)) {
        activeLeaderboards.push(thisLeaderboard)
        setSortedLeaderboards(activeLeaderboards)
      }
    }
  }, [leaderboardData, userData, roleLeaderboards])

  // Also, if we had more users, it would be really cool to add a Xth place for the user under each Top 10, but I probably won't do it in this voyage time
  function calcUsersByAmtStudied(leaderboard: LeaderboardType[]): LeaderboardType[] {
    if (leaderboard === null || leaderboard == undefined || !leaderboard) return []
    let sortUsersByAmtStudied: LeaderboardType[] = []
    let rankedByAmtStudied: LeaderboardType[] = []

    for (let i = 0; i <= leaderboard.length - 1; i++) {
      if (leaderboard[i]) sortUsersByAmtStudied.push(leaderboard[i])
    }

    sortUsersByAmtStudied = sortUsersByAmtStudied.sort(
      (a, b) => b.total_questions - a.total_questions,
    )
    rankedByAmtStudied = sortUsersByAmtStudied.slice(0, 10)
    return rankedByAmtStudied || []
  }

  function calcUsersByGrade(leaderboard: LeaderboardType[]): LeaderboardType[] {
    if (leaderboard === null || leaderboard == undefined || !leaderboard) return []

    let sortUsersByGrade: LeaderboardType[] = []
    let rankedByGrade: LeaderboardType[] = []

    for (let i = 0; i <= leaderboard.length - 1; i++) {
      if (leaderboard[i]) sortUsersByGrade.push(leaderboard[i])
    }

    sortUsersByGrade = sortUsersByGrade.sort((a, b) => b.average_grade - a.average_grade)
    rankedByGrade = sortUsersByGrade.slice(0, 10)
    return rankedByGrade
  }

  if (loadingUser || loadingLeaderboardData) {
    return <div> Loading... </div>
  }
  return (
    <div className='flex flex-col items-center pb-25 fluid-page-padding '>
      <div className='text-center  text-5xl '>
        <h1>Welcome to the Leaderboard, {firstName}!</h1>
      </div>

      <h1 className=' text-center text-4xl pb-6 pt-10'> Global Stats </h1>
      <div>
        <h1 className='font-bold text-center text-xl '>Top 10 for Studying</h1>
        <LeaderboardStatCard topTenArray={rankedByAmt || []} metricType='total_questions' />
      </div>

      <div>
        <h1 className='font-bold text-center text-xl '>Top 10 for Grades</h1>
        <LeaderboardStatCard topTenArray={rankedByGrade || []} metricType='average_grade' />
      </div>

      {pairedLeaderboards?.map((lb) => (
        <>
          <h1 className='text-center text-4xl pb-6 pt-6'> The Stats for {lb.role_name} </h1>

          <h1 className='font-bold text-center text-xl '>
            {" "}
            Top 10 for Studying as a {lb.role_name}
          </h1>
          <LeaderboardStatCard topTenArray={lb.amount_leaderboard} metricType='total_questions' />
          <h1 className='font-bold text-center text-xl  '> Top 10 Grades for {lb.role_name}</h1>

          <LeaderboardStatCard topTenArray={lb.grades_leaderboard} metricType='average_grade' />
        </>
      ))}
    </div>
  )
}
