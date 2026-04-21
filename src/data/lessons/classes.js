export const classesLesson = {
  slug: 'classes',
  title: "Classes & Objects",
  module: "Object Oriented Programming",
  difficulty: "Beginner",
  duration: "15 mins",
  beginner: {
    explanation: "A class is a blueprint, and an object is the actual thing you build from that blueprint. It's the foundation of how Java organizes everything.",
    analogy: "Think of an 'Architects Blueprint' for a house. It defines where the walls are and what color the roof is. When you actually build a house from that paper, the house is the 'Object'.",
    whyItMatters: "Classes help you bundle data (what it is) and behavior (what it does) together into neat, reusable packages."
  },
  developer: {
    technical: "A class is a template for objects. It contains state (fields) and behavior (methods). Objects are instances of a class, allocated on the Heap memory.",
    bestPractices: [
      "Keep classes focused on one single purpose.",
      "Use nouns for class names in PascalCase.",
      "Hide data using private fields (Encapsulation)."
    ],
    commonMistakes: [
      "Accessing fields directly instead of using getter/setter methods.",
      "Using static variables when an instance variable is needed.",
      "Logic bloat: putting too much unrelated code in one class."
    ]
  },
  code: {
    java: `class Coffee {
    String flavor = "Mocha";
    void brew() { System.out.println("Brewing..."); }
}

public class Main {
    public static void main(String[] args) {
        Coffee myDrink = new Coffee();
        myDrink.brew();
        System.out.println(myDrink.flavor);
    }
}`,
    explanationSteps: [
      { line: "class Coffee", desc: "The blueprint definition." },
      { line: "new Coffee()", desc: "The 'new' keyword builds the object in memory." }
    ],
    output: "Brewing...\nMocha"
  },
  practice: {
    prompt: "Create a class named 'User' with a String field 'username'. In the main method, create an object of 'User' and print its name."
  },
  quiz: {
    question: "What is the relationship between a class and an object?",
    options: ["They are the same thing", "A class is an instance of an object", "An object is an instance of a class", "Classes are only used for text"],
    correct: 2
  },
  takeaways: [
    "Classes are blueprints for memory allocation.",
    "Objects are active instances in memory.",
    "Encapsulation is key to clean class design."
  ],
  visualizerType: "none"
};
