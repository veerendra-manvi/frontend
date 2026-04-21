export const polymorphismLesson = {
  id: 'polymorphism',
  title: "Polymorphism",
  path: "Roadmap > OOP > Polymorphism",
  module: "Object Oriented Programming",
  difficulty: "Intermediate",
  time: "25 mins",
  visualizerType: "inheritance",
  beginner: {
    explanation: "Polymorphism means 'many shapes'. It allows different objects to respond to the same command in their own unique way.",
    analogy: "If you tell various animals to 'Make Sound', the Dog will bark and the Cat will meow. They all follow the same command but execute it differently.",
    whyItMatters: "It makes your code flexible. You can write logic for a generic 'Animal' and it will work for any specific animal you add later."
  },
  developer: {
    technical: "Polymorphism is primarily achieved via Method Overriding (Runtime) and Method Overloading (Compile-time). It allows a parent class reference to point to a child class object.",
    bestPractices: ["Use the @Override annotation.", "Design for extension, or forbid it (final)."],
    commonMistakes: ["Confusing overriding with overloading.", "Assuming private methods can be overridden."]
  },
  code: {
    java: `class Animal { void sound() { System.out.println("Sound"); } }
class Dog extends Animal { void sound() { System.out.println("Bark"); } }

public class Main {
    public static void main(String[] args) {
        Animal myAnimal = new Dog(); // Polymorphic reference
        myAnimal.sound();
    }
}`,
    explanationSteps: [{ line: "Animal myAnimal = new Dog();", desc: "A parent reference pointing to a child object." }],
    output: "Bark"
  },
  quiz: {
    question: "Which relationship does polymorphism heavily rely on?",
    options: ["HAS-A", "IS-A", "USES-A", "PART-OF"],
    correct: 1
  }
};

export const arraylistLesson = {
  id: 'arraylist',
  title: "ArrayList Deep Dive",
  path: "Roadmap > Collections > ArrayList",
  module: "Collections",
  difficulty: "Intermediate",
  time: "20 mins",
  visualizerType: "none",
  beginner: {
    explanation: "An ArrayList is like an array, but it can grow and shrink as you add or remove items. You don't need to know the size ahead of time!",
    analogy: "Think of an 'Accordian Folder'. It expands as you add more papers. Standard arrays are like fixed file cabinets that only hold exactly 10 folders.",
    whyItMatters: "Most real-world data doesn't have a fixed size. ArrayList is the go-to tool for managing dynamic lists of data."
  },
  developer: {
    technical: "ArrayList is a resizable array implementation of the List interface. It uses an internal array that doubles in size when capacity is exceeded.",
    bestPractices: ["Specify an initial capacity if you know the approximate size.", "Use generics (ArrayList<String>)."],
    commonMistakes: ["Removing items during a simple for-loop (causes ConcurrentModificationException).", "Using Primitives instead of Wrappers (ArrayList<int> is invalid)."]
  },
  code: {
    java: `import java.util.ArrayList;
public class Main {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>();
        list.add("Java");
        list.add("Spring");
        System.out.println(list.get(0));
    }
}`,
    explanationSteps: [{ line: "list.add(\"Java\")", desc: "Dynamically adding an element to the list." }],
    output: "Java"
  },
  quiz: {
    question: "What happens when an ArrayList reaches its internal capacity?",
    options: ["It throws an error", "It stops accepting items", "It creates a new larger array and copies elements", "It starts overwriting old items"],
    correct: 2
  }
};
