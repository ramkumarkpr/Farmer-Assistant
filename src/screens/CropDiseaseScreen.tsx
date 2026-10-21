import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSwitch from "../components/LanguageSwitch";
import { colors } from "../constants/colors";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "CropDisease">;

const photoTips = [
  { icon: "sunny-outline", label: "cropDiseaseTipLight" },
  { icon: "scan-outline", label: "cropDiseaseTipClose" },
  { icon: "leaf-outline", label: "cropDiseaseTipSingle" },
] as const;

const severityStyle = {
  low: { color: "#3E7B27", bg: "#E4F2DC", label: "cropDiseaseSeverityLow" },
  medium: {
    color: "#B7791F",
    bg: "#FFF1D6",
    label: "cropDiseaseSeverityMedium",
  },
  high: { color: "#B83B3B", bg: "#FBE3E3", label: "cropDiseaseSeverityHigh" },
} as const;

const recentScans = [
  {
    id: "paddy",
    crop: "mandiCrop_paddy",
    disease: "cropDiseaseBlast",
    severity: "high",
    date: "cropDiseaseToday",
  },
  {
    id: "tomato",
    crop: "mandiCrop_tomato",
    disease: "cropDiseaseEarlyBlight",
    severity: "medium",
    date: "cropDiseaseYesterday",
  },
  {
    id: "groundnut",
    crop: "mandiCrop_groundnut",
    disease: "cropDiseaseLeafSpot",
    severity: "low",
    date: "cropDiseaseDaysAgo",
  },
] as const;

export default function CropDiseaseScreen({ navigation }: Props) {
  const { t } = useTranslation();

  // TODO: connect to expo-image-picker / your disease detection API
  const handleTakePhoto = () => {};
  const handlePickFromGallery = () => {};

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
            <Text style={styles.headerTitle}>{t("cropDiseaseTitle")}</Text>
            <Text style={styles.headerSubtitle}>
              {t("cropDiseaseSubtitle")}
            </Text>
          </View>
          <LanguageSwitch />
        </View>

        <View style={styles.scanCard}>
          <View style={styles.scanTopRow}>
            <View style={styles.scanCopy}>
              <Text style={styles.scanLabel}>{t("cropDiseaseScanLabel")}</Text>
              <Text style={styles.scanTitle}>{t("cropDiseaseScanTitle")}</Text>
            </View>
            <View style={styles.scanIconWrap}>
              <Ionicons name="scan" size={44} color="#FFD166" />
            </View>
          </View>
          <Text style={styles.scanDesc}>{t("cropDiseaseScanDesc")}</Text>
          <View style={styles.scanActions}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t("cropDiseaseTakePhoto")}
              onPress={handleTakePhoto}
              style={styles.primaryAction}
            >
              <Ionicons name="camera" size={20} color={colors.primary} />
              <Text style={styles.primaryActionText}>
                {t("cropDiseaseTakePhoto")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t("cropDiseaseGallery")}
              onPress={handlePickFromGallery}
              style={styles.secondaryAction}
            >
              <Ionicons name="images-outline" size={20} color="#fff" />
              <Text style={styles.secondaryActionText}>
                {t("cropDiseaseGallery")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("cropDiseasePhotoTipsTitle")}
          </Text>
        </View>
        <View style={styles.metricsRow}>
          {photoTips.map((tip) => (
            <TipCard key={tip.label} icon={tip.icon} label={t(tip.label)} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("cropDiseaseRecentTitle")}</Text>
          <Text style={styles.sectionCaption}>{t("cropDiseaseSample")}</Text>
        </View>
        <View style={styles.listCard}>
          {recentScans.map((item, index) => {
            const sev = severityStyle[item.severity];
            return (
              <View
                key={item.id}
                style={[
                  styles.scanRow,
                  index < recentScans.length - 1 && styles.scanRowBorder,
                ]}
              >
                <View style={styles.scanRowIcon}>
                  <Ionicons name="leaf" size={20} color={colors.primary} />
                </View>
                <View style={styles.scanRowCopy}>
                  <Text style={styles.scanRowCrop}>{t(item.crop)}</Text>
                  <Text style={styles.scanRowDisease}>{t(item.disease)}</Text>
                </View>
                <View
                  style={[styles.severityChip, { backgroundColor: sev.bg }]}
                >
                  <Text style={[styles.severityText, { color: sev.color }]}>
                    {t(sev.label)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.advisoryCard}>
          <View style={styles.advisoryIcon}>
            <Ionicons name="bulb-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.advisoryCopy}>
            <Text style={styles.advisoryTitle}>{t("cropDiseaseTipTitle")}</Text>
            <Text style={styles.advisoryText}>{t("cropDiseaseTip")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type TipCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

function TipCard({ icon, label }: TipCardProps) {
  return (
    <View style={styles.tipCard}>
      <Ionicons name={icon} size={24} color={colors.primary} />
      <Text style={styles.tipLabel}>{label}</Text>
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

  scanCard: {
    backgroundColor: colors.panelDark,
    borderRadius: 24,
    padding: 22,
    marginBottom: 25,
  },
  scanTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scanCopy: { flex: 1, paddingRight: 12 },
  scanLabel: { color: "#D6E8D2", fontSize: 13, fontWeight: "500" },
  scanTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
  },
  scanIconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  scanDesc: {
    color: "#E1F0D8",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
  },
  scanActions: {
    flexDirection: "row",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.18)",
    marginTop: 16,
    paddingTop: 16,
  },
  primaryAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 12,
  },
  primaryActionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 5,
    paddingVertical: 12,
  },
  secondaryActionText: { color: "#fff", fontSize: 14, fontWeight: "600" },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  sectionCaption: { color: colors.muted, fontSize: 12 },

  metricsRow: { flexDirection: "row", gap: 10, marginBottom: 25 },
  tipCard: {
    flex: 1,
    minHeight: 100,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  tipLabel: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },

  listCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  scanRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  scanRowBorder: { borderBottomWidth: 1, borderBottomColor: "#E8EEE5" },
  scanRowIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: "#E8F1E4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  scanRowCopy: { flex: 1 },
  scanRowCrop: { color: colors.text, fontSize: 14, fontWeight: "700" },
  scanRowDisease: { color: colors.muted, fontSize: 12, marginTop: 2 },
  severityChip: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  severityText: { fontSize: 11, fontWeight: "700" },

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
