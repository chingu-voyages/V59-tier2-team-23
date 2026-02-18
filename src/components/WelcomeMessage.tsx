import { useAuth } from "../context/AuthContext"

export default function WelcomeMessage() {
  const { user } = useAuth()
  let message = "Welcome to Quizest!"

  if (user) {
    if (user.user_metadata.full_name) {
      message = `Welcome back, ${user.user_metadata.full_name}!`
    } else {
      message = "Welcome back!"
    }
  }

  return <h1 className='text-[2rem] sm:text-[3rem] md:text-[4rem]'>{message}</h1>
}
