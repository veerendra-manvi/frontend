export const inheritanceChallenges = [
  {
    id: "inheritance-basics",
    type: "write-method",
    title: "The Electric Inheritance",
    difficulty: "Intermediate",
    prompt: "Create an 'ElectricCar' class that extends 'Vehicle'. Add a 'chargeBattery()' method that prints 'Charging...' and ensure it can still call 'drive()' from the parent.",
    starterCode: "class Vehicle {\n    void drive() { System.out.println(\"Driving...\"); }\n}\n\n// TODO: Implement ElectricCar here",
    hint: "Use the 'extends' keyword and define the new method inside the subclass.",
    solution: "class ElectricCar extends Vehicle {\n    void chargeBattery() { System.out.println(\"Charging...\"); }\n}",
    xpReward: 150,
    estimatedMinutes: 8
  },
  {
    id: "inheritance-override",
    type: "fix-error",
    title: "Polymorphic Bark",
    difficulty: "Beginner",
    prompt: "The code below fails to override the 'makeSound' method correctly. Fix the syntax so the Dog barks properly.",
    starterCode: "class Animal {\n    void makeSound() { System.out.println(\"Generic sound\"); }\n}\n\nclass Dog extends Animal {\n    // Fix the method signature below\n    void make_sound() {\n        System.out.println(\"Bark!\");\n    }\n}",
    hint: "Method names must match exactly to override. Use @Override for safety.",
    solution: "class Dog extends Animal {\n    @Override\n    void makeSound() {\n        System.out.println(\"Bark!\");\n    }\n}",
    xpReward: 100,
    estimatedMinutes: 5
  }
];
