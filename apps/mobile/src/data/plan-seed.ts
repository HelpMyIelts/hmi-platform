import { PlanTasks } from '@/store/types';

export const PLAN_TASKS_SEED: PlanTasks = {
  0: [{ id: 1, label: 'Vocabulary flashcards — 20 words', done: true }],
  1: [
    { id: 2, label: 'Reading practice test — Passage 2', done: true },
    { id: 3, label: 'Grammar drill — conditionals', done: false },
  ],
  2: [
    { id: 4, label: 'Speaking: Part 2 cue card practice', done: false },
    { id: 5, label: 'Listening: Section 3 practice', done: false },
  ],
  3: [{ id: 6, label: 'Writing Task 2 — essay practice', done: false }],
  4: [{ id: 7, label: 'Mock test — full listening', done: false }],
  5: [],
  6: [],
};
