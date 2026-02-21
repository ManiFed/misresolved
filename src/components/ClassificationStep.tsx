import { Classification } from "@/lib/types";

interface ClassificationStepProps {
  onSelect: (classification: Classification) => void;
  selected?: Classification;
}

const OPTIONS: { value: Classification; label: string; description: string }[] = [
  {
    value: "correct",
    label: "Correct",
    description: "The resolution properly followed the stated criteria.",
  },
  {
    value: "misresolved",
    label: "Misresolved",
    description: "The resolution contradicts or misapplies the criteria.",
  },
  {
    value: "indeterminate",
    label: "Indeterminate",
    description: "The rules genuinely do not produce a clear answer.",
  },
];

export function ClassificationStep({
  onSelect,
  selected,
}: ClassificationStepProps) {
  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Step 1 — Classification
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Was the resolution correct under the stated criteria?
        </p>
      </div>
      <div className="space-y-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`group w-full rounded-md border p-4 text-left transition-all ${
              selected === opt.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-foreground/30 hover:bg-card"
            }`}
          >
            <span
              className={`font-serif text-lg ${
                selected === opt.value ? "text-primary" : "text-foreground"
              }`}
            >
              {opt.label}
            </span>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {opt.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
