import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSwitch from "../components/LanguageSwitch";
import { colors } from "../constants/colors";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Weather">;

const forecast = [
  { day: "weatherToday", icon: "partly-sunny-outline", high: 32, low: 24 },
  { day: "weatherTomorrow", icon: "sunny-outline", high: 33, low: 25 },
  { day: "weatherDayThree", icon: "rainy-outline", high: 30, low: 23 },
  { day: "weatherDayFour", icon: "cloudy-outline", high: 31, low: 24 },
  { day: "weatherDayFive", icon: "sunny-outline", high: 34, low: 25 },
] as const;

export default function WeatherScreen({ navigation }: Props) {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("weatherBack")}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{t("weatherTitle")}</Text>
            <Text style={styles.headerSubtitle}>{t("weatherDemoLabel")}</Text>
          </View>
          <LanguageSwitch />
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={18} color={colors.primary} />
          <Text style={styles.location}>{t("weatherLocation")}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.muted} />
        </View>

        <View style={styles.currentCard}>
          <View style={styles.currentTopRow}>
            <View>
              <Text style={styles.currentLabel}>{t("weatherCurrent")}</Text>
              <Text style={styles.condition}>{t("weatherCondition")}</Text>
            </View>
            <View style={styles.weatherIconWrap}>
              <Ionicons name="partly-sunny" size={58} color="#FFD166" />
            </View>
          </View>
          <View style={styles.temperatureRow}>
            <Text style={styles.temperature}>28°</Text>
            <View style={styles.temperatureDivider} />
            <View>
              <Text style={styles.highLow}>{t("weatherHigh")} 32°</Text>
              <Text style={styles.highLow}>{t("weatherLow")} 24°</Text>
            </View>
          </View>
          <View style={styles.sunriseRow}>
            <Ionicons name="time-outline" size={16} color="#E1F0D8" />
            <Text style={styles.sunriseText}>{t("weatherFeelsLike")}</Text>
            <View style={styles.sunriseDot} />
            <Text style={styles.sunriseText}>{t("weatherUpdated")}</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard
            icon="rainy-outline"
            label={t("weatherRain")}
            value="20%"
          />
          <MetricCard
            icon="water-outline"
            label={t("weatherHumidity")}
            value="68%"
          />
          <MetricCard
            icon="leaf-outline"
            label={t("weatherWind")}
            value="12 km/h"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("weatherForecastTitle")}</Text>
          <Text style={styles.sectionCaption}>{t("weatherFiveDays")}</Text>
        </View>
        <View style={styles.forecastCard}>
          {forecast.map((item, index) => (
            <View
              key={item.day}
              style={[
                styles.forecastDay,
                index < forecast.length - 1 && styles.forecastDayBorder,
              ]}
            >
              <Text style={styles.forecastLabel}>{t(item.day)}</Text>
              <Ionicons
                name={item.icon}
                size={25}
                color={item.icon === "rainy-outline" ? "#4A90A4" : colors.primary}
                style={styles.forecastIcon}
              />
              <Text style={styles.forecastTemps}>
                {item.high}° <Text style={styles.forecastLow}>{item.low}°</Text>
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.advisoryCard}>
          <View style={styles.advisoryIcon}>
            <Ionicons name="bulb-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.advisoryCopy}>
            <Text style={styles.advisoryTitle}>{t("weatherTipTitle")}</Text>
            <Text style={styles.advisoryText}>{t("weatherTip")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type MetricCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function MetricCard({ icon, label, value }: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <Ionicons name={icon} size={21} color={colors.primary} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 32 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleWrap: { flex: 1, marginLeft: 12 },
  headerTitle: { color: colors.primary, fontSize: 20, fontWeight: "700" },
  headerSubtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
    paddingLeft: 2,
  },
  location: { color: colors.text, fontSize: 15, fontWeight: "600" },
  currentCard: {
    backgroundColor: colors.panelDark,
    borderRadius: 24,
    padding: 22,
    marginBottom: 14,
  },
  currentTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentLabel: { color: "#D6E8D2", fontSize: 13, fontWeight: "500" },
  condition: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  weatherIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  temperatureRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  temperature: {
    color: "#fff",
    fontSize: 64,
    lineHeight: 74,
    fontWeight: "300",
    letterSpacing: -3,
  },
  temperatureDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginHorizontal: 16,
  },
  highLow: { color: "#E1F0D8", fontSize: 14, lineHeight: 22 },
  sunriseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.18)",
    marginTop: 14,
    paddingTop: 14,
  },
  sunriseText: { color: "#E1F0D8", fontSize: 12 },
  sunriseDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#E1F0D8",
    marginHorizontal: 2,
  },
  metricsRow: { flexDirection: "row", gap: 10, marginBottom: 25 },
  metricCard: {
    flex: 1,
    minHeight: 100,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  metricValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 7,
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 3,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  sectionCaption: { color: colors.muted, fontSize: 12 },
  forecastCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 6,
    marginBottom: 16,
  },
  forecastDay: { flex: 1, alignItems: "center" },
  forecastDayBorder: { borderRightWidth: 1, borderRightColor: "#E8EEE5" },
  forecastLabel: { color: colors.muted, fontSize: 11 },
  forecastIcon: { marginVertical: 12 },
  forecastTemps: { color: colors.text, fontSize: 12, fontWeight: "700" },
  forecastLow: { color: "#929A90", fontWeight: "400" },
  advisoryCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8F1E4",
    borderRadius: 18,
    padding: 16,
  },
  advisoryIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  advisoryCopy: { flex: 1 },
  advisoryTitle: { color: colors.primary, fontSize: 14, fontWeight: "700" },
  advisoryText: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
});
