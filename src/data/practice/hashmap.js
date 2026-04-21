export const hashmapChallenges = [
  {
    id: "hashmap-basics",
    type: "predict-output",
    title: "Key Retreival",
    difficulty: "Beginner",
    prompt: "What will be the output of map.get('Java') after these operations?",
    starterCode: "HashMap<String, Integer> map = new HashMap<>();\nmap.put('Java', 10);\nmap.put('Python', 20);\nmap.put('Java', 30);\n\nSystem.out.println(map.get('Java'));",
    hint: "Think about what happens when you 'put' a value using a key that already exists.",
    solution: "30",
    xpReward: 80,
    estimatedMinutes: 2
  },
  {
    id: "hashmap-iteration",
    type: "write-method",
    title: "Inventory Scanner",
    difficulty: "Advanced",
    prompt: "Write a method that iterates through a HashMap<String, Integer> and prints only the keys whose value is greater than 100.",
    starterCode: "void scanInventory(HashMap<String, Integer> items) {\n    // TODO: Write loop here\n}",
    hint: "Use items.entrySet() or items.forEach().",
    solution: "items.forEach((k, v) -> {\n    if (v > 100) System.out.println(k);\n});",
    xpReward: 250,
    estimatedMinutes: 10
  }
];
