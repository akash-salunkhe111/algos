// Given a string s, find the length of the longest substring without duplicate characters.

 

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.


var lengthOfLongestSubstring = function(s) {
    let store = new Set();
    let counter = 0;
    let leftPtr = 0;
    let rightPtr = 0;

    while (rightPtr < s.length) {
        const letter = s[rightPtr];

        if (!store.has(letter)) {
            store.add(letter);
            counter = Math.max(counter, store.size)
            rightPtr++;
        } else {
            store.delete(s[leftPtr]);
            leftPtr++;
        }
    }
    return counter;

};

console.log(lengthOfLongestSubstring('abcbbcbb'));

// Sliding window
// both ptr starts at same letter
// if we see letter first time then we add it to set and increase right ptr.
// also update counter to max of set size and current counter
// if duplicate element then we delete from left ptr and increment leftPtr

// if we want to return the string and not count then add new variable called currentSub = ""
// and when we update counter also update that string and return it
// if (store.size > counter) {
//     counter = store.size;
//     bestSub = currentSub; // update best
// }