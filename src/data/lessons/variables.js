export const variablesLesson = {
  slug: 'variables',
  title: "Data Types & Variables",
  module: "Java Basics",
  difficulty: "Beginner",
  duration: "15 mins",
  beginner: {
    explanation: "A variable is like a storage container for data. You give it a name and a type, and Java reserves a space in memory to keep that information for later.",
    analogy: "Think of a variable as a labeled kitchen jar. A jar labeled 'Sugar' only holds sugar; you wouldn't put salt in it! In Java, an 'int' jar only holds whole numbers.",
    whyItMatters: "Programs need to remember things like player scores, user names, or prices. Variables are the 'memory' of your code."
  },
  developer: {
    technical: "Java is a statically-typed language. Variables must be declared with a type before use. Primitive types (int, boolean) are stored by value, while Reference types (String, Object) are stored by reference.",
    bestPractices: [
      "Use camelCase for variable names.",
      "Declare variables as 'final' if their value should not change.",
      "Initialize variables as close to their first use as possible."
    ],
    commonMistakes: [
      "Using local variables without initializing them.",
      "Choosing a type that is too small for the expected data (e.g., int for trillions).",
      "Confusing '=' (assignment) with '==' (equality check)."
    ]
  },
  code: {
    java: `public class Main {
    public static void main(String[] args) {
        int score = 42;
        String name = "Neo";
        final double PI = 3.14159;
        
        System.out.println(name + "'s score: " + score);
    }
}`,
    explanationSteps: [
      { line: "int score = 42;", desc: "Creates a box for whole numbers named 'score'." },
      { line: "final double PI", desc: "The 'final' keyword makes this variable a constant." }
    ],
    output: "Neo's score: 42"
  },
  practice: {
    prompt: "Create a variable named 'currentYear' and set it to the current year. Then create a String variable 'message' that combines the year with a greeting."
  },
  quiz: {
    question: "Which of the following is NOT a valid primitive type in Java?",
    options: ["int", "boolean", "String", "double"],
    correct: 2
  },
  takeaways: [
    "Variables reserve space in memory.",
    "Strong typing ensures data safety.",
    "Constants use the 'final' keyword."
  ],
  visualizerType: "none"
};
