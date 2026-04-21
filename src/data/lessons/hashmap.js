export const hashmapLesson = {
  slug: 'hashmap',
  title: "HashMap Under the Hood",
  module: "Collections",
  difficulty: "Advanced",
  duration: "30 mins",
  beginner: {
    explanation: "A HashMap stores values using 'Keys'. It's like a VIP coat check: you give them your coat and get a ticket (key); later, you give back the ticket to get *your* specific coat.",
    analogy: "Think of a 'Phone Book'. You look up a 'Name' (Key) to find a 'Number' (Value). Even with millions of names, you can find a number very quickly if you have the key.",
    whyItMatters: "HashMap is one of the fastest ways to store and retrieve data in Java, regardless of how many items you have."
  },
  developer: {
    technical: "HashMap uses hashing to map keys to bucket indices. Collisions are handled via separate chaining (Linked Lists/Balanced Trees). Average lookup is O(1).",
    bestPractices: [
      "Ensure keys have high-quality hashCode() and equals() implementations.",
      "Use immutable objects (like String) as keys whenever possible.",
      "Balance the load factor for optimal performance."
    ],
    commonMistakes: [
      "Using mutable objects as keys and changing them after insertion.",
      "Expecting a specific order (HashMap is unordered; use LinkedHashMap for order).",
      "Overfilling a map, leading to high collision rates."
    ]
  },
  code: {
    java: `import java.util.HashMap;
public class Main {
    public static void main(String[] args) {
        HashMap<String, String> capitals = new HashMap<>();
        capitals.put("England", "London");
        capitals.put("France", "Paris");
        
        System.out.println(capitals.get("England"));
    }
}`,
    explanationSteps: [
      { line: "put(\"England\", \"London\")", desc: "Maps the key 'England' to the value 'London'." },
      { line: "get(\"England\")", desc: "Retrieves the value associated with the key instantly." }
    ],
    output: "London"
  },
  practice: {
    prompt: "Create a HashMap to store student names and their scores. Add 3 students, then update the score of one and check if a specific student exists."
  },
  quiz: {
    question: "How does HashMap store its elements?",
    options: ["In sorted order", "In insertion order", "As Key-Value pairs based on hashing", "As a simple linked list"],
    correct: 2
  },
  takeaways: [
    "Stores data as Key-Value pairs.",
    "Order of elements is NOT guaranteed.",
    "Provides near-instant data retrieval."
  ],
  visualizerType: "hashmap"
};
