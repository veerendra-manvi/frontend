import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProgressStore = create(
  persist(
    (set, get) => ({
      completedLessons: [],
      completedPractices: [],
      quizScores: {},
      xp: 0,
      streak: 1,
      moduleProgress: {},
      currentLesson: null,
      lastOpenedLesson: null,
      achievements: [],
      masteredQuestions: [],
      solvedChallenges: [],
      weeklyGoal: { current: 0, target: 5 },

      solveChallenge: (id) => {
        set((state) => {
          if (state.solvedChallenges.includes(id)) return state;
          get().addXP(500); // Massive bonus for coding challenge
          return { solvedChallenges: [...state.solvedChallenges, id] };
        });
      },

      toggleMastered: (id) => {
        set((state) => {
          const isMastered = state.masteredQuestions.includes(id);
          const next = isMastered 
            ? state.masteredQuestions.filter(q => q !== id)
            : [...state.masteredQuestions, id];
          
          if (!isMastered) get().addXP(50); // Small bonus for mastery
          
          return { masteredQuestions: next };
        });
      },

      setLastOpened: (slug) => {
        set({ lastOpenedLesson: slug });
      },

      addXP: (amount) => {
        set((state) => ({ xp: state.xp + amount }));
      },

      incrementWeeklyProgress: () => {
        set((state) => ({ 
          weeklyGoal: { ...state.weeklyGoal, current: state.weeklyGoal.current + 1 } 
        }));
      },

      unlockAchievement: (id) => {
        set((state) => {
          if (state.achievements.includes(id)) return state;
          return { achievements: [...state.achievements, id] };
        });
      },

      completeLesson: (slug) => {
        const { completedLessons, addXP, incrementWeeklyProgress } = get();
        if (!completedLessons.includes(slug)) {
          set({ completedLessons: [...completedLessons, slug] });
          addXP(200);
          incrementWeeklyProgress();
        }
      },

      completePractice: (id) => {
        const { completedPractices, addXP } = get();
        if (!completedPractices.includes(id)) {
          set({ completedPractices: [...completedPractices, id] });
          addXP(100);
        }
      },

      saveQuizScore: (quizId, data) => {
        const { quizScores, addXP } = get();
        const prevScore = quizScores[quizId]?.score || 0;
        
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [quizId]: { 
              score: data.score, 
              total: data.total, 
              date: new Date().toLocaleDateString(),
              title: data.title 
            }
          }
        }));

        if (data.score > prevScore) {
          const improvement = data.score - prevScore;
          addXP(improvement * 10);
        }

        if (data.score === data.total) {
          addXP(300); // Perfect score bonus
        }
      }
    }),
    {
      name: 'javamastery-progress',
    }
  )
);

export default useProgressStore;
