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
import { useEffect, useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Dropdown, DropdownInputProps } from "react-native-paper-dropdown";
import { router, useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/store/store";
import { selectToken, selectUserId } from "@/store/slices/authSlice";
import {
  useDeleteContactMutation,
  useEditContactMutation,
  useGetContactByIdQuery,
  useGetUserByIdQuery,
} from "@/store/slices/apiSlice";
import { DEFAULT_IMAGE } from "@/utils/constants";

const OPTIONS = [
  { label: "Work contact", value: "WORK" },
  { label: "Business contact", value: "BUSINESS" },
  { label: "Personal contact", value: "PERSONAL" },
  { label: "Other", value: "OTHER" },
];

export default function ContactDetailsScreen() {
  // General hooks
  const { top } = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  // Custom hooks
  const backgroundColor = useThemeColor({}, "background");
  const textInputBackgroundColor = useThemeColor({}, "textInput");
  const appBarColor = useThemeColor({}, "appBar");

  // Selectors
  const token = useAppSelector(selectToken);
  const userId = useAppSelector(selectUserId);

  // Queries
  const { data: contactData } = useGetContactByIdQuery({
    token,
    contactId: id,
  });

  const { data: userData } = useGetUserByIdQuery({ token, userId });

  // Mutations
  const [editContact] = useEditContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  // Other variables
  const { profileImageUri, fullName, phone, contactType, address, email } =
    contactData ?? {};

  const windowWidth = Dimensions.get("window").width;

  // State
  const [contactNameState, setContactNameState] = useState(fullName);
  const [contactPhoneState, setContactPhoneState] = useState(phone);
  const [contactTypeState, setContactTypeState] = useState<string | undefined>(
    contactType
  );
  const [contactAddressState, setContactAddressState] = useState(address);
  const [contactEmailState, setContactEmailState] = useState(email);

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
      formData.append("id", id as string);

      await editContact({ token, formData, contactId: id }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact({ token, contactId: id }).unwrap();

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Effects
  useEffect(() => {
    if (contactData) {
      setContactNameState(contactData?.fullName);
      setContactPhoneState(contactData?.phone);
      setContactTypeState(contactData?.contactType);
      setContactAddressState(contactData?.address);
      setContactEmailState(contactData?.email);
    }
  }, [contactData]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.background,
        dark: Colors.dark.background,
      }}
    >
      <SafeAreaView>
        <Image
          source={{ uri: profileImageUri ?? DEFAULT_IMAGE }}
          width={windowWidth}
          height={250}
        />

        <ThemedView style={styles.contactDetailsContainer}>
          <ThemedView style={styles.contactHeaderContainer}>
            <ThemedView>
              <Avatar.Image
                size={40}
                source={{ uri: profileImageUri ?? DEFAULT_IMAGE }}
              />
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

          <Button
            style={[styles.saveButton, { backgroundColor: "red" }]}
            mode="contained"
            onPress={handleDeleteContact}
          >
            DELETE
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
