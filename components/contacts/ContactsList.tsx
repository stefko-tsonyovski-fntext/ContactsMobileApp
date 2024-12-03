import { FlatList, StyleSheet } from "react-native";
import ContactsCard from "./ContactsCard";
import { useGetAllContactsQuery } from "@/store/slices/apiSlice";
import { useAppSelector } from "@/store/store";
import { selectToken } from "@/store/slices/authSlice";

export type Contact = {
  id: string;
  profileImageUri?: string;
  fullName: string;
  contactPhone: string;
  contactType: "WORK" | "PERSONAL" | "BUSINESS" | "OTHER";
  contactAddress?: string;
  contactEmail?: string;
};

export default function ContactsList() {
  // Selectors
  const token = useAppSelector(selectToken);

  // Queries
  const { data: contactsData } = useGetAllContactsQuery({ token });

  // Other variables
  const contacts = contactsData ?? [];

  return (
    <FlatList
      style={styles.contactsList}
      data={contacts}
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
