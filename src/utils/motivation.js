import { Trophy, Star, Zap, Flame, Shield, Target } from 'lucide-react';

export const getLevelInfo = (xp) => {
  if (xp < 500) return { title: 'Novice Coder', rank: 'I', color: 'text-slate-400' };
  if (xp < 1500) return { title: 'Syntax Specialst', rank: 'II', color: 'text-emerald-400' };
  if (xp < 3000) return { title: 'Logic Architect', rank: 'III', color: 'text-brand-primary' };
  if (xp < 6000) return { title: 'Concurrency King', rank: 'IV', color: 'text-brand-secondary' };
  return { title: 'JVM Master', rank: 'V', color: 'text-indigo-400' };
};

export const ACHIEVEMENTS = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson.',
    icon: Star,
    xpBonus: 50
  },
  {
    id: 'streak_3',
    title: 'Momentum',
    description: 'Maintain a 3-day streak.',
    icon: Flame,
    xpBonus: 150
  },
  {
    id: 'perfect_quiz',
    title: 'Pure Precision',
    description: 'Score 100% on any quiz.',
    icon: Trophy,
    xpBonus: 300
  },
  {
    id: 'module_complete',
    title: 'Architect',
    description: 'Complete all lessons in a module.',
    icon: Shield,
    xpBonus: 500
  }
];
