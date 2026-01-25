import { useAuth } from "../context/AuthContext";

export default function WelcomeMessage() {
  const { user } = useAuth();
  let message = "WELCOME TO QUIZEST";

  if (user) {
    if (user.user_metadata.full_name) {
      message = `WELCOME BACK ${user.user_metadata.full_name}`;
    }
    else{
    message = "WELCOME BACK";}
  }

  return (
    <h1 className="text-[2rem] sm:text-[3rem] md:text-[4rem]">{message}</h1>
  );
}
