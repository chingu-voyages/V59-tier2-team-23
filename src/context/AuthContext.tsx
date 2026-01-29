import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthLoading: boolean;
  errorMessage: string | null;
  signIn: (authProvider: "google" | "github") => Promise<void>;
  signOut: () => Promise<void>;
  isGuessLogin: boolean;
  logGuess: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export type LoginProvider = "google" | "github";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGuessLogin, setIsGuessLogin] = useState<boolean>(false);

  async function signIn(authProvider: LoginProvider) {
    setIsAuthLoading(true);
    setErrorMessage(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: authProvider,
      options: { redirectTo: `${window.location.origin}/roles` },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsAuthLoading(false);
    }
  }

  async function signOut() {
    setIsAuthLoading(true);
    setErrorMessage(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErrorMessage(error.message);
    }
    setIsAuthLoading(false);
  }

  function logGuess() {
    setIsGuessLogin(true);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? session.user : null);
      setIsAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ? session.user : null);
      setIsAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthLoading,
        signOut,
        signIn,
        session,
        errorMessage,
        isGuessLogin,
        logGuess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
