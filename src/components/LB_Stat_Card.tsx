import type { SortedUserType, MetricType } from "../pages/Leaderboard"

type IndividualUserStats = {
  name: string
  place: number
  metricNumber: number
}

// type TopTenStatCard = {
//   users: IndividualUserStats[]
// }

export default function LeaderboardStatCard({
  topTenArray,
  metricType = "totalQuestions",
}: {
  topTenArray: SortedUserType[] | []
  metricType: MetricType
}) {
  console.log(typeof topTenArray, topTenArray)
  return (
    <div className='flex flex-col items-center pb-10'>
      <div className='flex flex-col bg-white/20  border-4  border-white rounded-xl'>
        {topTenArray.map((u, i) => (
          <IndividualUserStat
            key={u.userId}
            name={u.userName}
            place={i + 1}
            metricNumber={u[metricType]}></IndividualUserStat>
        ))}
      </div>
    </div>
  )
}

function IndividualUserStat({ name, place, metricNumber }: IndividualUserStats) {
  return (
    <div className='flex relative w-100 pt-1.5 pb-1.5  border-2  border-white '>
      <div className='font-bold   left-0 pl-2'> #{place} </div>
      <div className='text-center pl-2 pr-2'>{name}</div>
      <div className='absolute right-2'> {metricNumber} </div>
    </div>
  )
}
