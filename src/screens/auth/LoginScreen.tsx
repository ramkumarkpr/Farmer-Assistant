import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AuthInput from "../../components/AuthInput";
import AuthLayout from "../../components/AuthLayout";
import { colors } from "../../constants/colors";
import { RootStackParamList } from "../../types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (phone.length !== 10) {
      Alert.alert("Invalid number", "Enter a 10-digit phone number.");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Invalid password",
        "Password must be at least 6 characters.",
      );
      return;
    }
    // TODO: call backend login API here
    navigation.replace("Home");
  };

  return (
    <AuthLayout
      greeting="Hello!"
      subtitle="Welcome to Farmer Assistant"
      panelTitle="Login"
    >
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

      <TouchableOpacity style={styles.forgot}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or login with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        {(["logo-facebook", "logo-google", "logo-apple"] as const).map((n) => (
          <TouchableOpacity key={n} style={styles.socialButton}>
            <Ionicons name={n} size={26} color="#222" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.bottomLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: "flex-end", marginTop: -6, marginBottom: 18 },
  forgotText: { color: "#fff", fontSize: 14 },
  button: {
    backgroundColor: colors.panelDark,
    height: 56,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "600" },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 22,
    gap: 10,
  },
  line: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.5)" },
  dividerText: { color: "#fff", fontSize: 14 },
  socialRow: { flexDirection: "row", justifyContent: "center", gap: 18 },
  socialButton: {
    width: 56,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  bottomText: { color: "#fff", fontSize: 15 },
  bottomLink: { color: "#fff", fontSize: 15, fontWeight: "bold" },
});
