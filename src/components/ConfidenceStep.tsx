import { useState } from "react";

interface ConfidenceStepProps {
  onSubmit: (confidence: number) => void;
}

export function ConfidenceStep({ onSubmit }: ConfidenceStepProps) {
  const [confidence, setConfidence] = useState(75);

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Step 3 — Confidence
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          How confident are you in your answer?
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">50%</span>
          <span className="font-mono text-3xl font-semibold tabular-nums text-foreground">
            {confidence}%
          </span>
          <span className="font-mono text-xs text-muted-foreground">100%</span>
        </div>

        <input
          type="range"
          min={50}
          max={100}
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
          className="w-full cursor-pointer accent-primary"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Uncertain</span>
          <span>Certain</span>
        </div>
      </div>

      <button
        onClick={() => onSubmit(confidence / 100)}
        className="w-full rounded-md bg-foreground py-3 font-mono text-sm font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-90"
      >
        Submit
      </button>
    </div>
  );
}
