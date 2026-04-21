export const codingChallenges = [
  {
    id: 'c1',
    title: "Reverse an Array",
    category: "Arrays",
    difficulty: "Beginner",
    xp: 250,
    prompt: "Write a method to reverse an array of integers in-place.",
    examples: [
      { input: "[1, 2, 3]", output: "[3, 2, 1]" }
    ],
    constraints: [
      "Must be in-place (O(1) extra space)",
      "O(n) time complexity"
    ],
    starterCode: `public class Solution {
    public void reverse(int[] nums) {
        // Your code here
    }
}`,
    solution: `public void reverse(int[] nums) {
    int start = 0, end = nums.length - 1;
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++; end--;
    }
}`,
    hint: "Use two pointers: one at the start and one at the end, then swap them.",
    explanation: "Two-pointer approach is the most efficient. We swap elements from both ends and move towards the center."
  },
  {
    id: 'c2',
    title: "Palindrome Check",
    category: "Strings",
    difficulty: "Intermediate",
    xp: 400,
    prompt: "Determine if a String is a palindrome, ignoring case and non-alphanumeric characters.",
    examples: [
      { input: "'A man, a plan, a canal: Panama'", output: "true" }
    ],
    constraints: ["Ignore case", "Handle special characters"],
    starterCode: `public class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        return false;
    }
}`,
    solution: `public boolean isPalindrome(String s) {
    String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    int i = 0, j = clean.length() - 1;
    while(i < j) {
        if(clean.charAt(i) != clean.charAt(j)) return false;
        i++; j--;
    }
    return true;
}`,
    hint: "Clean the string first using Regex, then compare from both ends.",
    explanation: "Regex [^a-zA-Z0-9] helps remove noise. After cleaning, a simple loop compares symmetric characters."
  }
];
