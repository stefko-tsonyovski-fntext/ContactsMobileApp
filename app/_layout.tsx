import { SessionProvider } from "@/auth/auth-context";
import { persistor, store } from "@/store/store";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  // Set up the auth context and render our layout inside of it.
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
