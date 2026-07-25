export interface Question {
  q: string;
  options: string[];
  answer: number;
}

export type QuizSkill = 'Listening' | 'Reading' | 'Vocabulary' | 'Grammar';

export const QUESTIONS: Record<QuizSkill, Question[]> = {
  Listening: [
    {
      q: 'You hear a campus announcement. What is the main topic?',
      options: ['Library opening hours', 'A change of exam venue', 'New parking rules', 'A guest lecture series'],
      answer: 1,
    },
    {
      q: 'The speaker says the workshop has been rescheduled to...',
      options: ['Monday 9am', 'Tuesday 2pm', 'Wednesday 11am', 'Friday 4pm'],
      answer: 2,
    },
    {
      q: 'According to the tour guide, visitors should meet at the...',
      options: ['Main entrance', 'Gift shop', 'North gate', 'Café'],
      answer: 0,
    },
  ],
  Reading: [
    {
      q: 'The passage suggests that urban beekeeping has increased mainly because of...',
      options: ['Government subsidies', 'Rising public interest in biodiversity', 'Cheaper equipment', 'New regulations'],
      answer: 1,
    },
    {
      q: 'What does the word "mitigate" most nearly mean in paragraph 2?',
      options: ['Worsen', 'Lessen', 'Ignore', 'Measure'],
      answer: 1,
    },
    {
      q: "The author's attitude toward the new policy is best described as...",
      options: ['Enthusiastic', 'Dismissive', 'Cautiously supportive', 'Angry'],
      answer: 2,
    },
  ],
  Vocabulary: [
    {
      q: 'Which word best completes: "The committee reached a ___ decision after hours of debate."',
      options: ['unanimous', 'reluctant', 'temporary', 'biased'],
      answer: 0,
    },
    {
      q: '"Ubiquitous" most nearly means...',
      options: ['Rare', 'Everywhere', 'Expensive', 'Outdated'],
      answer: 1,
    },
    {
      q: 'Choose the correct collocation: "to ___ a conclusion"',
      options: ['make', 'draw', 'take', 'do'],
      answer: 1,
    },
  ],
  Grammar: [
    {
      q: 'Choose the correct sentence.',
      options: [
        'She has been living here since five years.',
        'She has been living here for five years.',
        'She lives here since five years.',
        'She is living here for five years since.',
      ],
      answer: 1,
    },
    {
      q: 'Select the correctly punctuated sentence.',
      options: [
        'Although it rained, we went hiking.',
        'Although it rained we went, hiking.',
        'Although, it rained we went hiking.',
        'Although it rained; we went hiking.',
      ],
      answer: 0,
    },
    {
      q: 'Which sentence uses the passive voice correctly?',
      options: [
        'The report was wrote by the team.',
        'The report was written by the team.',
        'The report written by the team.',
        'The team was written the report.',
      ],
      answer: 1,
    },
  ],
};
