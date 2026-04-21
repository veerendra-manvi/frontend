export const methodsLesson = {
  slug: 'methods',
  title: "Defining Methods",
  module: "Methods",
  difficulty: "Beginner",
  duration: "12 mins",
  beginner: {
    explanation: "A method is like a recipe. You give it some ingredients, it does some work, and then it gives you a finished result.",
    analogy: "Think of a 'Toaster'. You put bread in, it toasts, and it gives you toast back. You can use the toaster whenever you want without rebuilding it!",
    whyItMatters: "Methods allow you to reuse code. Instead of writing the same logic over and over, you write it once and call it whenever needed."
  },
  developer: {
    technical: "Methods are members of a class that encapsulate logic. They consist of a signature (name, parameters, return type) and a body. Java supports method overloading (different signatures).",
    bestPractices: [
      "Keep methods small and focused (Single Responsibility).",
      "Use descriptive verbs for names.",
      "Minimize side effects."
    ],
    commonMistakes: [
      "Extremely long parameter lists.",
      "Not accounting for null inputs.",
      "Duplicating logic across multiple methods."
    ]
  },
  code: {
    java: `public class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
    
    public static void main(String[] args) {
        int result = add(5, 10);
        System.out.println(result);
    }
}`,
    explanationSteps: [
      { line: "static int add", desc: "Defines a method that returns an integer." },
      { line: "return a + b", desc: "Passes the computed value back to the caller." }
    ],
    output: "15"
  },
  practice: {
    prompt: "Write a method called 'isEven' that takes an integer and returns true if it's even, false otherwise. Call it from the main method."
  },
  quiz: {
    question: "What does the 'void' keyword signify in a method signature?",
    options: ["The method returns null", "The method returns 0", "The method does not return a value", "The method is empty"],
    correct: 2
  },
  takeaways: [
    "Encapsulates reusable logic units.",
    "Promotes the DRY (Don't Repeat Yourself) principle.",
    "Defined by their unique signatures."
  ],
  visualizerType: "none"
};
