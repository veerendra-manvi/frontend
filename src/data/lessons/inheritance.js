export const inheritanceLesson = {
  slug: 'inheritance',
  title: "The Power of Inheritance",
  module: "Object Oriented Programming",
  difficulty: "Intermediate",
  duration: "20 mins",
  beginner: {
    explanation: "Inheritance allows a new class to take on the characteristics of an existing class. It's about sharing common features to avoid doing extra work.",
    analogy: "Think of a 'Vehicle' as the parent. It has wheels and can move. A 'Car' and 'Bicycle' are its children. They inherit the wheels and the ability to move, but each adds its own extras like an engine or pedals.",
    whyItMatters: "It prevents you from writing the same code over and over for different but related objects."
  },
  developer: {
    technical: "Java uses the 'extends' keyword for inheritance. It creates a 'IS-A' relationship. Subclasses inherit public and protected members of the superclass. Java only supports single class inheritance.",
    bestPractices: [
      "Use inheritance only when a true 'IS-A' relationship exists.",
      "Prefer composition for 'HAS-A' relationships.",
      "Keep inheritance hierarchies shallow (2-3 levels)."
    ],
    commonMistakes: [
      "Inheriting purely for code reuse without logical connection.",
      "Forgetting that constructors are not inherited.",
      "Neglecting the @Override annotation."
    ]
  },
  code: {
    java: `class Vehicle {
    void move() { System.out.println("Moving..."); }
}

class Car extends Vehicle {
    void honk() { System.out.println("Beep!"); }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.move(); // Inherited
        myCar.honk(); // Unique
    }
}`,
    explanationSteps: [
      { line: "class Car extends Vehicle", desc: "The 'extends' keyword builds the family link." },
      { line: "myCar.move()", desc: "The child class can use the parent's methods directly." }
    ],
    output: "Moving...\nBeep!"
  },
  practice: {
    prompt: "Create an 'ElectricCar' that extends the 'Car' class. Add a method 'charge()' and demonstrate that it can still 'move()' and 'honk()'."
  },
  quiz: {
    question: "What keyword is used to create an inheritance relationship in Java?",
    options: ["inherits", "extends", "implements", "super"],
    correct: 1
  },
  takeaways: [
    "Promotes code reusability.",
    "Established a hierarchical relationship.",
    "Managed via the 'extends' keyword."
  ],
  visualizerType: "inheritance"
};
