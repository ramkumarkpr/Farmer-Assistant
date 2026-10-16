import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type Props = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
};

export default function BigButton({ label, icon, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[47%] aspect-square bg-white rounded-2xl items-center justify-center mb-4 shadow"
    >
      <Ionicons name={icon} size={48} color="#2e7d32" />
      <Text className="mt-2 text-lg font-semibold text-center">{label}</Text>
    </TouchableOpacity>
  );
}
