import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Avatar, TextInput } from "react-native-paper";
import { renderContactType } from "@/components/contacts/ContactsCard";
import { Contact } from "@/components/contacts/ContactsList";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dropdown, DropdownInputProps } from "react-native-paper-dropdown";

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
  // Custom hooks
  const backgroundColor = useThemeColor({}, "background");
  const textInputBackgroundColor = useThemeColor({}, "textInput");

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
});
