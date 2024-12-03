import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import {
  Avatar,
  Button,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dropdown, DropdownInputProps } from "react-native-paper-dropdown";
import { router } from "expo-router";
import { useAppSelector } from "@/store/store";
import { selectToken, selectUserId } from "@/store/slices/authSlice";
import {
  useCreateContactMutation,
  useGetUserByIdQuery,
} from "@/store/slices/apiSlice";

const OPTIONS = [
  { label: "Work contact", value: "WORK" },
  { label: "Business contact", value: "BUSINESS" },
  { label: "Personal contact", value: "PERSONAL" },
  { label: "Other", value: "OTHER" },
];

export default function NewContactScreen() {
  // General hooks
  const { top } = useSafeAreaInsets();

  // Custom hooks
  const backgroundColor = useThemeColor({}, "background");
  const textInputBackgroundColor = useThemeColor({}, "textInput");
  const appBarColor = useThemeColor({}, "appBar");

  // Selectors
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);

  // Queries
  const { data: userData } = useGetUserByIdQuery({ token, userId });

  // Mutations
  const [createContact] = useCreateContactMutation();

  // Other variables
  const windowWidth = Dimensions.get("window").width;

  // State
  const [contactNameState, setContactNameState] = useState("");
  const [contactPhoneState, setContactPhoneState] = useState("");
  const [contactTypeState, setContactTypeState] = useState<
    string | undefined
  >();
  const [contactAddressState, setContactAddressState] = useState("");
  const [contactEmailState, setContactEmailState] = useState("");

  // Other variables
  const value =
    OPTIONS?.find((option) => option.value === contactTypeState)?.label ?? "";

  // Handlers
  const handleClickClose = () => router.push("/");

  const handleSaveContact = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", contactNameState);
      formData.append("phone", contactPhoneState);
      formData.append("contactType", contactTypeState as string);
      formData.append("address", contactAddressState ?? "");
      formData.append("email", contactEmailState ?? "");
      formData.append("userId", userData?.id);

      await createContact({ token, formData }).unwrap();

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
    >
      <SafeAreaView>
        <ThemedView style={styles.topSpace}></ThemedView>

        <ThemedView style={styles.contactDetailsContainer}>
          <ThemedView style={styles.contactDetailsFormContainer}>
            <Text variant="titleLarge" style={styles.title}>
              New Contact
            </Text>

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
                  keyboardType="phone-pad"
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
                  keyboardType="email-address"
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
            onPress={handleSaveContact}
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
                iconColor={Colors.light.text}
                size={25}
                onPress={handleClickClose}
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
  },
  contactDetailsPageHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeActionContainer: {},
  saveButton: {
    marginTop: 20,
    borderRadius: 0,
  },
  topSpace: {
    height: 150,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
