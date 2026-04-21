export const polymorphismLesson = {
  slug: 'polymorphism',
  title: "Polymorphism",
  module: "Object Oriented Programming",
  difficulty: "Intermediate",
  duration: "25 mins",
  beginner: {
    explanation: "Polymorphism is a fancy word for 'Many Shapes'. It allows different objects to behave differently even when they receive the same instruction.",
    analogy: "Think of an 'Artist'. If you tell a painter and a sculptor to 'Create', one paints and the other carves. They both followed the command 'Create', but the result is based on *who* they are.",
    whyItMatters: "It makes your program flexible. You can write code for a generic 'Shape' and it automatically works for Circles, Squares, and Triangles without extra coding."
  },
  developer: {
    technical: "Polymorphism is achieved through Method Overriding (Runtime) and Method Overloading (Compile-time). It allows a single interface to be used for a general class of actions.",
    bestPractices: [
      "Use the @Override annotation to prevent spelling errors.",
      "Program to an interface, not an implementation.",
      "Understand the difference between static and dynamic binding."
    ],
    commonMistakes: [
      "Trying to override static or private methods.",
      "Confusing polymorphism with inheritance (they work together, but are different).",
      "Over-using overloading, leading to confusing API designs."
    ]
  },
  code: {
    java: `class Animal { void sound() { System.out.println("Wait..."); } }
class Cat extends Animal { void sound() { System.out.println("Meow!"); } }
class Dog extends Animal { void sound() { System.out.println("Bark!"); } }

public class Main {
    public static void main(String[] args) {
        Animal myPet = new Cat();
        myPet.sound(); // Executes Cat's version
    }
}`,
    explanationSteps: [
      { line: "Animal myPet = new Cat();", desc: "A variable of parent type holding a child object." },
      { line: "myPet.sound();", desc: "Dynamic binding decides which sound() to run at runtime." }
    ],
    output: "Meow!"
  },
  practice: {
    prompt: "Create a class 'Instrument' with a method 'play()'. Create subclasses 'Guitar' and 'Piano' that override 'play()' and call them using an Instrument reference."
  },
  quiz: {
    question: "When does Method Overriding (Dynamic Polymorphism) occur?",
    options: ["Compile time", "Run time", "When the class is loaded", "Never"],
    correct: 1
  },
  takeaways: [
    "Differentiates compile-time vs runtime behavior.",
    "Promotes extreme code flexibility.",
    "Relies on method overriding."
  ],
  visualizerType: "inheritance"
};
