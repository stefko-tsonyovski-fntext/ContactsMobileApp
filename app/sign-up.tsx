import { useSession } from "@/auth/auth-context";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";

export default function SignUp() {
  // Custom hooks
  const { signIn } = useSession();
  const appBarColor = useThemeColor({}, "appBar");
  const primaryColor = useThemeColor({}, "primary");

  // State
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Handlers
  const handleSignUp = () => {
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };

  const handleNavigateSignIn = () => {
    signIn();
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/sign-in");
  };

  return (
    <ThemedView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            Sign In
          </Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            autoCapitalize="none"
            autoComplete="name"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
            autoComplete="password"
          />

          <Button
            mode="contained"
            onPress={handleSignUp}
            style={[
              styles.button,
              {
                backgroundColor: appBarColor,
              },
            ]}
          >
            Sign Up
          </Button>

          <TouchableOpacity
            onPress={handleNavigateSignIn}
            style={styles.signUpLink}
          >
            <Text variant="bodyMedium" style={{ color: primaryColor }}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
    borderRadius: 0,
  },
  signUpLink: {
    marginTop: 20,
    alignItems: "center",
  },
});
