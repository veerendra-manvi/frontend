export const getLevelInfo = (xp) => {
  if (xp < 500) return { title: 'Junior Developer', rank: 'I', color: 'text-slate-500' };
  if (xp < 1500) return { title: 'Systems Specialist', rank: 'II', color: 'text-emerald-500' };
  if (xp < 3000) return { title: 'Logic Architect', rank: 'III', color: 'text-brand-primary' };
  if (xp < 6000) return { title: 'Concurrency Titan', rank: 'IV', color: 'text-brand-secondary' };
  return { title: 'JVM Grandmaster', rank: 'V', color: 'text-indigo-500' };
};

export const ACHIEVEMENTS = [
  {
    id: 'first_lesson',
    title: 'Hello World',
    description: 'Bypass the initial entry barrier. Complete first module.',
    iconId: 'star',
    xpBonus: 100
  },
  {
    id: 'streak_3',
    title: 'Atomic Persistence',
    description: 'Maintain high-frequency activity. 3-day synchronization.',
    iconId: 'flame',
    xpBonus: 250
  },
  {
    id: 'perfect_quiz',
    title: 'Pure Precision',
    description: 'Zero-fault execution. Score 100% on logical assessment.',
    iconId: 'trophy',
    xpBonus: 500
  },
  {
    id: 'module_complete',
    title: 'System Architect',
    description: 'Construct a complete knowledge cluster. Module finished.',
    iconId: 'shield',
    xpBonus: 1000
  }
];
