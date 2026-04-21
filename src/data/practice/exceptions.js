export const exceptionChallenges = [
  {
    id: "exception-division",
    type: "fix-error",
    title: "Safe Division",
    difficulty: "Beginner",
    prompt: "This code causes an ArithmeticException if b is 0. Wrap it in a try-catch to print 'Error' instead of crashing.",
    starterCode: "int a = 10, b = 0;\nint result = a / b;",
    hint: "Use try { ... } catch (ArithmeticException e) { ... }",
    solution: "try {\n    int result = a / b;\n} catch (ArithmeticException e) {\n    System.out.println(\"Error\");\n}",
    xpReward: 100,
    estimatedMinutes: 5
  },
  {
    id: "exception-custom",
    type: "write-method",
    title: "Age Validator",
    difficulty: "Intermediate",
    prompt: "Write a method that throws an 'IllegalArgumentException' if the input 'age' is less than 18.",
    starterCode: "void checkAge(int age) {\n    // TODO: Throw exception if age < 18\n}",
    hint: "Use the 'throw new' keywords.",
    solution: "if (age < 18) throw new IllegalArgumentException(\"Too young\");",
    xpReward: 150,
    estimatedMinutes: 6
  }
];
