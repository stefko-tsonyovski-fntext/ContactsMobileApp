import { Appbar } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession } from "@/auth/auth-context";

export default function ContactsHeader() {
  // General hooks
  const appBarColor = useThemeColor({}, "appBar");

  // Custom hooks
  const { signOut } = useSession();

  return (
    <Appbar.Header
      statusBarHeight={0}
      dark
      style={{ backgroundColor: appBarColor }}
    >
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title="Contacts" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="logout" onPress={signOut} />
    </Appbar.Header>
  );
}
