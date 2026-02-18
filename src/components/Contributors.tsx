import { NavLink } from "react-router-dom"

export default function Contributors() {
  const CONTRIBUTORS = [
    {
      name: "Alex Thomas",
      role: "Scrum Master",
      linkedin: "https://linkedin.com/in/ajt11176",
      github: "https://github.com/BagelTime",
    },
    {
      name: "Wael Kweder",
      role: "Frontend Developer",
      linkedin: "https://linkedin.com/in/wael-kweder-a63836339/",
      github: "https://github.com/WDataW",
    },

    {
      name: "Emily Carr",
      role: "Web Developer",
      linkedin: "https://www.linkedin.com/in/emily-c-2285a9277/",
      github: "https://github.com/codingEmily",
    },

    {
      name: "Bryan Hoyem",
      role: "Developer",
      linkedin: "https://www.linkedin.com/in/bryanhoyem",
      github: "https://github.com/bhoyem",
    },
    {
      name: "Ivan Rebolledo",
      role: "Frontend Developer",
      linkedin: "https://www.linkedin.com/in/ivan-rebolledo-012b17244/",
      github: "https://github.com/ivannissimrch",
    },
    {
      name: "Jugraj Singh Bali ",
      role: "Web Developer",
      linkedin: "https://www.linkedin.com/in/jugraj-singh-bali-117994268/",
      github: "https://github.com/jugrajsinghbali",
    },
    {
      name: "Matthew Neie",
      role: "Web Developer",
      linkedin: "https://www.linkedin.com/in/matthew-neie",
      github: "https://github.com/MatthewNeie",
    },
  ]

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-[1rem]'>
      {CONTRIBUTORS.map((contributor, index) => (
        <section
          key={index}
          className='flex items-center justify-center hover:bg-gray-800 transition-colors duration-100 min-w-fit '>
          <div className='flex gap-2'>
            <NavLink
              className='text-sm'
              to={`${contributor.github}`}
              target='_blank'
              rel='noopener noreferrer'>
              <img
                src='/images/github-mark.png'
                alt='GitHub'
                className='w-8 h-8 bg-white rounded object-cover p-0.5'
              />
            </NavLink>

            <NavLink
              className='text-sm'
              to={`${contributor.linkedin}`}
              target='_blank'
              rel='noopener noreferrer'>
              <img
                src='/images/LinkedIn.png'
                alt='LinkedIn'
                className='w-8 h-8 bg-white  rounded object-cover'
              />
            </NavLink>
          </div>

          <div className='m-2'>
            <p className=' text-sm font-medium'>{contributor.name}</p>
            <p className='text-xs text-gray-400 w-28'>{contributor.role}</p>
          </div>
        </section>
      ))}
    </div>
  )
}
