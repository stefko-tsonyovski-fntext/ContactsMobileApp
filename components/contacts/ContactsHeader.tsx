import { Appbar } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ContactsHeader() {
  // General hooks
  const appBarColor = useThemeColor({}, "appBar");

  return (
    <Appbar.Header
      statusBarHeight={0}
      dark
      style={{ backgroundColor: appBarColor }}
    >
      <Appbar.Action icon="menu" onPress={() => {}} />
      <Appbar.Content title="Contacts" />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
}
