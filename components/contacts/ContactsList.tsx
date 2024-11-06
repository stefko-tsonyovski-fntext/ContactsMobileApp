import { FlatList, StyleSheet } from "react-native";
import ContactsCard from "./ContactsCard";

export type Contact = {
  id: string;
  profileImageUri?: string;
  fullName: string;
  contactPhone: string;
  contactType: "WORK" | "PERSONAL" | "BUSINESS" | "OTHER";
  contactAddress?: string;
  contactEmail?: string;
};

const DATA: Contact[] = [
  {
    id: "1",
    profileImageUri: "https://picsum.photos/700",
    fullName: "Stefko Tsonyovski",
    contactType: "WORK",
    contactPhone: "0876148608",
    contactAddress: "str. Sveti Naum 15",
    contactEmail: "stefko.noisy.boy@gmail.com",
  },
  {
    id: "2",
    profileImageUri: "https://picsum.photos/700",
    fullName: "Diyana Tsonyovska",
    contactType: "PERSONAL",
    contactPhone: "0876148608",
    contactAddress: "str. Ivan Asen II 15",
    contactEmail: "diyanamarinova2006@gmail.com",
  },
  {
    id: "3",
    fullName: "Ivan Tsonyovski",
    contactType: "PERSONAL",
    contactPhone: "0876148608",
  },
];

export default function ContactsList() {
  return (
    <FlatList
      style={styles.contactsList}
      data={DATA}
      renderItem={({ item }) => <ContactsCard contact={item} />}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  contactsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
