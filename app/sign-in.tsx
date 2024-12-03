import { useSession } from "@/auth/auth-context";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLoginMutation } from "@/store/slices/apiSlice";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Card, Text } from "react-native-paper";

export default function SignIn() {
  // Custom hooks
  const { signIn } = useSession();
  const appBarColor = useThemeColor({}, "appBar");
  const primaryColor = useThemeColor({}, "primary");

  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mutations
  const [login] = useLoginMutation();

  // Handlers
  const handleSignIn = async () => {
    try {
      const body = { email, password };
      const response = await login({ body }).unwrap();

      signIn(response);
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigateSignUp = () => {
    router.replace("/sign-up");
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
            onPress={handleSignIn}
            style={[
              styles.button,
              {
                backgroundColor: appBarColor,
              },
            ]}
          >
            Sign In
          </Button>

          <TouchableOpacity
            onPress={handleNavigateSignUp}
            style={styles.signUpLink}
          >
            <Text variant="bodyMedium" style={{ color: primaryColor }}>
              Don’t have an account? Sign Up
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
