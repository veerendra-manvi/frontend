export const lessons = [
  // BASICS
  {
    slug: 'intro-to-java',
    moduleId: 'basics',
    title: 'The JVM Ecosystem',
    difficulty: 'Beginner',
    duration: '10 mins',
    visualizerType: 'none',
    quizId: 'intro-quiz',
    practiceId: 'none',
    xpReward: 100,
    isFlagship: true
  },
  {
    slug: 'variables',
    moduleId: 'basics',
    title: 'Data Types & Variables',
    difficulty: 'Beginner',
    duration: '15 mins',
    visualizerType: 'none',
    quizId: 'vars-quiz',
    practiceId: 'vars-practice',
    xpReward: 150
  },

  // CONTROL FLOW
  {
    slug: 'loops',
    moduleId: 'control-flow',
    title: 'Mastering Iteration',
    difficulty: 'Beginner',
    duration: '20 mins',
    visualizerType: 'none',
    quizId: 'loops-quiz',
    practiceId: 'loops-practice',
    xpReward: 200,
    isFlagship: true
  },

  // OOP
  {
    slug: 'inheritance',
    moduleId: 'oop',
    title: 'Power of Inheritance',
    difficulty: 'Intermediate',
    duration: '25 mins',
    visualizerType: 'inheritance',
    quizId: 'inheritance-quiz',
    practiceId: 'inheritance-practice',
    xpReward: 300,
    isFlagship: true
  },

  // EXCEPTIONS
  {
    slug: 'exceptions-handling',
    moduleId: 'exceptions',
    title: 'Bulletproof Code',
    difficulty: 'Intermediate',
    duration: '15 mins',
    visualizerType: 'none',
    quizId: 'exceptions-quiz',
    practiceId: 'exceptions-practice',
    xpReward: 150
  },

  // COLLECTIONS
  {
    slug: 'hashmap-deep-dive',
    moduleId: 'collections',
    title: 'HashMap Under the Hood',
    difficulty: 'Advanced',
    duration: '30 mins',
    visualizerType: 'hashmap',
    quizId: 'hashmap-quiz',
    practiceId: 'hashmap-practice',
    xpReward: 500,
    isFlagship: true
  },

  // STREAMS
  {
    slug: 'stream-pipelines',
    moduleId: 'streams',
    title: 'Functional Pipelines',
    difficulty: 'Advanced',
    duration: '25 mins',
    visualizerType: 'streams',
    quizId: 'streams-quiz',
    practiceId: 'streams-practice',
    xpReward: 400,
    isFlagship: true
  },

  // JVM
  {
    slug: 'memory-management',
    moduleId: 'jvm',
    title: 'Stack vs Heap Analysis',
    difficulty: 'Advanced',
    duration: '35 mins',
    visualizerType: 'jvmMemory',
    quizId: 'jvm-quiz',
    practiceId: 'none',
    xpReward: 600,
    isFlagship: true
  },

  // ADD MOCK LESSONS FOR REMAINING TO POPULATE UI
  { slug: 'methods-basic', moduleId: 'methods', title: 'Defining Methods', difficulty: 'Intermediate', duration: '12 mins', xpReward: 100 },
  { slug: 'concurrency-basic', moduleId: 'concurrency', title: 'Thread Lifecycle', difficulty: 'Expert', duration: '40 mins', xpReward: 800 },
  { slug: 'file-io-basic', moduleId: 'file-io', title: 'Stream IO', difficulty: 'Expert', duration: '30 mins', xpReward: 500 },
  { slug: 'jdbc-advanced', moduleId: 'advanced', title: 'JDBC Persistence', difficulty: 'Expert', duration: '50 mins', xpReward: 1000 }
];
