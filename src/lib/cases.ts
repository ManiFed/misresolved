import { DailyCase } from "./types";

export const CASES: DailyCase[] = [
  {
    id: "case-001",
    date: "2026-02-21",
    difficulty: 3,
    question:
      "Will the European Central Bank raise interest rates above 4.5% before January 1, 2026?",
    resolutionCriteria:
      "Resolves YES if the ECB's main refinancing operations rate exceeds 4.50% at any point before January 1, 2026, as reported by the ECB's official press releases.",
    timeline: [
      { date: "Sep 2023", description: "ECB raises rate to 4.50%." },
      { date: "Oct 2023", description: "ECB holds rate at 4.50%." },
      { date: "Apr 2024", description: "ECB signals potential easing cycle." },
      { date: "Jun 2024", description: "ECB cuts rate to 4.25%." },
      { date: "Dec 2025", description: "Rate stands at 3.15%. Market closes." },
    ],
    officialResolution: "Resolved NO",
    correctClassification: "misresolved",
    correctFlaw: "definition_ambiguity",
    explanation:
      'The rate reached exactly 4.50% but never exceeded it. The criteria stated "exceeds 4.50%," which strictly means above, not at. However, some platforms interpreted reaching the threshold as sufficient. The resolution of NO is technically correct under strict reading, but the market traded as if 4.50% counted, creating a mismatch between market behavior and resolution.',
    alternateInterpretation:
      'One could argue "above 4.5%" in common financial usage includes the boundary value, as rate announcements are discrete. The market priced YES at 92% when the rate was at 4.50%, suggesting participants believed criteria were met.',
    marketPriceBehavior:
      "Traded at 92% YES when rate hit 4.50%, crashed to 8% on resolution day. Significant trader complaints followed.",
  },
  {
    id: "case-002",
    date: "2026-02-22",
    difficulty: 2,
    question:
      "Will Company X announce layoffs of more than 10,000 employees before Q2 2025?",
    resolutionCriteria:
      "Resolves YES if Company X issues an official press release or SEC filing announcing workforce reductions affecting more than 10,000 employees, with the announcement date falling before April 1, 2025.",
    timeline: [
      {
        date: "Jan 2025",
        description:
          'Company X CEO states in earnings call: "We are restructuring and expect approximately 12,000 roles to be affected."',
      },
      {
        date: "Feb 2025",
        description:
          "Internal memo leaked confirming 11,200 layoffs planned across three divisions.",
      },
      {
        date: "Mar 2025",
        description:
          "Company X files WARN Act notices for 11,200 positions across 14 facilities.",
      },
      {
        date: "Mar 28, 2025",
        description:
          "Official press release confirms restructuring affecting 11,200 employees.",
      },
    ],
    officialResolution: "Resolved YES",
    correctClassification: "correct",
    explanation:
      "The official press release on March 28 clearly announced layoffs exceeding 10,000 before the April 1 deadline. The number (11,200) exceeds the threshold, the source (press release) matches criteria, and the timing is within bounds.",
    alternateInterpretation:
      'One might question whether "layoffs" and "restructuring" are identical terms, but the WARN Act filings and explicit language in the press release leave no reasonable ambiguity.',
    marketPriceBehavior:
      "Steadily rose from 45% to 94% between January and March as evidence accumulated. Resolved cleanly.",
  },
  {
    id: "case-003",
    date: "2026-02-23",
    difficulty: 4,
    question:
      "Will the WHO declare a new Public Health Emergency of International Concern (PHEIC) in 2025?",
    resolutionCriteria:
      "Resolves YES if the WHO Director-General declares a new PHEIC (not a continuation of an existing one) at any point during calendar year 2025, as announced on the WHO official website.",
    timeline: [
      {
        date: "Mar 2025",
        description:
          "Novel respiratory pathogen detected in Southeast Asia. WHO monitoring begins.",
      },
      {
        date: "May 2025",
        description:
          "WHO convenes Emergency Committee. Committee recommends PHEIC declaration.",
      },
      {
        date: "May 18, 2025",
        description:
          "WHO Director-General issues statement: 'I have determined this outbreak constitutes a PHEIC.' Published on WHO website.",
      },
      {
        date: "Jun 2025",
        description:
          "Some analysts note the pathogen is a variant of a previously known virus for which a PHEIC was declared in 2023 and ended in late 2024.",
      },
    ],
    officialResolution: "Resolved YES",
    correctClassification: "indeterminate",
    explanation:
      'The key ambiguity is whether this constitutes a "new" PHEIC. The pathogen is a variant of a virus that previously triggered a PHEIC. The WHO declared it as a new emergency, but the criteria specified "new PHEIC (not a continuation of an existing one)." A variant-driven emergency following a closely related prior PHEIC occupies genuine gray territory between new and continuation.',
    alternateInterpretation:
      "The WHO itself treated it as a new declaration, not a continuation. The prior PHEIC had been formally ended months earlier. Under strict procedural reading, a new declaration is a new declaration regardless of pathogen lineage.",
    marketPriceBehavior:
      "Jumped to 88% on declaration. Dropped to 62% when variant connection surfaced. Settled at 78% at resolution.",
  },
  {
    id: "case-004",
    date: "2026-02-24",
    difficulty: 5,
    question:
      "Will any country officially adopt Bitcoin as legal tender in 2025?",
    resolutionCriteria:
      'Resolves YES if a sovereign nation passes legislation or issues an executive decree making Bitcoin legal tender within its jurisdiction during 2025. "Legal tender" means creditors are legally required to accept Bitcoin for settlement of debts. Source: official government gazette or equivalent.',
    timeline: [
      {
        date: "Apr 2025",
        description:
          'Country Z president signs decree stating Bitcoin is "recognized as an official medium of exchange."',
      },
      {
        date: "May 2025",
        description:
          "Country Z central bank issues guidance: merchants encouraged but not required to accept Bitcoin.",
      },
      {
        date: "Jul 2025",
        description:
          'Legal analysis published showing decree uses "medium of exchange" not "legal tender" — creditors have no obligation to accept.',
      },
      {
        date: "Sep 2025",
        description:
          "Country Z amends decree to state Bitcoin is legal tender. Amendment published in official gazette.",
      },
      {
        date: "Oct 2025",
        description:
          "Implementation regulations reveal exemptions: transactions under $100 and rural areas excluded.",
      },
    ],
    officialResolution: "Resolved YES",
    correctClassification: "misresolved",
    correctFlaw: "procedural_substantive_confusion",
    explanation:
      'The September amendment does use the phrase "legal tender," but the implementation regulations create broad exemptions that undermine the substantive meaning. If creditors in rural areas and for small transactions are not required to accept Bitcoin, the legal tender status is procedural (exists in law text) but not substantive (not enforceable in practice). The resolution criteria specified creditors must be "legally required to accept Bitcoin for settlement of debts" — the exemptions break this requirement.',
    alternateInterpretation:
      "The gazette explicitly says 'legal tender.' The exemptions could be viewed as standard implementation carve-outs that don't negate the overall legal tender status, similar to how US legal tender laws have practical limitations.",
    marketPriceBehavior:
      "Volatile throughout. 35% after April decree, dropped to 20% after medium-of-exchange clarification, surged to 85% after September amendment, settled at 72% after exemptions revealed.",
  },
  {
    id: "case-005",
    date: "2026-02-25",
    difficulty: 3,
    question:
      "Will the US Senate confirm the nominee for Secretary of Defense before March 15, 2025?",
    resolutionCriteria:
      "Resolves YES if the US Senate holds a confirmation vote and the nominee receives a simple majority (51+) before 11:59 PM ET on March 14, 2025. Source: official Senate roll call vote record.",
    timeline: [
      {
        date: "Jan 20, 2025",
        description: "President nominates candidate for Secretary of Defense.",
      },
      {
        date: "Feb 2025",
        description:
          "Senate Armed Services Committee holds hearings. Committee votes to advance nomination 14-12.",
      },
      {
        date: "Mar 12, 2025",
        description:
          "Senate holds cloture vote, passes 53-47. Floor vote scheduled for Mar 14.",
      },
      {
        date: "Mar 14, 2025",
        description:
          "Senate confirms nominee 51-49. Vote concluded at 11:42 PM ET per Senate records.",
      },
    ],
    officialResolution: "Resolved YES",
    correctClassification: "correct",
    explanation:
      "The confirmation vote occurred on March 14 with 51 votes in favor, meeting both the majority threshold and the time deadline. The Senate roll call record confirms the vote concluded at 11:42 PM ET, within the specified window.",
    alternateInterpretation:
      "The extremely tight timing (17 minutes before deadline) might raise questions about whether procedural motions that extended past midnight should count, but the actual roll call was completed and recorded before the cutoff.",
    marketPriceBehavior:
      "Hovered around 55-65% through February. Spiked to 80% after cloture. Brief dip to 70% on Mar 14 morning due to filibuster rumors. Settled at 95% after vote began.",
  },
  {
    id: "case-006",
    date: "2026-02-26",
    difficulty: 4,
    question:
      "Will global average temperature in 2025 exceed the 2024 record by more than 0.05°C?",
    resolutionCriteria:
      "Resolves YES if the global mean surface temperature anomaly for calendar year 2025, as reported by NASA GISS in their annual summary, exceeds the 2024 anomaly by more than 0.05°C.",
    timeline: [
      {
        date: "Jan 2026",
        description:
          "NASA GISS publishes 2025 annual summary: 2025 anomaly is 1.35°C above baseline.",
      },
      {
        date: "Jan 2026",
        description:
          "NASA GISS 2024 anomaly was reported as 1.29°C in the 2024 summary.",
      },
      {
        date: "Feb 2026",
        description:
          "NASA revises 2024 figure to 1.31°C due to updated ocean buoy data incorporated in annual recalibration.",
      },
    ],
    officialResolution: "Resolved YES (based on original 2024 figure: 1.35 - 1.29 = 0.06°C difference)",
    correctClassification: "misresolved",
    correctFlaw: "retroactive_reinterpretation",
    explanation:
      "The resolution used the original 2024 figure (1.29°C) rather than the revised figure (1.31°C). With the revised data, the difference is only 0.04°C, which does not exceed 0.05°C. The criteria referenced 'the 2024 anomaly as reported by NASA GISS' without specifying which version. Using the most current NASA GISS figure at time of resolution would yield NO.",
    alternateInterpretation:
      "The 2024 annual summary published 1.29°C as the official figure at the time. Retroactive revisions are standard in climate science and arguably shouldn't invalidate the figure that was current when the comparison year ended. The resolution could reasonably use the figure available at the natural resolution point.",
    marketPriceBehavior:
      "Traded at 68% through most of 2025. Rose to 82% after preliminary Q3 data. Dropped to 55% after NASA revision was announced. Resolved YES anyway, causing controversy.",
  },
  {
    id: "case-007",
    date: "2026-02-27",
    difficulty: 2,
    question:
      "Will SpaceX successfully land a Starship booster on the launch tower ('chopstick catch') in 2025?",
    resolutionCriteria:
      "Resolves YES if SpaceX achieves a controlled landing of a Super Heavy booster using the mechanical arms on the launch tower during a flight test in calendar year 2025. Source: official SpaceX communications or FAA flight records.",
    timeline: [
      {
        date: "Mar 2025",
        description:
          "Flight Test 8: Booster returns to launch site. Mechanical arms engage and capture booster successfully.",
      },
      {
        date: "Mar 2025",
        description:
          'SpaceX tweets: "Super Heavy booster caught by the tower arms. Full success."',
      },
      {
        date: "Mar 2025",
        description:
          "FAA confirms nominal flight and landing in post-flight report.",
      },
    ],
    officialResolution: "Resolved YES",
    correctClassification: "correct",
    explanation:
      "SpaceX officially confirmed the catch, the FAA confirmed the flight, and video evidence was widely available. This is a clean resolution with no ambiguity in criteria, source, or timing.",
    alternateInterpretation:
      "No credible alternate interpretation exists. The event clearly occurred within all specified parameters.",
    marketPriceBehavior:
      "Gradually rose from 40% to 75% through early 2025 as testing progressed. Jumped to 99% within minutes of the successful catch.",
  },
];

export function getTodaysCase(): DailyCase {
  const today = new Date().toISOString().split("T")[0];
  const todaysCase = CASES.find((c) => c.date === today);
  if (todaysCase) return todaysCase;
  
  // Cycle through cases based on day count
  const startDate = new Date("2026-02-21");
  const now = new Date();
  const dayDiff = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const index = ((dayDiff % CASES.length) + CASES.length) % CASES.length;
  return CASES[index];
}
