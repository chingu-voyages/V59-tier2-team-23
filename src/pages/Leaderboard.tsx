import LeaderboardStatCard from "../components/LB_Stat_Card"
import {
  getUserInfo,
  getSessions,
  getAllSessionsUser,
  getAllSessionsForRole,
} from "../utils/getData"

export default function Leaderboard() {
  //// TEMP FAKE DATA
  const fakeTitles = [
    "Amount Studied Per Role",
    "Correctness Per Role",
    "Overall Amount Studied",
    "Overall Correctness",
  ]

  /*PLANNING SESSION - 
So I'm going to access the real data, figure out exactly what I'm using, 

then I'm going to have create an object per card. I will import the userData to this Leaderboard file, I will digest it into something like an array of ojects
In the LeaderBoardComponents, I will have a big card for each "Top 10 topic" and then each of the users in that Top 10 will be their own card (created and ued exclusively in LB_Components)

For topics, I'll begin with overall number of q.s answered and overall correctness, before diving into those metrics per ind. role studied for
*/
  return (
    <div className='flex flex-col items-center bg-linear-to-br from-indigo-400 to-purple-500 pb-25 min-h-9/12'>
      {/* 
      
      So the whole things needs to be minimum, almost enough to cover the screen height wise

      Needs to have a TTILE

      And a list of rankings (Top 10) for 1-3 stats - make it a little bit colorful for now
      
      
      */}

      <div className='text-center p-6 text-5xl '>
        <h1>Welcome to the Leaderboard, Firstname!</h1>
      </div>

      <div>
        <div className='text-center p-4 text-2xl '>
          <h1>Display data for- Top Ten Users for Having Answered the Most Questions</h1>
        </div>

        <div>
          <LeaderboardStatCard />
        </div>
      </div>
    </div>
  )
}
