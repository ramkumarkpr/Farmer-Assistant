import { ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/colors";

type Props = {
  greeting: string;
  subtitle: string;
  panelTitle: string;
  children: ReactNode;
};

export default function AuthLayout({
  greeting,
  subtitle,
  panelTitle,
  children,
}: Props) {
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {/* White top area */}
        <View style={styles.top}>
          <View style={styles.blobLeftDark} />
          <View style={styles.blobLeft} />
          <View style={styles.blobRightDark} />
          <View style={styles.blobRight} />

          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {/* Plant (replace with an image later) */}
          <View style={styles.plant}>
            <Ionicons name="leaf" size={78} color={colors.primary} />
            <View style={styles.pot} />
          </View>
        </View>

        {/* Green panel */}
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{panelTitle}</Text>
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#fff" },
  scroll: { flexGrow: 1 },

  top: {
    height: 290,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    paddingHorizontal: 32,
    paddingBottom: 90,
    zIndex: 1,
  },
  greeting: { fontSize: 44, color: colors.primary, fontWeight: "300" },
  subtitle: { fontSize: 14, color: colors.primary, marginTop: 2 },

  blobLeftDark: {
    position: "absolute",
    top: -50,
    left: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.blobDark,
  },
  blobLeft: {
    position: "absolute",
    top: -40,
    left: -40,
    width: 120,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.blobLight,
  },
  blobRightDark: {
    position: "absolute",
    top: -30,
    right: -50,
    width: 170,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.blobDark,
  },
  blobRight: {
    position: "absolute",
    top: 10,
    right: -30,
    width: 130,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.blobLight,
  },

  plant: {
    position: "absolute",
    right: 28,
    bottom: -40,
    alignItems: "center",
  },
  pot: {
    width: 38,
    height: 34,
    marginTop: -6,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    elevation: 3,
  },

  panel: {
    flexGrow: 1,
    backgroundColor: colors.panel,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    paddingHorizontal: 32,
    paddingTop: 28,
    paddingBottom: 32,
  },
  panelTitle: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "300",
    marginBottom: 28,
  },
});
