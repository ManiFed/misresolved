import { PlayerStats } from "@/lib/types";

interface StatsViewProps {
  stats: PlayerStats;
  onBack: () => void;
}

export function StatsView({ stats, onBack }: StatsViewProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Your Record</h2>
        <button
          onClick={onBack}
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← Back
        </button>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Played" value={stats.totalPlayed.toString()} />
        <MetricCard label="Streak" value={stats.currentStreak.toString()} />
        <MetricCard label="Best" value={stats.bestStreak.toString()} />
        <MetricCard label="Skill" value={stats.skillScore.toString()} />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="Accuracy" value={`${stats.accuracyRate}%`} />
        <MetricCard label="Flaw Dx" value={`${stats.flawAccuracy}%`} />
        <MetricCard
          label="Cal. Error"
          value={stats.calibrationIndex.toFixed(2)}
        />
      </div>

      {/* Calibration graph - last 30 days */}
      {stats.last30Scores.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Last {stats.last30Scores.length} Sessions
          </h3>
          <div className="flex items-end gap-1" style={{ height: 80 }}>
            {stats.last30Scores.map((s, i) => {
              const maxScore = 3;
              const height = Math.max((s / maxScore) * 100, 5);
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-primary/60 transition-all hover:bg-primary"
                  style={{ height: `${height}%` }}
                  title={`Score: ${s}`}
                />
              );
            })}
          </div>
          <div className="flex justify-between font-mono text-xs text-muted-foreground">
            <span>Oldest</span>
            <span>Today</span>
          </div>
        </div>
      )}

      {stats.totalPlayed === 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Play your first case to see stats here.
        </div>
      )}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-3 text-center">
      <div className="font-mono text-2xl font-semibold tabular-nums">
        {value}
      </div>
      <div className="mt-0.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
