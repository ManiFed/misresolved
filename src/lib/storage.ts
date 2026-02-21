import { DayResult, PlayerStats } from "./types";

const STATS_KEY = "misresolved_stats";
const TODAY_KEY = "misresolved_today";

function getDefaultStats(): PlayerStats {
  return {
    totalPlayed: 0,
    currentStreak: 0,
    bestStreak: 0,
    accuracyRate: 0,
    flawAccuracy: 0,
    calibrationIndex: 0,
    last30Scores: [],
    skillScore: 0,
    history: [],
  };
}

export function getStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return getDefaultStats();
    return JSON.parse(raw);
  } catch {
    return getDefaultStats();
  }
}

export function saveResult(result: DayResult): PlayerStats {
  const stats = getStats();
  stats.history.push(result);
  stats.totalPlayed += 1;

  // Streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const hadYesterday = stats.history.some((h) => h.date === yesterdayStr);

  if (hadYesterday || stats.totalPlayed === 1) {
    stats.currentStreak += 1;
  } else {
    stats.currentStreak = 1;
  }
  stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak);

  // Accuracy
  const correct = stats.history.filter(
    (h) => h.score.classificationScore === 1
  ).length;
  stats.accuracyRate = Math.round((correct / stats.totalPlayed) * 100);

  // Flaw accuracy
  const flawCases = stats.history.filter(
    (h) => h.answer.classification === "misresolved"
  );
  const flawCorrect = flawCases.filter((h) => h.score.flawScore === 1).length;
  stats.flawAccuracy =
    flawCases.length > 0
      ? Math.round((flawCorrect / flawCases.length) * 100)
      : 0;

  // Calibration index
  const calScores = stats.history.map((h) => {
    const wasCorrect = h.score.classificationScore === 1;
    return Math.abs(h.answer.confidence - (wasCorrect ? 1 : 0));
  });
  stats.calibrationIndex =
    Math.round(
      (calScores.reduce((a, b) => a + b, 0) / calScores.length) * 100
    ) / 100;

  // Last 30 scores
  stats.last30Scores = stats.history
    .slice(-30)
    .map((h) => h.score.total);

  // Skill score (rolling 30-day weighted)
  const recent = stats.history.slice(-30);
  if (recent.length > 0) {
    const weighted = recent.reduce(
      (sum, h) => sum + h.score.total * h.difficulty,
      0
    );
    const maxWeighted = recent.reduce(
      (sum, h) => sum + h.score.maxPossible * h.difficulty,
      0
    );
    stats.skillScore = Math.round((weighted / maxWeighted) * 1000);
  }

  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  localStorage.setItem(TODAY_KEY, result.date);

  return stats;
}

export function hasPlayedToday(caseDate: string): boolean {
  return localStorage.getItem(TODAY_KEY) === caseDate;
}

export function getTodayResult(caseDate: string): DayResult | null {
  if (!hasPlayedToday(caseDate)) return null;
  const stats = getStats();
  return stats.history.find((h) => h.date === caseDate) || null;
}
