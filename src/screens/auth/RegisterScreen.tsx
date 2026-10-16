import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import { colors } from "../../constants/colors";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = () => {
    if (name.trim().length < 2) {
      Alert.alert("Invalid name", "Please enter your name.");
      return;
    }
    if (phone.length !== 10) {
      Alert.alert("Invalid number", "Enter a 10-digit phone number.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Mismatch", "Passwords do not match.");
      return;
    }
    // TODO: call backend register API here
    Alert.alert("Account created", "Please login now.");
    navigation.navigate("Login");
  };

  return (
    <AuthLayout
      greeting="Welcome!"
      subtitle="Create your Farmer Assistant account"
      panelTitle="Sign up"
    >
      <AuthInput
        icon="person-outline"
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      <AuthInput
        icon="call-outline"
        placeholder="Phone number"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />
      <AuthInput
        icon="lock-closed-outline"
        placeholder="Password"
        isPassword
        value={password}
        onChangeText={setPassword}
      />
      <AuthInput
        icon="lock-closed-outline"
        placeholder="Confirm password"
        isPassword
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.bottomLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.panelDark,
    height: 56,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  bottomText: { color: "#fff", fontSize: 15 },
  bottomLink: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
