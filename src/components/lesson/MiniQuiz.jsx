import React, { useMemo } from 'react';
import { SectionTitle, QuizEngine } from '../ui';

const MiniQuiz = ({ data }) => {
  // Convert single quiz in data to array if needed, or use a list of questions
  const questions = useMemo(() => {
    if (data.quiz) {
       return [{
         id: `${data.id}-q1`,
         ...data.quiz,
         correctAnswer: data.quiz.correct // Mapping older 'correct' field to 'correctAnswer'
       }];
    }
    return [];
  }, [data]);

  if (questions.length === 0) return null;

  return (
    <section className="space-y-6">
       <SectionTitle title="Knowledge Checkpoint" subtitle="Validate your progress." />
       <QuizEngine 
         quizId={data.id}
         questions={questions}
         onComplete={(results) => console.log('Quiz Results:', results)}
       />
    </section>
  );
};

export default MiniQuiz;
