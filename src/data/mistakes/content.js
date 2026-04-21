export const javaMistakes = [
  {
    id: 'm1',
    title: "String Equality Check",
    severity: "Critical",
    buggy: `String s1 = "Java";
String s2 = new String("Java");
if (s1 == s2) { ... }`,
    failReason: "The '==' operator checks for memory address (reference) equality, not content equality. Since s2 is created with 'new', it lives in a different memory location than the s1 in the literal pool.",
    fix: `if (s1.equals(s2)) { ... }`,
    tip: "Always use .equals() for objects and '==' only for primitives (int, boolean, etc.).",
    tags: ["Core", "Strings"]
  },
  {
    id: 'm2',
    title: "Null in ArrayList",
    severity: "High",
    buggy: `List<Integer> list = new ArrayList<>();
list.add(null);
int first = list.get(0);`,
    failReason: "Unboxing a null value into a primitive 'int' throws a NullPointerException.",
    fix: `Integer first = list.get(0);
if (first != null) { ... }`,
    tip: "Be extra careful when mixing Wrappers (Integer) with primitives (int) in collections.",
    tags: ["Collections", "Safety"]
  },
  {
    id: 'm3',
    title: "Infinite Recursion",
    severity: "Medium",
    buggy: `int factorial(int n) {
    return n * factorial(n - 1);
}`,
    failReason: "No base case is provided. This will continue until the Stack overflows.",
    fix: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    tip: "Every recursive method MUST have a reachable base case to stop.",
    tags: ["Logic", "Stack"]
  }
];
