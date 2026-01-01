// 643. Maximum Average Subarray I
// Companies
// You are given an integer array nums consisting of n elements, and an integer k.

// Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

 

// Example 1:

// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
// Example 2:

// Input: nums = [5], k = 1
// Output: 5.00000



var findMaxAverage = function(nums, k) {
    let windowSum = 0;
    let maxAvg = 0;

    if(k == 1) return nums[0]

    for (let i = 0; i < k; i++) {
        const element = nums[i];
        windowSum = windowSum + element;
    }

    for (let i = k; i < nums.length; i++) {
        const element = nums[i];
        windowSum = windowSum + element - nums[i - k]
        maxAvg = Math.max(maxAvg, windowSum / k)
    }
    return maxAvg;
};

console.log(findMaxAverage([1,12,-5,-6,50,3], 4));


// First create sum of first k elements
// Then iterate through the array and subtract the first element and add the next element
// Then divide the sum by k and update the max average
// Return the max average
