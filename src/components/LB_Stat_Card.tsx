type StatCardProps = {
  title: string
}

export default function LeaderboardStatCard({ title }: StatCardProps) {
  return (
    <div className='flex flex-col items-center pt-10'>
      <div>
        <h1 className='font-bold'>{title}</h1>
        <p>
          {" "}
          AKA Title of Stat -if role specific or broad stat- if stat of correctness, amt studied or
          other
        </p>
      </div>

      {/* CREATE A TABLE HERE USING FLEX OR GRID (probably grid and make sure boundaries don't move, worst case a very long username is cut off or scrolls or something) */}
      <div className='flex flex-col bg-white  border-4  border-fuchsia-800 rounded-xl'>
        <div className='flex relative w-100  border-2  border-fuchsia-800 '>
          <div className='font-bold sticky left-0 pl-2'> #1</div>
          <div className='text-center pl-2 pr-2'> John Smith </div>
          <div className='absolute right-2'> Metric </div>
        </div>
        {/* temp placeholder below but they will be displayed dynamically*/}
        <div className='flex relative w-100 border-2  border-fuchsia-800 '>
          <div className='font-bold sticky left-0 pl-2'> #2 </div>
          <div className='text-center pl-2 pr-2'> Jane Doe </div>
          <div className='absolute right-2'> Metric </div>
        </div>
        <div className='flex relative w-100 border-2  border-fuchsia-800 '>
          <div className='font-bold   left-0 pl-2'> #3 </div>
          <div className='text-center pl-2 pr-2'>Ebenezer Dude</div>
          <div className='absolute right-2'> Metric </div>
        </div>
      </div>
    </div>
  )
}
