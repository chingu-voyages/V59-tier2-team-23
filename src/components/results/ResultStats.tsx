import type { JSX } from "react"
import { useState, useEffect } from "react"
import { type User } from "@supabase/supabase-js"
import Leaderboard, { type LeaderboardType } from "../../pages/Leaderboard"
import { getCorrect, getGrade, type Stats, type UserStats } from "../../utils/results"
import { getUserInfo, userPercentile, getLeaderByBoardByRole } from "../../utils/getData"

type Props = {
  className?: string
  stats: Stats
  roleId: string
} & React.HTMLAttributes<HTMLDivElement>

export default function ResultStats({
  stats,
  roleId,
  className = "",
  ...props
}: Props): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[] | null>([])
  const [userStats, setUserStats] = useState<LeaderboardType | null>(null)

  useEffect(() => {
    async function fetchUser() {
      const user = await getUserInfo()
      setUser(user)
    }

    async function fetchLeaderboard() {
      const leaderboard = await getLeaderByBoardByRole(roleId)
      setLeaderboard(leaderboard)
    }

    fetchUser()
    fetchLeaderboard()
  }, [])

  // useEffect(() => {
  //   async function fetchUserPercentile({ roleId, totalCorrectScore, totalQuestions }: UserStats) {
  //     const userStats = await userPercentile(roleId || "", totalCorrectScore, totalQuestions)
  //     setUserStats(userStats)
  //     console.log(userStats)
  //   }

  //   // fetchUserPercentile() // have to write a function to generate totalScore and totalQuestions using the User info and the leaderboard
  // }, [leaderboard])

  function calcUserStats() {
    const userId = user?.id
    const userLeaderboard = leaderboard?.find((lb) => lb.user_id === userId)

    console.log("UserId: ", userId, " User Leaderboard: ", userLeaderboard)
  }
  calcUserStats()

  return (
    <div className='flex flex-col items-center justify-center mr-2'>
      <div className={`flex w-full max-w-32 justify-between leading-none ${className}`} {...props}>
        <div className='flex flex-col items-center justify-center mr-2'>
          <h2>Grade</h2>
          <p className='text-[1.5rem] '>{getGrade(stats)}</p>
        </div>
        <div className='flex flex-col items-center justify-center ml-2'>
          <h2>Correct</h2>
          <p className='text-[1.5rem] '>{getCorrect(stats)}</p>
        </div>
      </div>

      <div className={`flex w-full justify-between p-4 ${className}`} {...props}>
        <div className='flex flex-col items-center justify-center mr-2'>
          <h2 className='font-bold'>How You Compare to Other Users for This Role</h2>
          <p>{roleId}</p>
          <p>You study more than {} percent of Users</p>
          <p>Your grades are higher than {} percent of Users</p>

          {/* <p className='text-[1.5rem] '>{getGrade(stats)}</p> */}
        </div>
      </div>
    </div>
  )
}
