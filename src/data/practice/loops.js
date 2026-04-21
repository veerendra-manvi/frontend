export const loopChallenges = [
  {
    id: "loop-sum",
    type: "fill-missing-code",
    title: "The Summing Loop",
    difficulty: "Beginner",
    prompt: "Fill in the missing part of the 'for' loop to calculate the sum of numbers from 1 to 10.",
    starterCode: "int sum = 0;\nfor (int i = 1; ________; i++) {\n    sum += i;\n}\nSystem.out.println(sum);",
    hint: "The condition should check if 'i' is less than or equal to 10.",
    solution: "i <= 10",
    xpReward: 100,
    estimatedMinutes: 3
  },
  {
    id: "loop-infinite-fix",
    type: "fix-error",
    title: "Broken Countdown",
    difficulty: "Intermediate",
    prompt: "This loop is supposed to count down from 5 to 1, but it never stops! Fix the increment/decrement logic.",
    starterCode: "int count = 5;\nwhile (count > 0) {\n    System.out.println(count);\n    count++; // Something is wrong here\n}",
    hint: "What should happen to 'count' to move it towards 0?",
    solution: "count--",
    xpReward: 120,
    estimatedMinutes: 4
  }
];
