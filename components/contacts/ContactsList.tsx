import { FlatList, StyleSheet } from "react-native";
import ContactsCard from "./ContactsCard";

export type Contact = {
  id: string;
  profileImageUri?: string;
  firstName: string;
  lastName: string;
  contactType: "WORK" | "PERSONAL" | "BUSINESS" | "OTHER";
};

const DATA: Contact[] = [
  {
    id: "1",
    profileImageUri: "https://picsum.photos/700",
    firstName: "Stefko",
    lastName: "Tsonyovski",
    contactType: "WORK",
  },
  {
    id: "2",
    profileImageUri: "https://picsum.photos/700",
    firstName: "Diyana",
    lastName: "Tsonyovska",
    contactType: "PERSONAL",
  },
  {
    id: "3",
    profileImageUri: "https://picsum.photos/700",
    firstName: "Ivan",
    lastName: "Tsonyovski",
    contactType: "PERSONAL",
  },
];

export default function ContactsList() {
  return (
    <FlatList
      style={styles.contactsList}
      data={DATA}
      renderItem={({ item }) => (
        <ContactsCard
          profileImageUri={item.profileImageUri}
          firstName={item.firstName}
          lastName={item.lastName}
          contactType={item.contactType}
        />
      )}
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
