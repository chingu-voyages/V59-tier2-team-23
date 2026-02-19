import type { JSX } from "react"
import { useState, useEffect } from "react"
import { type User } from "@supabase/supabase-js"
import { type LeaderboardType } from "../../pages/Leaderboard"
import { getCorrect, getGrade, type Stats, type UserPercentiles } from "../../utils/results"
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
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[] | null>(null)
  const [userStats, setUserStats] = useState<LeaderboardType | null>(null)
  const [userPercentileData, setUserPercentileData] = useState<UserPercentiles | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
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
  }, [roleId])

  useEffect(() => {
    setLoading(true)
    if (!user || !leaderboard) return
    const userId = user.id
    const userStats = leaderboard.find((lb) => lb.user_id === userId) || null
    setUserStats(userStats)
  }, [user, leaderboard])

  useEffect(() => {
    async function fetchUserPercentile(leaderboard: LeaderboardType | null) {
      if (!(roleId.length >= 1) || leaderboard === null) {
        setLoading(false)
        return
      }

      const percentile: UserPercentiles = await userPercentile(
        roleId,
        leaderboard.total_score,
        leaderboard.total_questions,
      )

      setUserPercentileData(percentile)
      setLoading(false)
    }

    fetchUserPercentile(userStats)
  }, [roleId, user, userStats])

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
        <div className='flex flex-col items-center justify-center text-center'>
          {loading ? (
            <p>Loading User Percentiles...</p>
          ) : userPercentileData === null || userPercentileData === undefined ? (
            <p>No comparison data available for this role yet.</p>
          ) : (
            <>
              <h2 className='font-bold'>How You Compare to Other Users for This Role</h2>
              <p>
                You study more than {userPercentileData[0].percentile_studied}% of Users for this
                role.
              </p>
              <p>
                Your grades are higher than {userPercentileData[0].percentile_score}% of Users for
                this role,
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
