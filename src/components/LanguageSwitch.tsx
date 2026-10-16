import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../constants/colors";
import { useTranslation } from "react-i18next";

export default function LanguageSwitch() {
  const { i18n } = useTranslation();

  const options = [
    { code: "ta", label: "தமிழ்" },
    { code: "en", label: "English" },
  ];

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = i18n.language === option.code;
        return (
          <TouchableOpacity
            key={option.code}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => i18n.changeLanguage(option.code)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  chipActive: { backgroundColor: colors.primary },
  chipText: { color: colors.primary, fontSize: 16 },
  chipTextActive: { color: "#fff" },
});
