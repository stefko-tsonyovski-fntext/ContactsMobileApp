import { useStorageState } from "@/hooks/useStorageState";
import { logout, setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { useContext, createContext, type PropsWithChildren } from "react";

export type UserDto = {
  id: string;
  email: string;
  fullName: string;
  token: string;
};

const AuthContext = createContext<{
  signIn: (user: UserDto) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // General hooks
  const dispatch = useAppDispatch();

  // Custom hooks
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: UserDto) => {
          // Perform sign-in logic here
          dispatch(setCredentials(user));
          setSession(user.token);
        },
        signOut: () => {
          dispatch(logout());
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
