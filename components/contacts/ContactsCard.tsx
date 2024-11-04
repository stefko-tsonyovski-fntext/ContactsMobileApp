import { StyleSheet } from "react-native";
import { Avatar, Card } from "react-native-paper";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

export const CONTACT_TYPES = {
  WORK: "WORK",
  BUSINESS: "BUSINESS",
  PERSONAL: "PERSONAL",
  OTHER: "OTHER",
};

export type ContactsCardProps = {
  profileImageUri?: string;
  firstName: string;
  lastName: string;
  contactType: "WORK" | "BUSINESS" | "PERSONAL" | "OTHER";
};

const renderContactType = (
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

export default function ContactsCard({
  profileImageUri,
  firstName,
  lastName,
  contactType,
}: ContactsCardProps) {
  return (
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
            <ThemedText type="defaultSemiBold">
              {firstName + " " + lastName}
            </ThemedText>
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
