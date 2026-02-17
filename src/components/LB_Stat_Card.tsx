import type { SortedUserType, MetricType } from "../pages/Leaderboard"

type IndividualUserStats = {
  name: string
  place: number
  metricNumber: number
}

export default function LeaderboardStatCard({
  topTenArray,
  metricType = "total_questions",
}: {
  topTenArray: SortedUserType[] | []
  metricType: MetricType
}) {
  let labelMetric = ""
  if (metricType === "total_questions") {
    labelMetric = "Number of Questions"
  } else if (metricType === "average_grade") {
    labelMetric = "User's Average Grade"
  }
  return (
    <div className='flex flex-col items-center pb-10'>
      <div className='flex relative w-100 pt-1.5 pb-1.5    '>
        <div className='  left-0 pl-2'> User </div>
        <div className=' absolute right-2'> {labelMetric} </div>
      </div>

      {/* Syntax for my dreamed of gradient lol - bg-linear-to-br from-gray-200/20 to-gray-200 */}
      <div className='flex flex-col  border-4  border-gray-800 rounded-xl'>
        {topTenArray.map((u, i) => (
          <IndividualUserStat
            key={u.user_id}
            name={u.user_name}
            place={i + 1}
            metricNumber={u[metricType]}></IndividualUserStat>
        ))}
      </div>
    </div>
  )
}

function IndividualUserStat({ name, place, metricNumber }: IndividualUserStats) {
  return (
    <div className='flex relative w-100 pt-1.5 pb-1.5  border-2  border-gray-800 '>
      <div className='font-bold   left-0 pl-2'> #{place} </div>
      <div className='text-center pl-2 pr-2'>{name}</div>
      <div className='absolute right-2'> {metricNumber} </div>
    </div>
  )
}
