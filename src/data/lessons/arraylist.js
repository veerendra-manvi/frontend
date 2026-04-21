export const arraylistLesson = {
  slug: 'arraylist',
  title: "ArrayList Deep Dive",
  module: "Collections",
  difficulty: "Intermediate",
  duration: "20 mins",
  beginner: {
    explanation: "An ArrayList is like a regular list of items that can grow and shrink. Unlike standard arrays, you don't have to define its size upfront.",
    analogy: "An array is like a 'Fixed Shelf' with 5 slots. An ArrayList is like an 'Accordian Folder' that expands as you tuck more papers inside.",
    whyItMatters: "Most real-world data (like your shopping cart or a list of messages) changes size constantly. ArrayList handles this automatically."
  },
  developer: {
    technical: "ArrayList is a dynamic array implementation of the List interface. It has an initial capacity and scales by creating a new, larger array and copying elements when full.",
    bestPractices: [
      "Use generics to ensure type safety (ArrayList<String>).",
      "Specify initial capacity if you know the list will be large.",
      "Use 'size()' for the count, not 'length'."
    ],
    commonMistakes: [
      "Accessing an index that hasn't been added yet.",
      "Using the '==' operator to compare two lists (use .equals()).",
      "Performance issues when inserting/removing at the start of large lists."
    ]
  },
  code: {
    java: `import java.util.ArrayList;
public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Java");
        names.add("Spring");
        
        System.out.println(names.get(0));
        System.out.println("Size: " + names.size());
    }
}`,
    explanationSteps: [
      { line: "ArrayList<String>", desc: "Defining a dynamic list for Strings." },
      { line: "names.add()", desc: "Adds an item and updates the internal size." }
    ],
    output: "Java\nSize: 2"
  },
  practice: {
    prompt: "Create an ArrayList of Integers. Add the numbers 10, 20, and 30. Then remove the middle element and print the result."
  },
  quiz: {
    question: "Which interface does ArrayList implement?",
    options: ["Set", "Map", "List", "Queue"],
    correct: 2
  },
  takeaways: [
    "Dynamically resizes as needed.",
    "Part of the Java Collections Framework.",
    "Random access (get/set) is very fast O(1)."
  ],
  visualizerType: "none"
};
