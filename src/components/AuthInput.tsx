import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

type Props = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
};

export default function AuthInput({ icon, isPassword, ...rest }: Props) {
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrapper}>
      <Ionicons name={icon} size={22} color="#777" />
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        secureTextEntry={isPassword && hidden}
        {...rest}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setHidden(!hidden)}>
          <Ionicons
            name={hidden ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#777"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    height: 56,
    paddingHorizontal: 18,
    marginBottom: 16,
    gap: 10,
  },
  input: { flex: 1, fontSize: 17, color: colors.text },
});
