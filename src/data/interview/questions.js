export const interviewCategories = [
  { id: 'core', title: 'Core Java', icon: 'Coffee', difficulty: 'Beginner' },
  { id: 'oop', title: 'OOP Concepts', icon: 'Layers', difficulty: 'Intermediate' },
  { id: 'collections', title: 'Collections', icon: 'Database', difficulty: 'Intermediate' },
  { id: 'jvm', title: 'JVM Internals', icon: 'Cpu', difficulty: 'Advanced' },
  { id: 'multithreading', title: 'Multithreading', icon: 'Zap', difficulty: 'Advanced' },
  { id: 'coding', title: 'Coding Round', icon: 'Terminal', difficulty: 'Expert' }
];

export const interviewQuestions = [
  {
    id: 'q1',
    categoryId: 'core',
    question: "What is the difference between JDK, JRE, and JVM?",
    answer: "JDK (Java Development Kit) is a software development environment used for making applets and Java applications. JRE (Java Runtime Environment) is a part of the JDK that contains the libraries and executable files. JVM (Java Virtual Machine) is the heart of the Java language that executes the byte code.",
    explanation: "JVM makes Java platform-independent. JRE provides the runtime env. JDK is the full toolbox including compiler (javac).",
    followUp: "Which one do you need to *only* run a Java program?"
  },
  {
    id: 'q2',
    categoryId: 'oop',
    question: "Explain Polymorphism in Java with an example.",
    answer: "Polymorphism allows one interface to be used for a general class of actions. The specific action is determined by the nature of the object.",
    explanation: "Method Overloading (static) and Overriding (dynamic) are the two ways. Overriding uses dynamic binding at runtime.",
    followUp: "Can we override private methods?"
  },
  {
    id: 'q3',
    categoryId: 'jvm',
    question: "What is the role of the JIT Compiler?",
    answer: "The JIT (Just-In-Time) compiler improves the performance of Java applications by compiling bytecodes into native machine code at runtime.",
    explanation: "Instead of interpreting every bytecode, frequently executed code (hot spots) is compiled once and executed directly.",
    followUp: "Where does JIT store the compiled code?"
  }
];
