export interface MetricBar {
  label: string;
  value: number;
  pct: number;
}

function metric(label: string, value: number): MetricBar {
  return { label, value, pct: (value / 9) * 100 };
}

export const SPEAKING_METRICS: MetricBar[] = [
  metric('Fluency & Coherence', 6.5),
  metric('Lexical Resource', 6.5),
  metric('Grammatical Range', 6),
  metric('Pronunciation', 6.5),
  metric('Overall', 6.5),
];

export const SPEAKING_TIPS = [
  'Try linking ideas with a wider range of discourse markers (e.g. "in addition", "as a result").',
  'A few hesitations around 0:40 — practicing the cue card structure aloud will help fluency.',
  'Good use of topic-specific vocabulary — keep expanding your range with synonyms.',
];

export const WRITING_METRICS: MetricBar[] = [
  metric('Task Achievement', 7),
  metric('Coherence & Cohesion', 6.5),
  metric('Lexical Resource', 6),
  metric('Grammatical Range', 6.5),
  metric('Overall', 6.5),
];

export const WRITING_TIPS = [
  'Your position is clear throughout — nice work addressing both sides of the argument.',
  'Vary sentence openings; several paragraphs start with "I think".',
  'Watch subject-verb agreement in complex sentences (paragraph 2).',
];

export const SPEAKING_PROMPT =
  'Describe a skill you would like to learn. You should say: what it is, why you want to learn it, how you would learn it, and explain how it might be useful in the future.';

export const WRITING_PROMPT =
  'Some people think governments should invest more in public transport rather than roads. To what extent do you agree or disagree?';
