import { useState, useEffect } from "react";
import { CaseDisplay } from "@/components/CaseDisplay";
import { ClassificationStep } from "@/components/ClassificationStep";
import { FlawStep } from "@/components/FlawStep";
import { ConfidenceStep } from "@/components/ConfidenceStep";
import { ResultsReveal } from "@/components/ResultsReveal";
import { StatsView } from "@/components/StatsView";
import { getTodaysCase } from "@/lib/cases";
import { calculateScore } from "@/lib/scoring";
import {
  getStats,
  saveResult,
  hasPlayedToday,
  getTodayResult,
} from "@/lib/storage";
import {
  Classification,
  FlawCategory,
  PlayerAnswer,
  ScoreBreakdown,
  PlayerStats,
} from "@/lib/types";

type View = "play" | "results" | "stats";

const Index = () => {
  const dailyCase = getTodaysCase();
  const [view, setView] = useState<View>("play");
  const [classification, setClassification] = useState<Classification>();
  const [flaw, setFlaw] = useState<FlawCategory>();
  const [score, setScore] = useState<ScoreBreakdown>();
  const [answer, setAnswer] = useState<PlayerAnswer>();
  const [stats, setStats] = useState<PlayerStats>(getStats());

  useEffect(() => {
    const todayResult = getTodayResult(dailyCase.date);
    if (todayResult) {
      setAnswer(todayResult.answer);
      setScore(todayResult.score);
      setClassification(todayResult.answer.classification);
      setFlaw(todayResult.answer.flaw);
      setView("results");
    }
  }, [dailyCase.date]);

  const handleClassification = (c: Classification) => {
    setClassification(c);
    if (c !== "misresolved") {
      setFlaw(undefined);
    }
  };

  const handleFlaw = (f: FlawCategory) => {
    setFlaw(f);
  };

  const handleSubmit = (confidence: number) => {
    if (!classification) return;
    const playerAnswer: PlayerAnswer = {
      classification: classification!,
      flaw,
      confidence,
    };
    const result = calculateScore(playerAnswer, dailyCase);
    setScore(result);
    setAnswer(playerAnswer);

    if (!hasPlayedToday(dailyCase.date)) {
      const newStats = saveResult({
        date: dailyCase.date,
        caseId: dailyCase.id,
        answer: playerAnswer,
        score: result,
        difficulty: dailyCase.difficulty,
      });
      setStats(newStats);
    }

    setView("results");
  };

  const canSubmit = classification && (classification !== "misresolved" || flaw);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-4">
          <h1 className="text-xl tracking-tight">Misresolved</h1>
          <button
            onClick={() =>
              setView(view === "stats" ? (score ? "results" : "case") : "stats")
            }
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            {view === "stats" ? "Game" : "Stats"}
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-xl px-4 py-6">
        {view === "stats" ? (
          <StatsView
            stats={stats}
            onBack={() =>
              setView(score ? "results" : "case")
            }
          />
        ) : view === "results" && score && answer ? (
          <ResultsReveal
            dailyCase={dailyCase}
            answer={answer}
            score={score}
            onViewStats={() => {
              setStats(getStats());
              setView("stats");
            }}
          />
        ) : (
          <div className="space-y-8">
            <CaseDisplay dailyCase={dailyCase} />

            {view === "case" && (
              <button
                onClick={advanceFromCase}
                className="w-full rounded-md bg-foreground py-3 font-mono text-sm font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-90"
              >
                Make Your Call
              </button>
            )}

            {view === "classify" && (
              <>
                <div className="border-t border-border pt-6">
                  <ClassificationStep
                    onSelect={handleClassification}
                    selected={classification}
                  />
                </div>
                {classification && (
                  <button
                    onClick={advanceFromClassify}
                    className="w-full rounded-md bg-foreground py-3 font-mono text-sm font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-90"
                  >
                    Continue
                  </button>
                )}
              </>
            )}

            {view === "flaw" && (
              <>
                <div className="border-t border-border pt-6">
                  <FlawStep onSelect={handleFlaw} selected={flaw} />
                </div>
                {flaw && (
                  <button
                    onClick={advanceFromFlaw}
                    className="w-full rounded-md bg-foreground py-3 font-mono text-sm font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-90"
                  >
                    Continue
                  </button>
                )}
              </>
            )}

            {view === "confidence" && (
              <div className="border-t border-border pt-6">
                <ConfidenceStep onSubmit={handleSubmit} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          One case per day · Under five minutes · Skill, not luck
        </p>
      </footer>
    </div>
  );
};

export default Index;
