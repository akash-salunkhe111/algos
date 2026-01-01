// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

 

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

var twoSum = function(nums, target) {
    const hashMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const neededValue = target - nums[i];        
        if (hashMap.has(neededValue)) {
            return [hashMap.get(neededValue), i];
        }
        hashMap.set(nums[i], i);
    }
    return [];
};

console.log(twoSum([2,7,11,15], 9));
console.log(twoSum([3,2,4], 6));
console.log(twoSum([3,3], 6));

// ============== Problem Solving Tricks & Notes ==============
// 1. Key Insight: Use complement/difference to find pairs
//    const neededValue = target - nums[i];
//    - Example: target=9, current=2, look for 7 (9-2)
// 2 - Add to HashMap after checking if it exists because adding before would cause you to use the same element twice
