import { SessionProvider } from "@/auth/auth-context";
import { Slot } from "expo-router";

export default function RootLayout() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
