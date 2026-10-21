import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
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

type Props = NativeStackScreenProps<RootStackParamList, "Calendar">;

type EventType = "irrigation" | "fertilizer" | "spray" | "harvest";

const eventMeta: Record<
  EventType,
  { icon: keyof typeof Ionicons.glyphMap; label: string; color: string }
> = {
  irrigation: {
    icon: "water-outline",
    label: "calendarEventIrrigation",
    color: "#4A90A4",
  },
  fertilizer: {
    icon: "flask-outline",
    label: "calendarEventFertilizer",
    color: "#7A9E3B",
  },
  spray: {
    icon: "bug-outline",
    label: "calendarEventSpray",
    color: "#B7791F",
  },
  harvest: {
    icon: "basket-outline",
    label: "calendarEventHarvest",
    color: "#B83B3B",
  },
};

// Sample tasks, placed relative to today so the demo always shows something.
const sampleEvents: { offset: number; type: EventType }[] = [
  { offset: 0, type: "irrigation" },
  { offset: 2, type: "fertilizer" },
  { offset: 4, type: "spray" },
  { offset: 7, type: "irrigation" },
  { offset: 10, type: "harvest" },
  { offset: -3, type: "fertilizer" },
];

const dateKey = (d: Date) =>
  `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

export default function CalendarScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language?.startsWith("ta") ? "ta-IN" : "en-IN";

  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState<Date>(today);

  const eventsByDay = useMemo(() => {
    const map: Record<string, EventType[]> = {};
    sampleEvents.forEach(({ offset, type }) => {
      const d = new Date(today);
      d.setDate(today.getDate() + offset);
      const key = dateKey(d);
      map[key] = [...(map[key] ?? []), type];
    });
    return map;
  }, [today]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();

  const cells: (number | null)[] = [
    ...Array<null>(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  // 2024-01-07 is a Sunday
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 7 + i).toLocaleDateString(locale, { weekday: "short" }),
  );

  const monthLabel = viewDate.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });
  const selectedLabel = selected.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const changeMonth = (delta: number) =>
    setViewDate(new Date(year, month + delta, 1));

  const selectedEvents = eventsByDay[dateKey(selected)] ?? [];

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
            <Text style={styles.headerTitle}>{t("calendarTitle")}</Text>
            <Text style={styles.headerSubtitle}>{t("calendarSubtitle")}</Text>
          </View>
          <LanguageSwitch />
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.monthRow}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t("calendarPrevMonth")}
              onPress={() => changeMonth(-1)}
              style={styles.monthButton}
            >
              <Ionicons name="chevron-back" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{monthLabel}</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={t("calendarNextMonth")}
              onPress={() => changeMonth(1)}
              style={styles.monthButton}
            >
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekRow}>
            {weekdays.map((w, i) => (
              <Text key={i} style={styles.weekday}>
                {w}
              </Text>
            ))}
          </View>

          <View style={styles.grid}>
            {cells.map((day, index) => {
              if (day === null) return <View key={index} style={styles.cell} />;
              const date = new Date(year, month, day);
              const key = dateKey(date);
              const isSelected = key === dateKey(selected);
              const isToday = key === dateKey(today);
              const hasEvents = !!eventsByDay[key];
              return (
                <View key={index} style={styles.cell}>
                  <TouchableOpacity
                    accessibilityRole="button"
                    onPress={() => setSelected(date)}
                    style={[
                      styles.dayButton,
                      isToday && styles.dayToday,
                      isSelected && styles.daySelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && styles.dayTextSelected,
                      ]}
                    >
                      {day}
                    </Text>
                    {hasEvents && (
                      <View
                        style={[
                          styles.eventDot,
                          isSelected && styles.eventDotSelected,
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>{t("calendarLegend")}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t("calendarEventsTitle")}</Text>
          <Text style={styles.sectionCaption}>{selectedLabel}</Text>
        </View>
        <View style={styles.listCard}>
          {selectedEvents.length === 0 ? (
            <View style={styles.emptyWrap}>
              <Ionicons
                name="calendar-outline"
                size={26}
                color={colors.muted}
              />
              <Text style={styles.emptyText}>{t("calendarNoEvents")}</Text>
            </View>
          ) : (
            selectedEvents.map((type, index) => {
              const meta = eventMeta[type];
              return (
                <View
                  key={`${type}-${index}`}
                  style={[
                    styles.eventRow,
                    index < selectedEvents.length - 1 && styles.eventRowBorder,
                  ]}
                >
                  <View
                    style={[
                      styles.eventIcon,
                      { backgroundColor: `${meta.color}22` },
                    ]}
                  >
                    <Ionicons name={meta.icon} size={20} color={meta.color} />
                  </View>
                  <View style={styles.eventCopy}>
                    <Text style={styles.eventTitle}>{t(meta.label)}</Text>
                    <Text style={styles.eventSub}>{t("calendarSample")}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <View style={styles.advisoryCard}>
          <View style={styles.advisoryIcon}>
            <Ionicons name="bulb-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.advisoryCopy}>
            <Text style={styles.advisoryTitle}>{t("calendarTipTitle")}</Text>
            <Text style={styles.advisoryText}>{t("calendarTip")}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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

  calendarCard: {
    backgroundColor: colors.panelDark,
    borderRadius: 24,
    padding: 18,
    marginBottom: 25,
  },
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  monthButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  monthLabel: { color: "#fff", fontSize: 17, fontWeight: "600" },
  weekRow: { flexDirection: "row", marginBottom: 6 },
  weekday: {
    width: "14.2857%",
    textAlign: "center",
    color: "#D6E8D2",
    fontSize: 11,
    fontWeight: "500",
  },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: {
    width: "14.2857%",
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  dayButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  dayToday: { borderWidth: 1, borderColor: "rgba(255,255,255,0.55)" },
  daySelected: { backgroundColor: "#fff", borderColor: "#fff" },
  dayText: { color: "#fff", fontSize: 14, fontWeight: "500" },
  dayTextSelected: { color: colors.primary, fontWeight: "700" },
  eventDot: {
    position: "absolute",
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFD166",
  },
  eventDotSelected: { backgroundColor: colors.primary },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.18)",
    marginTop: 10,
    paddingTop: 14,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFD166",
  },
  legendText: { color: "#E1F0D8", fontSize: 12 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: "700" },
  sectionCaption: {
    color: colors.muted,
    fontSize: 12,
    flexShrink: 1,
    marginLeft: 12,
  },

  listCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  eventRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  eventRowBorder: { borderBottomWidth: 1, borderBottomColor: "#E8EEE5" },
  eventIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  eventCopy: { flex: 1 },
  eventTitle: { color: colors.text, fontSize: 14, fontWeight: "700" },
  eventSub: { color: colors.muted, fontSize: 12, marginTop: 2 },
  emptyWrap: { alignItems: "center", paddingVertical: 26, gap: 8 },
  emptyText: { color: colors.muted, fontSize: 13 },

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
