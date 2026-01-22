import { NavLink } from "react-router-dom"

export default function ResourceLinks() {
  return (
    <section className='flex flex-col mt-2 gap-2 md:flex-row md:gap-4 p-2'>
      <div className='flex gap-4 justify-center md:justify-end items-center md:w-1/2 p-2'>
        {" "}
        <NavLink
          to='https://github.com/chingu-voyages/v59-tier2-team-23'
          target='_blank'
          rel='noopener noreferrer'>
          Go to the project repo
        </NavLink>
        <NavLink
          className='text-sm'
          to='https://github.com/chingu-voyages/v59-tier2-team-23'
          target='_blank'
          rel='noopener noreferrer'>
          <img
            src={"/images/github-mark.png"}
            alt={"github"}
            className='w-6 h-6 rounded-full object-cover bg-white'
          />
        </NavLink>
      </div>

      <div className='flex gap-4  justify-center md:justify-start items-center md:w-1/2 p-2'>
        <NavLink to='https://www.chingu.io/' target='_blank' rel='noopener noreferrer'>
          Learn about Chingu
        </NavLink>
        <NavLink to='https://www.chingu.io/' target='_blank' rel='noopener noreferrer'>
          <img
            src={"/images/Chingu.png"}
            alt={"github"}
            className='w-6 h-6 rounded-full object-cover'
          />
        </NavLink>
      </div>
    </section>
  )
}
