import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LanguageSwitch from "../components/LanguageSwitch";
import { colors } from "../constants/colors";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "MandiPrice">;
type Category = "all" | "vegetables" | "grains" | "pulses";

const categories: Category[] = ["all", "vegetables", "grains", "pulses"];

const marketPrices = [
  {
    name: "tomato",
    category: "vegetables",
    price: "₹24",
    change: "+8%",
    direction: "up",
    icon: "nutrition-outline",
    color: "#E76F51",
  },
  {
    name: "onion",
    category: "vegetables",
    price: "₹32",
    change: "-4%",
    direction: "down",
    icon: "nutrition-outline",
    color: "#A875B5",
  },
  {
    name: "paddy",
    category: "grains",
    price: "₹200",
    change: "+2%",
    direction: "up",
    icon: "leaf-outline",
    color: colors.primary,
  },
  {
    name: "maize",
    category: "grains",
    price: "₹250",
    change: "+1%",
    direction: "up",
    icon: "leaf-outline",
    color: "#D39A37",
  },
  {
    name: "groundnut",
    category: "pulses",
    price: "₹400",
    change: "-1%",
    direction: "down",
    icon: "ellipse-outline",
    color: "#956B4B",
  },
] as const;

export default function MandiPriceScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [search, setSearch] = useState("");

  const filteredPrices = marketPrices.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = t(`mandiCrop_${item.name}`)
      .toLocaleLowerCase()
      .includes(search.trim().toLocaleLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("weatherBack")}
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{t("mandiTitle")}</Text>
            <Text style={styles.subtitle}>{t("mandiSubtitle")}</Text>
          </View>
          <View style={styles.marketIcon}>
            <Ionicons
              name="storefront-outline"
              size={22}
              color={colors.primary}
            />
          </View>
        </View>

        <View style={styles.languageRow}>
          <LanguageSwitch />
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <Ionicons name="location" size={19} color={colors.primary} />
          </View>
          <View style={styles.locationCopy}>
            <Text style={styles.locationLabel}>{t("mandiMarketLabel")}</Text>
            <Text style={styles.locationName}>{t("mandiMarketName")}</Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t("mandiChangeMarket")}
            style={styles.changeMarketButton}
          >
            <Text style={styles.changeMarketText}>
              {t("mandiChangeMarket")}
            </Text>
            <Ionicons name="chevron-forward" size={15} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryTop}>
            <View>
              <Text style={styles.summaryLabel}>{t("mandiTodayLabel")}</Text>
              <Text style={styles.summaryTitle}>{t("mandiMarketUpdate")}</Text>
            </View>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>{t("mandiSample")}</Text>
            </View>
          </View>
          <View style={styles.summaryBottom}>
            <View style={styles.summaryMetric}>
              <Text style={styles.summaryValue}>{marketPrices.length}</Text>
              <Text style={styles.summaryMetricLabel}>
                {t("mandiCommodities")}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryMetric}>
              <Text style={styles.summaryValue}>₹2,180</Text>
              <Text style={styles.summaryMetricLabel}>
                {t("mandiTopPrice")}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("mandiPricesTitle")}</Text>
          <Text style={styles.dateText}>{t("mandiTodayDate")}</Text>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={colors.muted} />
          <TextInput
            accessibilityLabel={t("mandiSearch")}
            placeholder={t("mandiSearch")}
            placeholderTextColor="#8A9188"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t("mandiClearSearch")}
              onPress={() => setSearch("")}
            >
              <Ionicons name="close-circle" size={20} color={colors.muted} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {categories.map((category) => {
            const selected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  selected && styles.categoryChipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextSelected,
                  ]}
                >
                  {t(`mandiCategory_${category}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.priceListHeader}>
          <Text style={styles.listHeaderText}>{t("mandiCommodity")}</Text>
          <Text style={[styles.listHeaderText, styles.priceColumn]}>
            {t("mandiPriceUnit")}
          </Text>
        </View>

        {filteredPrices.length > 0 ? (
          filteredPrices.map((item) => (
            <View key={item.name} style={styles.priceCard}>
              <View
                style={[
                  styles.cropIcon,
                  { backgroundColor: `${item.color}18` },
                ]}
              >
                <Ionicons name={item.icon} size={23} color={item.color} />
              </View>
              <View style={styles.cropCopy}>
                <Text style={styles.cropName}>
                  {t(`mandiCrop_${item.name}`)}
                </Text>
                <Text style={styles.cropCategory}>
                  {t(`mandiCategory_${item.category}`)}
                </Text>
              </View>
              <View style={styles.priceCopy}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.priceUnit}>{t("mandiPerKg")}</Text>
              </View>
              <View
                style={[
                  styles.changeBadge,
                  item.direction === "down" && styles.changeBadgeDown,
                ]}
              >
                <Ionicons
                  name={
                    item.direction === "up" ? "trending-up" : "trending-down"
                  }
                  size={13}
                  color={item.direction === "up" ? colors.primary : "#C75146"}
                />
                <Text
                  style={[
                    styles.changeText,
                    item.direction === "down" && styles.changeTextDown,
                  ]}
                >
                  {item.change}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={28} color={colors.muted} />
            <Text style={styles.emptyText}>{t("mandiNoResults")}</Text>
          </View>
        )}

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <Ionicons name="bulb-outline" size={21} color={colors.primary} />
          </View>
          <View style={styles.tipCopy}>
            <Text style={styles.tipTitle}>{t("mandiTipTitle")}</Text>
            <Text style={styles.tipText}>{t("mandiTip")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 32 },
  topRow: { flexDirection: "row", alignItems: "center" },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: { flex: 1, marginLeft: 12 },
  title: { color: colors.primary, fontSize: 20, fontWeight: "700" },
  subtitle: { color: colors.muted, fontSize: 12, marginTop: 2 },
  marketIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E7F0E4",
    alignItems: "center",
    justifyContent: "center",
  },
  languageRow: { alignItems: "flex-end", marginTop: 12, marginBottom: 18 },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#E7F0E4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  locationCopy: { flex: 1 },
  locationLabel: { color: colors.muted, fontSize: 11 },
  locationName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 3,
  },
  changeMarketButton: { flexDirection: "row", alignItems: "center", gap: 2 },
  changeMarketText: { color: colors.primary, fontSize: 12, fontWeight: "600" },
  summaryCard: {
    backgroundColor: colors.panelDark,
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
  },
  summaryTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  summaryLabel: { color: "#D6E8D2", fontSize: 12 },
  summaryTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 4,
  },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FFD166" },
  liveText: { color: "#fff", fontSize: 10, fontWeight: "600" },
  summaryBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.18)",
  },
  summaryMetric: { flex: 1 },
  summaryValue: { color: "#fff", fontSize: 17, fontWeight: "700" },
  summaryMetricLabel: { color: "#D6E8D2", fontSize: 10, marginTop: 4 },
  summaryDivider: {
    width: 1,
    height: 33,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: 9,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 12,
  },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  dateText: { color: colors.muted, fontSize: 11 },
  searchBox: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 15,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    paddingVertical: 10,
    marginLeft: 9,
  },
  categoryList: { gap: 8, paddingBottom: 18 },
  categoryChip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: "#E3EADF",
  },
  categoryChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  categoryTextSelected: { color: "#fff" },
  priceListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  listHeaderText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  priceColumn: { marginRight: 70 },
  priceCard: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 17,
    paddingHorizontal: 12,
    paddingVertical: 11,
    marginBottom: 9,
  },
  cropIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cropCopy: { flex: 1, minWidth: 65 },
  cropName: { color: colors.text, fontSize: 14, fontWeight: "700" },
  cropCategory: { color: colors.muted, fontSize: 10, marginTop: 4 },
  priceCopy: { alignItems: "flex-end", marginRight: 10 },
  price: { color: colors.text, fontSize: 14, fontWeight: "700" },
  priceUnit: { color: colors.muted, fontSize: 9, marginTop: 3 },
  changeBadge: {
    minWidth: 53,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#EAF3E7",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  changeBadgeDown: { backgroundColor: "#FBECE9" },
  changeText: { color: colors.primary, fontSize: 10, fontWeight: "700" },
  changeTextDown: { color: "#C75146" },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderRadius: 17,
    minHeight: 110,
    gap: 8,
  },
  emptyText: { color: colors.muted, fontSize: 13 },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E8F1E4",
    borderRadius: 18,
    padding: 15,
    marginTop: 8,
  },
  tipIcon: {
    width: 37,
    height: 37,
    borderRadius: 13,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  tipCopy: { flex: 1 },
  tipTitle: { color: colors.primary, fontSize: 13, fontWeight: "700" },
  tipText: { color: colors.text, fontSize: 12, lineHeight: 18, marginTop: 4 },
});
