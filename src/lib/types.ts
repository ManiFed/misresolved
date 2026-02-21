export type Classification = "correct" | "misresolved" | "indeterminate";

export type FlawCategory =
  | "definition_ambiguity"
  | "time_boundary_error"
  | "source_hierarchy_mistake"
  | "procedural_substantive_confusion"
  | "jurisdiction_mismatch"
  | "retroactive_reinterpretation"
  | "governance_override"
  | "true_logical_indeterminacy";

export const FLAW_LABELS: Record<FlawCategory, string> = {
  definition_ambiguity: "Definition Ambiguity",
  time_boundary_error: "Time Boundary Error",
  source_hierarchy_mistake: "Source Hierarchy Mistake",
  procedural_substantive_confusion: "Procedural vs. Substantive Confusion",
  jurisdiction_mismatch: "Jurisdiction Mismatch",
  retroactive_reinterpretation: "Retroactive Reinterpretation",
  governance_override: "Governance Override",
  true_logical_indeterminacy: "True Logical Indeterminacy",
};

export interface TimelineEvent {
  date: string;
  description: string;
}

export interface DailyCase {
  id: string;
  date: string;
  difficulty: number; // 1-5
  question: string;
  resolutionCriteria: string;
  timeline: TimelineEvent[];
  officialResolution: string;
  correctClassification: Classification;
  correctFlaw?: FlawCategory;
  explanation: string;
  alternateInterpretation: string;
  marketPriceBehavior: string;
}

export interface PlayerAnswer {
  classification: Classification;
  flaw?: FlawCategory;
  confidence: number; // 0.5 to 1.0
}

export interface ScoreBreakdown {
  classificationScore: number; // 0 or 1
  flawScore: number; // 0 or 1
  calibrationScore: number; // 0.5 to 1.0
  total: number;
  maxPossible: number;
}

export interface PlayerStats {
  totalPlayed: number;
  currentStreak: number;
  bestStreak: number;
  accuracyRate: number;
  flawAccuracy: number;
  calibrationIndex: number;
  last30Scores: number[];
  skillScore: number;
  history: DayResult[];
}

export interface DayResult {
  date: string;
  caseId: string;
  answer: PlayerAnswer;
  score: ScoreBreakdown;
  difficulty: number;
}
