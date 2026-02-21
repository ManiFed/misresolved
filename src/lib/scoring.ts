import { DailyCase, PlayerAnswer, ScoreBreakdown } from "./types";

export function calculateScore(
  answer: PlayerAnswer,
  dailyCase: DailyCase
): ScoreBreakdown {
  const classificationCorrect =
    answer.classification === dailyCase.correctClassification;
  const classificationScore = classificationCorrect ? 1 : 0;

  let flawScore = 0;
  if (dailyCase.correctClassification === "misresolved") {
    if (
      answer.classification === "misresolved" &&
      answer.flaw === dailyCase.correctFlaw
    ) {
      flawScore = 1;
    }
  }

  // Calibration: if correct, score = confidence; if wrong, score = 1 - confidence
  const overallCorrect =
    classificationCorrect &&
    (dailyCase.correctClassification !== "misresolved" ||
      answer.flaw === dailyCase.correctFlaw);

  const calibrationScore = overallCorrect
    ? answer.confidence
    : 1 - answer.confidence;

  const maxPossible =
    dailyCase.correctClassification === "misresolved" ? 3 : 2;

  return {
    classificationScore,
    flawScore,
    calibrationScore: Math.round(calibrationScore * 100) / 100,
    total:
      Math.round(
        (classificationScore + flawScore + calibrationScore) * 100
      ) / 100,
    maxPossible,
  };
}
