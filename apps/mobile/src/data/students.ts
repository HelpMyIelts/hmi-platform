export interface Student {
  id: number;
  name: string;
  initials: string;
  band: number;
  target: number;
  lastActive: string;
  skills: {
    Listening: number;
    Reading: number;
    Writing: number;
    Speaking: number;
  };
}

export const STUDENTS: Student[] = [
  { id: 1, name: 'Amara Chen', initials: 'AC', band: 6.5, target: 7, lastActive: '2h ago', skills: { Listening: 7, Reading: 6.5, Writing: 6, Speaking: 6.5 } },
  { id: 2, name: 'Rohan Verma', initials: 'RV', band: 5.5, target: 7, lastActive: '1d ago', skills: { Listening: 6, Reading: 5.5, Writing: 5, Speaking: 5.5 } },
  { id: 3, name: 'Fatima Al-Sayed', initials: 'FA', band: 7.5, target: 8, lastActive: '5h ago', skills: { Listening: 8, Reading: 7.5, Writing: 7, Speaking: 7.5 } },
  { id: 4, name: 'Diego Ramirez', initials: 'DR', band: 6, target: 6.5, lastActive: '3d ago', skills: { Listening: 6.5, Reading: 6, Writing: 5.5, Speaking: 6 } },
  { id: 5, name: 'Priya Nair', initials: 'PN', band: 7, target: 7.5, lastActive: 'just now', skills: { Listening: 7, Reading: 7, Writing: 7, Speaking: 6.5 } },
];

export const STUDENT_ACTIVITY = [
  { label: 'Completed Writing Task 2 essay', when: '2h ago' },
  { label: 'Speaking Part 2 practice', when: '1d ago' },
  { label: 'Reading passage — 8/10', when: '3d ago' },
];

const average = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;

export function bandBarsFor(skills: Student['skills']) {
  return (Object.keys(skills) as (keyof Student['skills'])[]).map((label) => ({
    label,
    value: skills[label],
    pct: (skills[label] / 9) * 100,
  }));
}

export const cohortAverage = Number(average(STUDENTS.map((s) => s.band)).toFixed(1));

export const moduleBars = (['Listening', 'Reading', 'Writing', 'Speaking'] as const).map((skill) => {
  const value = average(STUDENTS.map((s) => s.skills[skill]));
  return { label: skill, value: Number(value.toFixed(1)), pct: (value / 9) * 100 };
});

export const atRiskStudents = STUDENTS.filter((s) => s.band < s.target);
