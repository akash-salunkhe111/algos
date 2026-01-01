// Given an integer array nums, find the subarray with the largest sum, and return its sum.

 

// Example 1:

// Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
// Output: 6
// Explanation: The subarray [4,-1,2,1] has the largest sum 6.



function maxSubArray(nums) {
  let maxSub = nums[0];
  let curSum = 0;

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    // we remove the sum if it is less than 0
    if (curSum < 0) {
      curSum = 0;
    }
    curSum += n;
    maxSub = Math.max(maxSub, curSum);
  }

  return maxSub;     // -1
}

// Test with function
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6  (subarray [4,-1,2,1])
console.log(maxSubArray([1]));                     // 1
console.log(maxSubArray([-3, -2, -1]));            // -1   


// Kadane's algo
// Copy
