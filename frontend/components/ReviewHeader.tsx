import { StyleSheet, Text, View } from "react-native";

type ReviewHeaderProps = {
  reviewedCount: number;
  totalCards: number;
};

export default function ReviewHeader({
  reviewedCount,
  totalCards,
}: ReviewHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {Math.max(totalCards - reviewedCount, 0)} left
          </Text>
        </View>

        <View>
          <Text style={styles.eyebrow}>
            Focus Session
          </Text>
          <Text style={styles.title}>
            Review
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    gap: 12,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#667085",
    fontSize: 12,
    fontWeight: "500",
  },
  eyebrow: {
    color: "#667085",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    marginTop: 8,
    color: "#243042",
    fontSize: 30,
    fontWeight: "700",
  },
});
