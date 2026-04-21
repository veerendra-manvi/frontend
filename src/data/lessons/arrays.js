export const arraysLesson = {
  slug: 'arrays',
  title: "Arrays in Java",
  module: "Java Basics",
  difficulty: "Beginner",
  duration: "18 mins",
  beginner: {
    explanation: "An array is a list of items of the same type stored together. It's like a row of lockers where each locker has a number starting from 0.",
    analogy: "A 'Dozen Egg Carton' is an array. It has exactly 12 slots. You can find an egg by its slot number (index), and it can only hold eggs!",
    whyItMatters: "Arrays allow you to manage thousands of pieces of data with a single name, making your code much more efficient."
  },
  developer: {
    technical: "Arrays are fixed-size, contiguous memory structures. They are objects in Java and are zero-indexed. The length is fixed once the array is instantiated.",
    bestPractices: [
      "Use Enhanced for-loops for simple iteration.",
      "Always check bounds to avoid Exceptions.",
      "Use ArrayList for dynamic sizing needs."
    ],
    commonMistakes: [
      "Off-by-one errors (starting at 1 instead of 0).",
      "Not initializing the array before access.",
      "Attempting to change the size of a fixed array."
    ]
  },
  code: {
    java: `public class Main {
    public static void main(String[] args) {
        String[] fruits = {"Apple", "Banana"};
        System.out.println(fruits[0]);
        System.out.println("Length: " + fruits.length);
    }
}`,
    explanationSteps: [
      { line: "String[] fruits", desc: "Creates a fixed-size container for Strings." },
      { line: "fruits[0]", desc: "Accesses the first item using index zero." }
    ],
    output: "Apple\nLength: 2"
  },
  practice: {
    prompt: "Create an array of 5 integers. Use a loop to print every element in the array."
  },
  quiz: {
    question: "What is the result of accessing an array index that is out of bounds?",
    options: ["It returns null", "It returns 0", "It throws an Exception", "It crashes the computer"],
    correct: 2
  },
  takeaways: [
    "Fixed-size data structures.",
    "Zero-indexed access.",
    "Contiguous memory allocation."
  ],
  visualizerType: "none"
};
