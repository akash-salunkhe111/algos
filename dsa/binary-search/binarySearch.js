function binarySearch(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2)

        if (nums[mid] === target) {
            return mid;
        } else if(nums[target] < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return -1;
}

console.log(binarySearch([1,4,6,77,88,99,101,102,108,110], 108));
