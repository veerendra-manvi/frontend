export const constructorsLesson = {
  slug: 'constructors',
  title: "Constructors",
  module: "Object Oriented Programming",
  difficulty: "Intermediate",
  duration: "12 mins",
  beginner: {
    explanation: "A constructor is a special tool used to set up a new object the moment it's created. It ensures every object starts with the right settings.",
    analogy: "When you buy a 'New Phone', the setup screen (constructor) asks for your name and Wi-Fi password. It makes sure the phone is ready for you to use.",
    whyItMatters: "Without constructors, you'd have 'hollow' objects with no data, which leads to crashes and bugs."
  },
  developer: {
    technical: "Constructors have no return type and must match the class name exactly. If no constructor is Provided, Java adds a 'Default Constructor'. Parameterized constructors allow for strict state initialization.",
    bestPractices: [
      "Use constructors to enforce required dependencies.",
      "Keep logic in constructors minimal (initialization only).",
      "Use 'this' to clear up name conflicts between parameters and fields."
    ],
    commonMistakes: [
      "Giving a constructor a return type like 'void'.",
      "Over-complicating initialization logic.",
      "Not accounting for the loss of the default constructor when adding a custom one."
    ]
  },
  code: {
    java: `class Profile {
    String username;
    
    Profile(String u) { // Constructor
        this.username = u;
    }
}

public class Main {
    public static void main(String[] args) {
        Profile p = new Profile("JavaDev");
        System.out.println(p.username);
    }
}`,
    explanationSteps: [
      { line: "Profile(String u)", desc: "Special 'setup' method that takes initial data." },
      { line: "this.username = u", desc: "Maps the input to the object's field." }
    ],
    output: "JavaDev"
  },
  practice: {
    prompt: "Add a constructor to a 'Book' class that takes a 'title' string. Create two different books using this constructor."
  },
  quiz: {
    question: "Which of the following is true about constructors?",
    options: ["They have a return type", "They must have the same name as the class", "They are called manually after 'new'", "They cannot take parameters"],
    correct: 1
  },
  takeaways: [
    "Used for object initialization.",
    "No return type required.",
    "Must match the class name."
  ],
  visualizerType: "none"
};
