import { DailyCase } from "@/lib/types";

interface CaseDisplayProps {
  dailyCase: DailyCase;
}

export function CaseDisplay({ dailyCase }: CaseDisplayProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Daily Case
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">
            Difficulty
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-3 rounded-sm ${
                  i < dailyCase.difficulty
                    ? "bg-foreground"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-2xl leading-snug md:text-3xl">
        {dailyCase.question}
      </h2>

      <div className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Resolution Criteria
        </h3>
        <p className="text-sm leading-relaxed text-foreground/80">
          {dailyCase.resolutionCriteria}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Timeline
        </h3>
        <div className="space-y-2 border-l-2 border-border pl-4">
          {dailyCase.timeline.map((event, i) => (
            <div key={i} className="animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="font-mono text-xs font-medium text-primary">
                {event.date}
              </span>
              <p className="text-sm text-foreground/80">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-md border border-border bg-card p-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Official Resolution
        </h3>
        <p className="mt-1 font-serif text-lg font-medium">
          {dailyCase.officialResolution}
        </p>
      </div>
    </div>
  );
}
