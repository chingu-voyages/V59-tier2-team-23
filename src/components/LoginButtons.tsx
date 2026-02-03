import { Link } from "react-router-dom";
import { useAuth, type LoginProvider } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { FaSpinner, FaGithub } from "react-icons/fa";

export default function LoginButtons() {
  const { user, signIn, logInGuest } = useAuth();
  const [isGoogleLogging, setIsGoogleLogging] = useState(false);
  const [isGitHubLogging, setIsGitHubLogging] = useState(false);

  async function handleLogging(authProvider: LoginProvider) {
    if (authProvider === "google") {
      setIsGoogleLogging(true);
      await signIn(authProvider);
    }
    if (authProvider === "github") {
      setIsGitHubLogging(true);
      await signIn(authProvider);
    }
  }

  if (!user) {
    return (
      <>
        <div className="font-bold text-[1.5rem] py-5 gap-2 flex flex-col md:flex-row">
          <button
            className="border p-2 rounded mt-2.5 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all"
            onClick={() => handleLogging("google")}
            disabled={isGoogleLogging || isGitHubLogging}
          >
            {isGoogleLogging ? (
              <div className=" w-60 h-9 flex justify-center items-center">
                <FaSpinner className="animate-spin " />
              </div>
            ) : (
              <FcGoogle />
            )}
            {isGoogleLogging ? "" : "Login with Google"}
          </button>
          <button
            className="border p-2 rounded mt-2.5 flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all"
            onClick={() => handleLogging("github")}
            disabled={isGitHubLogging || isGoogleLogging}
          >
            {isGitHubLogging ? (
              <div className=" w-60 h-9 flex justify-center items-center">
                <FaSpinner className="animate-spin " />
              </div>
            ) : (
              <FaGithub />
            )}
            {isGitHubLogging ? "" : "Login with GitHub"}
          </button>
        </div>
        <Link
          to="/roles"
          className="underline pb-5 hover:text-blue-700"
          onClick={logInGuest}
        >
          Continue as guest
        </Link>
      </>
    );
  }

  return (
    <Link to="/roles" className="font-bold text-[1.5rem] py-5">
      <button className="border p-2 rounded mt-2.5">Choose Your Role</button>
    </Link>
  );
}
