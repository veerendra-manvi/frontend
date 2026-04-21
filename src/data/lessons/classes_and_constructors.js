export const classesLesson = {
  id: 'classes',
  title: "Classes & Objects",
  path: "Roadmap > OOP > Classes",
  module: "Object Oriented Programming",
  difficulty: "Beginner",
  time: "20 mins",
  visualizerType: "none",
  beginner: {
    explanation: "A class is a blueprint, and an object is the house built from that blueprint. The class defines what a thing *is* and what it can *do*.",
    analogy: "Think of a 'Car Blueprint'. It says every car should have 4 wheels and a color. When you actually build a Red Mustang, that specific car is an 'Object'.",
    whyItMatters: "Classes allow you to organize your code into logical, real-world objects."
  },
  developer: {
    technical: "A class is a template for objects. It contains fields (variables) and methods. Objects are instances of classes.",
    bestPractices: ["Follow the Single Responsibility Principle.", "Keep fields private (Encapsulation)."],
    commonMistakes: ["Confusing classes with objects.", "Hardcoding data that should be in fields."]
  },
  code: {
    java: `class Dog {
    String breed;
    void bark() { System.out.println("Woof!"); }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.breed = "Husky";
        myDog.bark();
    }
}`,
    explanationSteps: [{ line: "Dog myDog = new Dog();", desc: "Creating a new instance (object) of the Dog class." }],
    output: "Woof!"
  },
  quiz: {
    question: "Which keyword is used to create an instance of a class?",
    options: ["create", "new", "instance", "build"],
    correct: 1
  }
};

export const constructorsLesson = {
  id: 'constructors',
  title: "Constructors",
  path: "Roadmap > OOP > Constructors",
  module: "Object Oriented Programming",
  difficulty: "Intermediate",
  time: "15 mins",
  visualizerType: "none",
  beginner: {
    explanation: "A constructor is a special method that runs the moment you create an object. It's used to 'set up' the object with initial values.",
    analogy: "When you sign up for a new app, the 'Setup Profile' screen is like a constructor. It ensures every new user starts with a name and email.",
    whyItMatters: "It prevents 'incomplete' objects. You can force an object to have certain data from the very start."
  },
  developer: {
    technical: "Constructors have the same name as the class and no return type. They are used to initialize the object's state.",
    bestPractices: ["Provide a default constructor if you add parameterized ones.", "Avoid complex logic in constructors."],
    commonMistakes: ["Giving a constructor a return type (it becomes a regular method).", "Not using 'this' to disambiguate parameters."]
  },
  code: {
    java: `class Car {
    String model;
    Car(String m) { // Constructor
        model = m;
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car("Tesla");
        System.out.println(myCar.model);
    }
}`,
    explanationSteps: [{ line: "Car(String m)", desc: "The constructor that accepts initial data." }],
    output: "Tesla"
  },
  quiz: {
    question: "Do constructors have a return type in Java?",
    options: ["Yes, usually void", "Yes, it must be the class type", "No", "Only for static classes"],
    correct: 2
  }
};
