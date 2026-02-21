import { FlawCategory, FLAW_LABELS } from "@/lib/types";

interface FlawStepProps {
  onSelect: (flaw: FlawCategory) => void;
  selected?: FlawCategory;
}

const FLAW_OPTIONS: { value: FlawCategory; description: string }[] = [
  { value: "definition_ambiguity", description: "Key terms lack precise definitions" },
  { value: "time_boundary_error", description: "Deadline or window incorrectly applied" },
  { value: "source_hierarchy_mistake", description: "Wrong authoritative source used" },
  { value: "procedural_substantive_confusion", description: "Form followed but substance missed" },
  { value: "jurisdiction_mismatch", description: "Wrong domain or authority referenced" },
  { value: "retroactive_reinterpretation", description: "Rules reread after facts known" },
  { value: "governance_override", description: "Platform overruled the stated criteria" },
  { value: "true_logical_indeterminacy", description: "Rules genuinely produce no answer" },
];

export function FlawStep({ onSelect, selected }: FlawStepProps) {
  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Step 2 — Flaw Identification
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          What type of flaw caused the misresolution?
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {FLAW_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className={`rounded-md border p-3 text-left transition-all ${
              selected === opt.value
                ? "border-primary bg-primary/5"
                : "border-border hover:border-foreground/30 hover:bg-card"
            }`}
          >
            <span
              className={`text-sm font-medium ${
                selected === opt.value ? "text-primary" : "text-foreground"
              }`}
            >
              {FLAW_LABELS[opt.value]}
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
