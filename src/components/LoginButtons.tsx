import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function LoginButtons() {
  const { user, signInWithGoogle } = useAuth();
  const [isLogging, setIsLogging] = useState(false);

  async function handleLogging() {
    setIsLogging(true);
    await signInWithGoogle();
  }

  if (!user) {
    return (
      <div className="font-bold text-[1.5rem] py-5">
        <button
          className="border p-2 rounded mt-2.5 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all"
          onClick={handleLogging}
          disabled={isLogging}
        >
          {isLogging ? <FaSpinner className="animate-spin" /> : <FcGoogle />}
          {isLogging ? "Logging in..." : "Login with Google"}
        </button>
      </div>
    );
  }

  return (
    <Link to="/roles" className="font-bold text-[1.5rem] py-5">
      <button className="border p-2 rounded mt-2.5">Choose Your Role</button>
    </Link>
  );
}
