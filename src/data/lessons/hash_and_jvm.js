export const hashmapLesson = {
  id: 'hashmap',
  title: "HashMap Under the Hood",
  path: "Roadmap > Collections > HashMap",
  module: "Collections",
  difficulty: "Advanced",
  time: "30 mins",
  visualizerType: "hashmap",
  beginner: {
    explanation: "A HashMap stores info as pairs of 'Key' and 'Value'. It's like a dictionary: you look up a word (key) to find its definition (value).",
    analogy: "Think of a 'Coat Check'. You give them your coat and get a ticket (key). Later, you give back the ticket to get your specific coat (value).",
    whyItMatters: "HashMap is incredibly fast. No matter how many items you have, finding something by its key usually takes only one step."
  },
  developer: {
    technical: "HashMap uses hashing to map keys to bucket indices. It handles collisions via separate chaining (Linked Lists/Trees).",
    bestPractices: ["Ensure your key objects have consistent hashCode() and equals() methods.", "Set initial capacity if size is known."],
    commonMistakes: ["Using mutable objects as keys.", "Forgetting that HashMap allows one null key."]
  },
  code: {
    java: `import java.util.HashMap;
public class Main {
    public static void main(String[] args) {
        HashMap<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        System.out.println(scores.get("Alice"));
    }
}`,
    explanationSteps: [{ line: "scores.put(\"Alice\", 95)", desc: "Storing a key-value pair." }],
    output: "95"
  },
  quiz: {
    question: "What is the average time complexity for a HashMap lookup?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    correct: 2
  }
};

export const jvmmemoryLesson = {
  id: 'jvm-memory',
  title: "Stack vs Heap Analysis",
  path: "Roadmap > JVM > Memory",
  module: "JVM",
  difficulty: "Advanced",
  time: "35 mins",
  visualizerType: "jvmMemory",
  beginner: {
    explanation: "Java divides memory into two main areas: the Stack (local/temporary) and the Heap (long-term objects). Understanding this prevents crashes!",
    analogy: "The Stack is like your desk (current work), and the Heap is the warehouse (bulk storage). Your desk only holds the addresses of things in the warehouse.",
    whyItMatters: "90% of complex Java bugs (like Memory Leaks or NullPointerExceptions) are caused by not understanding where data lives."
  },
  developer: {
    technical: "The Stack stores primitives and references to objects. The Heap stores the actual objects. Stack memory is thread-private, while Heap is shared.",
    bestPractices: ["Avoid large object allocations inside tight loops.", "Use Profilers to find memory leaks."],
    commonMistakes: ["Thinking parameters are passed by reference (Java is always pass-by-value).", "Unnecessary object creation."]
  },
  code: {
    java: `public class Main {
    public static void main(String[] args) {
        int x = 10; // Stack
        Object obj = new Object(); // Ref on Stack, Obj on Heap
    }
}`,
    explanationSteps: [{ line: "new Object()", desc: "Memory allocated in the shared Heap area." }],
    output: "Execution complete."
  },
  quiz: {
    question: "Where are objects stored in Java memory?",
    options: ["Stack", "Heap", "Method Area", "Registers"],
    correct: 1
  }
};
