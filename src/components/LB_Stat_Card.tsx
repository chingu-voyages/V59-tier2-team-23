type IndividualUserStats = {
  name: string
  place: number
  metricNumber: number
  metricType?: "Grade" | "Quantity Studied" // probably will delete this line
}

type TopTenStatCard = {
  users: IndividualUserStats[]
}

export default function LeaderboardStatCard() {
  return (
    <div className='flex flex-col items-center pt-10'>
      {/* CREATE A TABLE HERE USING FLEX OR GRID (probably grid and make sure boundaries don't move, worst case a very long username is cut off or scrolls or something) */}
      <div className='flex flex-col bg-white/20  border-4  border-white rounded-xl'>
        <div className='flex relative w-100 pt-1.5 pb-1.5 border-2  border-white '>
          <div className='font-bold sticky left-0 pl-2'> #1</div>
          <div className='text-center pl-2 pr-2'> John Smith </div>
          <div className='absolute right-2'> Metric </div>
        </div>
        {/* temp placeholder below but they will be displayed dynamically*/}
        <div className='flex relative w-100 pt-1.5 pb-1.5  border-2  border-white '>
          <div className='font-bold sticky left-0 pl-2'> #2 </div>
          <div className='text-center pl-2 pr-2'> Jane Doe </div>
          <div className='absolute right-2'> Metric </div>
        </div>
        <div className='flex relative w-100 pt-1.5 pb-1.5  border-2  border-white '>
          <div className='font-bold   left-0 pl-2'> #3 </div>
          <div className='text-center pl-2 pr-2'>Ebenezer Dude</div>
          <div className='absolute right-2'> Metric </div>
        </div>

        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
        <IndividualUserStat name='John Doe' place={1} metricNumber={4535}></IndividualUserStat>
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
