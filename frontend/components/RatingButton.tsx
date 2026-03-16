import { Pressable, StyleSheet, Text, View } from "react-native";

type RatingButtonProps = {
  label: string;
  emphasis: number;
  onPress: () => void;
};

export default function RatingButton({
  label,
  emphasis,
  onPress,
}: RatingButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : styles.default]}
    >
      <View style={styles.row}>
        <View style={[styles.dot, { opacity: emphasis }]} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "48%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8DFEA",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#4A7CFF",
  },
  label: {
    color: "#243042",
    fontSize: 16,
    fontWeight: "700",
  },
  default: {
    transform: [{ scale: 1 }],
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
});
