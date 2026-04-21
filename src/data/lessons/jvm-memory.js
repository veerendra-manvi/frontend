export const jvmmemoryLesson = {
  slug: 'jvm-memory',
  title: "Stack vs Heap Analysis",
  module: "JVM",
  difficulty: "Advanced",
  duration: "35 mins",
  beginner: {
    explanation: "Java manages memory in two main zones: the Stack (local/temporary) and the Heap (global storage). Understanding this helps you write code that doesn't crash.",
    analogy: "The Stack is like your 'Current Desk'—it only holds what you're working on right now. The Heap is like the 'Supply Warehouse'—it holds all the big items you've built.",
    whyItMatters: "Most tricky Java errors (like memory leaks or slow performance) come from not knowing where your data belongs."
  },
  developer: {
    technical: "The Stack stores thread-local execution frames, primitives, and object references. The Heap is a shared area for all object allocations, managed by the Garbage Collector.",
    bestPractices: [
      "Avoid creating large objects unnecessarily.",
      "Set local variables to null if they are large and no longer needed.",
      "Understand the JVM flags like -Xms and -Xmx for memory tuning."
    ],
    commonMistakes: [
      "Thinking Java is 'Pass-by-Reference' (it's actually Pass-by-Value-of-Reference).",
      "Ignoring memory leaks in long-running applications.",
      "Confusing StackOverflowError with OutOfMemoryError."
    ]
  },
  code: {
    java: `public class Main {
    public static void main(String[] args) {
        int x = 10; // Primitive on Stack
        Object obj = new Object(); // Ref on Stack, Obj on Heap
    }
}`,
    explanationSteps: [
      { line: "int x = 10", desc: "Stored directly in the local stack frame." },
      { line: "new Object()", desc: "Memory allocated in the shared heap pool." }
    ],
    output: "Execution complete."
  },
  practice: {
    prompt: "Visualize the memory change: what happens when you call a method? What happens to its local variables when the method finishes?"
  },
  quiz: {
    question: "Where are actual Objects stored in Java memory?",
    options: ["Stack", "Heap", "Registers", "MetaSpace"],
    correct: 1
  },
  takeaways: [
    "Stack is LIFO and local to threads.",
    "Heap is shared and stores object data.",
    "References connect the Stack to the Heap."
  ],
  visualizerType: "jvmMemory"
};
