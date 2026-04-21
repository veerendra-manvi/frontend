import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

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
      
      // UI State for animations
      recentXPChange: 0,
      showXPToast: false,

      triggerXPToast: (amount) => {
        set({ recentXPChange: amount, showXPToast: true });
        setTimeout(() => set({ showXPToast: false }), 3000);
      },

      addXP: (amount) => {
        set((state) => ({ xp: state.xp + amount }));
        get().triggerXPToast(amount);
      },

      solveChallenge: async (id) => {
        set((state) => {
          if (state.solvedChallenges.includes(id)) return state;
          get().addXP(500); 
          return { solvedChallenges: [...state.solvedChallenges, id] };
        });
        // Optional backend sync here
      },

      toggleMastered: (id) => {
        set((state) => {
          const isMastered = state.masteredQuestions.includes(id);
          const next = isMastered 
            ? state.masteredQuestions.filter(q => q !== id)
            : [...state.masteredQuestions, id];
          
          if (!isMastered) get().addXP(50);
          
          return { masteredQuestions: next };
        });
      },

      setLastOpened: (slug) => {
        set({ lastOpenedLesson: slug });
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

      completeLesson: async (lessonId, slug) => {
        const { completedLessons, addXP, incrementWeeklyProgress } = get();
        
        // 1. Instantly update UI for responsiveness
        const lessonIdentifier = lessonId || slug;
        if (!completedLessons.includes(lessonIdentifier)) {
          set({ completedLessons: [...completedLessons, lessonIdentifier] });
          addXP(200);
          incrementWeeklyProgress();
          
          // 2. Sync with Backend
          if (lessonId && !isNaN(lessonId)) {
            try {
              await api.post(`/api/lessons/${lessonId}/complete`);
              console.log(`Backend sync complete for lesson: ${lessonId}`);
            } catch (error) {
              console.error("Failed to sync lesson completion with backend", error);
              // We keep the local state even if sync fails for offline-first experience
            }
          }
        }
      },

      completePractice: (id) => {
        const { completedPractices, addXP } = get();
        if (!completedPractices.includes(id)) {
          set({ completedPractices: [...completedPractices, id] });
          addXP(100);
        }
      },

      saveQuizScore: async (topicId, data) => {
        const { quizScores, addXP } = get();
        const prevScore = quizScores[topicId]?.score || 0;
        
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [topicId]: { 
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
          addXP(300); 
        }

        // Sync quiz results to backend if needed
      }
    }),
    {
      name: 'javamastery-progress',
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        completedPractices: state.completedPractices,
        quizScores: state.quizScores,
        xp: state.xp,
        streak: state.streak,
        solvedChallenges: state.solvedChallenges,
        weeklyGoal: state.weeklyGoal,
        achievements: state.achievements
      })
    }
  )
);

export default useProgressStore;
