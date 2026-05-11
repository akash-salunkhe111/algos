// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].


function twoSumSorted(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) return [left, right];     // indices in the sorted array
        if (sum < target) left++;
        else right--;
    }
    return [];
}

// Using two pointers to solve the problem

// 1