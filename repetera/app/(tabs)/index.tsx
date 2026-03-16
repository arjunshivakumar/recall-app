import { useMemo, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import FlashCard from "../../components/FlashCard";
import RatingButton from "../../components/RatingButton";
import ReviewHeader from "../../components/ReviewHeader";
import SessionProgress from "../../components/SessionProgress";

type QuestionCard = {
  id: number;
  question: string;
  answer: string;
};

const questions: QuestionCard[] = [
  {
    id: 1,
    question: "What is TCP congestion control?",
    answer:
      "A mechanism used by TCP to regulate packet transmission rate and prevent network congestion.",
  },
  {
    id: 2,
    question: "What does DNS do?",
    answer: "DNS translates domain names into IP addresses.",
  },
];

const ratings = ["Again", "Hard", "Good", "Easy"] as const;

const ratingEmphasis: Record<(typeof ratings)[number], number> = {
  Again: 0.35,
  Hard: 0.55,
  Good: 0.75,
  Easy: 1,
};

export default function QuestionsScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentCard = questions[currentCardIndex];
  const sessionProgress = useMemo(
    () => Math.min(reviewedCount / questions.length, 1),
    [reviewedCount]
  );

  const handleNextCard = () => {
    setShowAnswer(false);
    setReviewedCount((previousCount) => Math.min(previousCount + 1, questions.length));
    setCurrentCardIndex((previousIndex) => (previousIndex + 1) % questions.length);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingBottom: tabBarHeight + 20 }]}>
        <ReviewHeader reviewedCount={reviewedCount} totalCards={questions.length} />

        <View style={styles.topSection}>
          <SessionProgress
            currentCard={currentCardIndex + 1}
            totalCards={questions.length}
            progress={sessionProgress}
          />

          <View style={styles.studyHint}>
            <Text style={styles.studyHintText}>
              Study one idea at a time. Reveal only when you have a clear mental answer.
            </Text>
          </View>
        </View>

        <View style={styles.cardSection}>
          <FlashCard
            question={currentCard.question}
            answer={currentCard.answer}
            showAnswer={showAnswer}
          />
        </View>

        <View style={styles.footer}>
          {!showAnswer ? (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.primaryButton}
              onPress={() => setShowAnswer(true)}
            >
              <Text style={styles.primaryButtonText}>Show Answer</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.ratingsSection}>
              <View style={styles.ratingHeader}>
                <Text style={styles.ratingHeaderText}>How did this feel?</Text>
              </View>

              <View style={styles.ratingGrid}>
                {ratings.map((rating) => (
                  <RatingButton
                    key={rating}
                    label={rating}
                    emphasis={ratingEmphasis[rating]}
                    onPress={handleNextCard}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F5EF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F3F5EF",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  topSection: {
    marginTop: 24,
    gap: 16,
  },
  studyHint: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "rgba(255,255,255,0.72)",
    padding: 16,
  },
  studyHintText: {
    color: "#667085",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
  },
  cardSection: {
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingBottom: 12,
  },
  footer: {
    alignItems: "stretch",
    gap: 16,
    paddingTop: 20,
  },
  primaryButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#4A7CFF",
    minHeight: 64,
    paddingHorizontal: 24,
    paddingVertical: 18,
    shadowColor: "#4A7CFF",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  ratingsSection: {
    gap: 16,
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingHeaderText: {
    color: "#667085",
    fontSize: 14,
    fontWeight: "600",
  },
  ratingGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
});
