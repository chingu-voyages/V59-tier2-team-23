import LeaderboardStatCard from "../components/LB_Stat_Card"

export default function Leaderboard() {
  //// TEMP FAKE DATA
  const fakeTitles = [
    "Amount Studied Per Role",
    "Correctness Per Role",
    "Overall Amount Studied",
    "Overall Correctness",
  ]

  const users = fakeLeaderboardStats.users
  const topUsers = [...users]
    .sort((a, b) => b.summary.overallAverageScore - a.summary.overallAverageScore)
    .slice(0, 10)
  //// TEMP FAKE DATA ENDS

  /*PLANNING SESSION - 
So I'm going to access the real data, figure out exactly what I'm using, 

then I'm going to have create an object per card. I will import the userData to this Leaderboard file, I will digest it into something like an array of ojects
In the LeaderBoardComponents, I will have a big card for each "Top 10 topic" and then each of the users in that Top 10 will be their own card (created and ued exclusively in LB_Components)

For topics, I'll begin with overall number of q.s answered and overall correctness, before diving into those metrics per ind. role studied for
*/
  return (
    <div className='flex flex-col items-center bg-gradient-to-br from-blue-500 to-pink-500'>
      {/* 
      
      So the whole things needs to be minimum, almost enough to covr the screen height wise

      Needs to have a TTILE

      And a list of rankings (Top 10) for 1-3 stats - make it a little bit colorful for now
      
      
      */}

      <div className='text-center p-6 text-5xl '>
        <h1>Welcome to the Leaderboard, Firstname!</h1>
      </div>

      {fakeTitles.map((title) => (
        <LeaderboardStatCard title={title || "title not found"} />
      ))}
    </div>
  )
}
