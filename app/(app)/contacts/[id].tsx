import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Avatar, Button, IconButton, TextInput } from "react-native-paper";
import { renderContactType } from "@/components/contacts/ContactsCard";
import { Contact } from "@/components/contacts/ContactsList";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dropdown, DropdownInputProps } from "react-native-paper-dropdown";
import { router } from "expo-router";

const contact: Contact = {
  id: "1",
  profileImageUri: "https://picsum.photos/700",
  fullName: "Stefko Tsonyovski",
  contactType: "WORK",
  contactPhone: "0876148608",
  contactAddress: "str. Sveti Naum 15",
  contactEmail: "stefko.noisy.boy@gmail.com",
};

const OPTIONS = [
  { label: "Work contact", value: "WORK" },
  { label: "Business contact", value: "BUSINESS" },
  { label: "Personal contact", value: "PERSONAL" },
  { label: "Other", value: "OTHER" },
];

export default function ContactDetailsScreen() {
  // General hooks
  const { top } = useSafeAreaInsets();

  // Custom hooks
  const backgroundColor = useThemeColor({}, "background");
  const textInputBackgroundColor = useThemeColor({}, "textInput");
  const appBarColor = useThemeColor({}, "appBar");

  // Other variables
  const {
    id,
    profileImageUri,
    fullName,
    contactPhone,
    contactType,
    contactAddress,
    contactEmail,
  } = contact;

  const windowWidth = Dimensions.get("window").width;

  // State
  const [contactNameState, setContactNameState] = useState(fullName);
  const [contactPhoneState, setContactPhoneState] = useState(contactPhone);
  const [contactTypeState, setContactTypeState] = useState<string | undefined>(
    contactType
  );
  const [contactAddressState, setContactAddressState] =
    useState(contactAddress);
  const [contactEmailState, setContactEmailState] = useState(contactEmail);

  // Other variables
  const value =
    OPTIONS?.find((option) => option.value === contactTypeState)?.label ?? "";

  // Handlers
  const handleClickClose = () => router.push("/");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
    >
      <SafeAreaView>
        <Image
          source={{ uri: profileImageUri }}
          width={windowWidth}
          height={250}
        />

        <ThemedView style={styles.contactDetailsContainer}>
          <ThemedView style={styles.contactHeaderContainer}>
            <ThemedView>
              <Avatar.Image size={40} source={{ uri: profileImageUri }} />
            </ThemedView>

            <ThemedView>
              <ThemedText type="defaultSemiBold">{fullName}</ThemedText>
              <ThemedText
                lightColor={Colors.light.icon}
                darkColor={Colors.dark.icon}
              >
                {renderContactType(contactType)}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.contactDetailsFormContainer}>
            <ThemedView style={styles.contactHeaderContainer}>
              <ThemedView>
                <Avatar.Icon
                  size={50}
                  icon="account"
                  style={{ backgroundColor }}
                />
              </ThemedView>

              <ThemedView style={styles.textInputContainer}>
                <TextInput
                  label="Contact Name"
                  value={contactNameState}
                  onChangeText={(text) => setContactNameState(text)}
                  style={{ backgroundColor: textInputBackgroundColor }}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.contactHeaderContainer}>
              <ThemedView>
                <Avatar.Icon
                  size={50}
                  icon="phone"
                  style={{ backgroundColor }}
                />
              </ThemedView>

              <ThemedView style={styles.textInputContainer}>
                <TextInput
                  label="Contact Phone"
                  value={contactPhoneState}
                  onChangeText={(text) => setContactPhoneState(text)}
                  style={{ backgroundColor: textInputBackgroundColor }}
                />
              </ThemedView>

              <ThemedView style={styles.textInputContainer}>
                <Dropdown
                  label="Contact Type"
                  placeholder="Select Contact Type"
                  options={OPTIONS}
                  value={contactTypeState}
                  onSelect={setContactTypeState}
                  CustomDropdownInput={(props: DropdownInputProps) => (
                    <TextInput
                      label="Contact Type"
                      value={value}
                      style={{ backgroundColor: textInputBackgroundColor }}
                    />
                  )}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.contactHeaderContainer}>
              <ThemedView>
                <Avatar.Icon
                  size={50}
                  icon="google-maps"
                  style={{ backgroundColor }}
                />
              </ThemedView>

              <ThemedView style={styles.textInputContainer}>
                <TextInput
                  label="Contact Address"
                  value={contactAddressState}
                  onChangeText={(text) => setContactAddressState(text)}
                  style={{ backgroundColor: textInputBackgroundColor }}
                />
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.contactHeaderContainer}>
              <ThemedView>
                <Avatar.Icon
                  size={50}
                  icon="email"
                  style={{ backgroundColor }}
                />
              </ThemedView>

              <ThemedView style={styles.textInputContainer}>
                <TextInput
                  label="Contact Email"
                  value={contactEmailState}
                  onChangeText={(text) => setContactEmailState(text)}
                  style={{ backgroundColor: textInputBackgroundColor }}
                />
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <Button
            style={[
              styles.saveButton,
              {
                backgroundColor: appBarColor,
              },
            ]}
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            SAVE
          </Button>
        </ThemedView>

        <ThemedView
          style={[
            styles.contactDetailsPageHeader,
            { top: top + 5, left: 10, width: windowWidth - 10 },
          ]}
        >
          <ThemedView style={styles.contactDetailsPageHeaderContainer}>
            <ThemedView style={styles.closeActionContainer}>
              <IconButton
                icon="close"
                iconColor={Colors.light.background}
                size={25}
                onPress={handleClickClose}
              />
            </ThemedView>

            <ThemedView style={styles.favoriteAndMoreActionsContainer}>
              <IconButton
                icon="cards-heart"
                iconColor={Colors.light.background}
                size={25}
                onPress={() => console.log("Pressed")}
              />

              <IconButton
                icon="dots-vertical"
                iconColor={Colors.light.background}
                size={25}
                onPress={() => console.log("Pressed")}
              />
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  contactDetailsContainer: {
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  contactHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    flex: 1,
  },
  contactDetailsFormContainer: {
    marginTop: 25,
    rowGap: 20,
  },
  textInputContainer: {
    flex: 1,
  },
  contactDetailsPageHeader: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  contactDetailsPageHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  closeActionContainer: {
    backgroundColor: "transparent",
  },
  favoriteAndMoreActionsContainer: {
    flexDirection: "row",
    columnGap: 10,
    paddingHorizontal: 15,
    backgroundColor: "transparent",
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 0,
  },
});
