import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BigButton from "../components/BigButton";
import LanguageSwitch from "../components/LanguageSwitch";
import { colors } from "../constants/colors";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const handleLogout = () => {
    // TODO: clear saved token here later
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t("greeting")}</Text>
          <Text style={styles.title}>{t("appName")}</Text>
        </View>
        <LanguageSwitch />
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        <BigButton
          label={t("weather")}
          icon="partly-sunny"
          onPress={() => {}}
        />
        <BigButton
          label={t("mandiPrices")}
          icon="pricetag"
          onPress={() => {}}
        />
        <BigButton label={t("diseaseScan")} icon="leaf" onPress={() => {}} />
        <BigButton label={t("camera")} icon="camera" onPress={() => {}} />
        <BigButton label={t("calendar")} icon="calendar" onPress={() => {}} />
        <BigButton
          label={t("farmingLands")}
          icon="sparkles"
          onPress={() => {}}
        />
        <BigButton
          label={t("fertilizerDetails")}
          icon="settings"
          onPress={() => {}}
        />
        <BigButton label={t("settings")} icon="settings" onPress={() => {}} />
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#fff" />
        <Text style={styles.logoutText}>{t("logout")}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: { fontSize: 12, color: colors.muted },
  title: { fontSize: 14, fontWeight: "bold", color: colors.primary },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0c6e28",
    padding: 14,
    borderRadius: 10,
  },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
