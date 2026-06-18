// Given an array of strings strs, group the anagrams together. You can return the answer in any order.

 

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]

// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

// Explanation:

// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.


var groupAnagrams = function(strs) {

    // Create a sorted signature for each string
    // For example: "eat" -> ["e","a","t"] -> ["a","e","t"] -> "aet"
    // This creates a unique signature where all anagrams will have the same sorted string
    // Example output for ["eat","tea","tan","ate","nat","bat"]:
    // sortedStrings = ["aet", "aet", "ant", "aet", "ant", "abt"]
    // Notice: "eat", "tea", "ate" all become "aet" (anagrams share the same signature)
    const sortedStrings = strs.map(str => str.split("").sort().join(""))

    // Map to store groups: key = sorted signature, value = array of original strings
    const map = new Map();

    // Iterate through sorted strings to group anagrams
    for (let i = 0; i < sortedStrings.length; i++) {
        const element = sortedStrings[i]; // The sorted signature (e.g., "aet")
        
        // If this signature hasn't been seen before, create a new group
        if (!map.has(element)) {
            map.set(element, [strs[i]]) // Store original string in a new array
        } else {
            // If signature exists, add this string to the existing group
            const currentMapValue = map.get(element);
            currentMapValue.push(strs[i]) // Add original string to the group
            console.log(currentMapValue, strs[i], element);
            
            // Update the map with the modified array
            map.set(element, currentMapValue)
        }
        
    }
    // Return all groups as an array of arrays
    return [...map.values()]
    
};

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
// op - [["bat"],["nat","tan"],["ate","eat","tea"]]

// First sort the array with alphabatical order
// then group by sorted index, not that for loop is looping sortedStrings, but while
// setting map, we set index as sorted element and value as original array
// O(n · k log k) - time complexity
// O(n · k) - space complexity