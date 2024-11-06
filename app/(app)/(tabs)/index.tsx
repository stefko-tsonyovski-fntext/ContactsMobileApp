import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import ContactsHeader from "@/components/contacts/ContactsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ContactsList from "@/components/contacts/ContactsList";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
    >
      <SafeAreaView>
        <ContactsHeader />

        <ContactsList />
      </SafeAreaView>
    </ParallaxScrollView>
  );
}
