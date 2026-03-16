import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type FlashCardProps = {
  question: string;
  answer: string;
  showAnswer: boolean;
};

export default function FlashCard({
  question,
  answer,
  showAnswer,
}: FlashCardProps) {
  const progress = useRef(new Animated.Value(showAnswer ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: showAnswer ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [progress, showAnswer]);

  const frontScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.985],
  });

  const backScale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.985, 1],
  });

  const frontTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const backTranslate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 0],
  });

  const frontOpacity = progress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [1, 0.12, 0],
  });

  const backOpacity = progress.interpolate({
    inputRange: [0, 0.55, 1],
    outputRange: [0, 0.12, 1],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.cardFrame}>
        <Animated.View
          style={[
            styles.face,
            styles.frontFace,
            {
              opacity: frontOpacity,
              transform: [{ translateY: frontTranslate }, { scale: frontScale }],
            },
          ]}
          pointerEvents={showAnswer ? "none" : "auto"}
        >
          <View style={styles.inner}>
            <View style={styles.topBlock}>
              <Text style={styles.promptLabel}>
                Prompt
              </Text>
              <Text style={styles.promptText}>
                {question}
              </Text>
            </View>

            <Text style={styles.helperText}>
              Recall the idea in your own words before flipping the card.
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.face,
            styles.backFace,
            {
              opacity: backOpacity,
              transform: [{ translateY: backTranslate }, { scale: backScale }],
            },
          ]}
          pointerEvents={showAnswer ? "auto" : "none"}
        >
          <View style={styles.inner}>
            <View style={styles.topBlock}>
              <Text style={styles.answerLabel}>
                Answer
              </Text>
              <Text style={styles.answerText}>
                {answer}
              </Text>
            </View>

            <View style={styles.answerHintCard}>
              <Text style={styles.helperText}>
                Rate how easily this came to mind so the next review feels right.
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  cardFrame: {
    height: 320,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  face: {
    position: "absolute",
    inset: 0,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    elevation: 6,
  },
  frontFace: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  backFace: {
    borderWidth: 1,
    borderColor: "#D7E3FF",
    backgroundColor: "#F8FBFF",
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
  },
  topBlock: {
    gap: 12,
  },
  promptLabel: {
    color: "#667085",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  answerLabel: {
    color: "#4E6AA6",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  promptText: {
    color: "#243042",
    fontSize: 30,
    fontWeight: "700",
    lineHeight: 40,
  },
  answerText: {
    color: "#243042",
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 38,
  },
  helperText: {
    color: "#667085",
    fontSize: 14,
    lineHeight: 24,
  },
  answerHintCard: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
