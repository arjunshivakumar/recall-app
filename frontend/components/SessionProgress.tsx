import { Text, View } from "react-native";

type SessionProgressProps = {
  currentCard: number;
  totalCards: number;
  progress: number;
};

export default function SessionProgress({
  currentCard,
  totalCards,
  progress,
}: SessionProgressProps) {
  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm font-medium text-muted">
          Card {currentCard} of {totalCards}
        </Text>
        <Text className="text-sm font-semibold text-ink">
          {Math.round(progress * 100)}%
        </Text>
      </View>

      <View className="h-2 rounded-full bg-[#E6EBF5]">
        <View
          className="h-2 rounded-full bg-accent"
          style={{ width: `${Math.max(progress * 100, 8)}%` }}
        />
      </View>
    </View>
  );
}
