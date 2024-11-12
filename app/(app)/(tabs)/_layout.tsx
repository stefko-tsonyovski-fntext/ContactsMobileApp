import { Tabs, useSegments } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  // General hooks
  const tabBarActiveTintColor = useThemeColor({}, "tint");
  const tabBarBackgroundColor = useThemeColor({}, "appBar");
  const addButtonColor = useThemeColor({}, "addButton");
  const segment = useSegments();

  // Other variables
  // get the current page from the segment
  const page = segment[segment.length - 1];
  // create an array of list pages you want to hide the tab bar in
  const pagesToHideTabBar = ["new-contact"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        headerShown: false,
        tabBarActiveBackgroundColor: tabBarBackgroundColor,
        tabBarInactiveBackgroundColor: tabBarBackgroundColor,
        tabBarStyle: {
          flexDirection: "row",
          justifyContent: "flex-start",
          display: pagesToHideTabBar.includes(page) ? "none" : "flex",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Contacts",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "mail" : "mail-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="new-contact"
        options={{
          title: "New Contact",
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <ThemedView
              lightColor={addButtonColor}
              darkColor={addButtonColor}
              style={styles.addButtonContainer}
            >
              <Image
                source={require("../../../assets/images/add.png")}
                style={[styles.addImage, { tintColor: tabBarActiveTintColor }]}
              />
            </ThemedView>
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              disabled={true}
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    bottom: 20, // space from bottombar
    height: 58,
    width: 58,
    borderRadius: 58,
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    width: 40,
    height: 40,
    alignContent: "center",
  },
});
