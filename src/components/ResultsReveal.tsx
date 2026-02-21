import { DailyCase, PlayerAnswer, ScoreBreakdown, FLAW_LABELS } from "@/lib/types";

interface ResultsRevealProps {
  dailyCase: DailyCase;
  answer: PlayerAnswer;
  score: ScoreBreakdown;
  onViewStats: () => void;
}

export function ResultsReveal({
  dailyCase,
  answer,
  score,
  onViewStats,
}: ResultsRevealProps) {
  const classificationCorrect =
    answer.classification === dailyCase.correctClassification;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Your Score
        </div>
        <div className="mt-2 font-serif text-5xl">
          {score.total}
          <span className="text-2xl text-muted-foreground">
            /{score.maxPossible}
          </span>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="space-y-3 rounded-md border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Classification</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm">
              {answer.classification} →{" "}
              {dailyCase.correctClassification}
            </span>
            <span
              className={`font-mono text-xs font-semibold ${
                classificationCorrect ? "text-success" : "text-destructive"
              }`}
            >
              {score.classificationScore}/1
            </span>
          </div>
        </div>

        {dailyCase.correctClassification === "misresolved" && (
          <div className="flex items-center justify-between">
            <span className="text-sm">Flaw Diagnosis</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs">
                {answer.flaw
                  ? FLAW_LABELS[answer.flaw]
                  : "—"}
              </span>
              <span
                className={`font-mono text-xs font-semibold ${
                  score.flawScore === 1 ? "text-success" : "text-destructive"
                }`}
              >
                {score.flawScore}/1
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm">Calibration</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">
              {Math.round(answer.confidence * 100)}% confidence
            </span>
            <span className="font-mono text-xs font-semibold text-foreground">
              {score.calibrationScore}
            </span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Ruling Explanation
        </h3>
        <p className="text-sm leading-relaxed text-foreground/80">
          {dailyCase.explanation}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Alternate Interpretation
        </h3>
        <p className="text-sm leading-relaxed text-foreground/80">
          {dailyCase.alternateInterpretation}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Market Behavior
        </h3>
        <p className="text-sm leading-relaxed text-foreground/80">
          {dailyCase.marketPriceBehavior}
        </p>
      </div>

      {dailyCase.correctClassification === "misresolved" &&
        dailyCase.correctFlaw && (
          <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              Correct Flaw Category
            </span>
            <p className="mt-1 font-serif text-lg">
              {FLAW_LABELS[dailyCase.correctFlaw]}
            </p>
          </div>
        )}

      <button
        onClick={onViewStats}
        className="w-full rounded-md border border-border py-3 font-mono text-sm uppercase tracking-wider text-foreground transition-colors hover:bg-card"
      >
        View Stats
      </button>
    </div>
  );
}
