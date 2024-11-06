import { Pressable, StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { Contact } from "./ContactsList";
import { Link } from "expo-router";

export const CONTACT_TYPES = {
  WORK: "WORK",
  BUSINESS: "BUSINESS",
  PERSONAL: "PERSONAL",
  OTHER: "OTHER",
};

export type ContactsCardProps = {
  contact: Contact;
};

export const renderContactType = (
  contactType: "WORK" | "BUSINESS" | "PERSONAL" | "OTHER"
) => {
  let contactTypeText = "Work contact";

  if (contactType === CONTACT_TYPES.BUSINESS) {
    contactTypeText = "Business contact";
  } else if (contactType === CONTACT_TYPES.PERSONAL) {
    contactTypeText = "Personal contact";
  } else if (contactType === CONTACT_TYPES.OTHER) {
    contactTypeText = "Other contact";
  }

  return contactTypeText;
};

export default function ContactsCard({ contact }: ContactsCardProps) {
  // Other variables
  const { id, profileImageUri, fullName, contactType } = contact;

  return (
    <Link href={{ pathname: "/contacts/[id]", params: { id } }} asChild>
      <Pressable>
        <Card style={styles.cardContainer}>
          <Card.Cover
            source={{ uri: profileImageUri ?? "https://picsum.photos/700" }}
          />

          <Card.Actions>
            <ThemedView style={styles.cardActionsContainer}>
              <ThemedView>
                <Avatar.Image size={40} source={{ uri: profileImageUri }} />
              </ThemedView>

              <ThemedView style={styles.nameContainer}>
                <ThemedText type="defaultSemiBold">{fullName}</ThemedText>
                <ThemedText
                  lightColor={Colors.light.icon}
                  darkColor={Colors.dark.icon}
                >
                  {renderContactType(contactType)}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </Card.Actions>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 15,
  },
  cardActionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "transparent",
    columnGap: 10,
    flex: 1,
  },
  nameContainer: {
    backgroundColor: "transparent",
  },
});
