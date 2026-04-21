import React from 'react';
import { Code2 } from 'lucide-react';
import { SectionTitle, PracticeChallenge } from '../ui';

const PracticeSection = ({ challenges }) => {
  if (!challenges || challenges.length === 0) return null;

  return (
    <section className="space-y-8">
      <SectionTitle title="Practice Arena" subtitle="Test your knowledge." />
      <div className="space-y-10">
        {challenges.map((challenge) => (
          <PracticeChallenge 
            key={challenge.id}
            challengeId={challenge.id}
            type={challenge.type}
            title={challenge.title}
            prompt={challenge.prompt}
            codeSnippet={challenge.starterCode}
            hint={challenge.hint}
            solution={challenge.solution}
          />
        ))}
      </div>
    </section>
  );
};

export default PracticeSection;
