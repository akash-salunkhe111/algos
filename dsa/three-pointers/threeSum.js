var threeSum = function(nums) {
    const results = [];
    const sortedNums = nums.sort((a,b) => a-b);
    
    for (let i = 0; i < sortedNums.length-2; i++) {
        const fixedElement = sortedNums[i];
        
        let leftPtr = i + 1;
        let rightPtr = sortedNums.length - 1;
        if(i > 0 && sortedNums[i] === sortedNums[i - 1]) continue;

        while(leftPtr < rightPtr) {
            const sum = fixedElement + sortedNums[leftPtr] + sortedNums[rightPtr];

            if (sum === 0) {
                results.push([fixedElement, sortedNums[leftPtr] , sortedNums[rightPtr]])
                leftPtr ++;
            } else if (sum > 0) {
                rightPtr --;
            } else {
                leftPtr ++;
            }
        }
    }
    return results
};

console.log(threeSum([-1,0,1,2,-1,-4]));




// dont try separate function of 2sum and reuse that
// sort first
// use for loop
// in each loop, i will be constant and then do sorted 2sum
// avoid duplicate - if after sorting, we get 1,1,2,2 then check previous element
// if it is same then skip it as it will fetch duplicate (note the if condition to skip has i>0 check to skip first element)
// also for loop has condition less that length - 2 so that inner 2 pointer can be counted

// If condition example
// Example
// Input: [-1, 0, 1, 2, -1, -4]
// After sorting: [-4, -1, -1, 0, 1, 2]
// Without the condition:
// i=1: fixed = -1 → finds [-1, -1, 2], [-1, 0, 1]
// i=2: fixed = -1 → finds [-1, -1, 2], [-1, 0, 1] again (duplicates)
// With the condition:
// i=1: fixed = -1 → finds [-1, -1, 2], [-1, 0, 1]
// i=2: fixed = -1, but sortedNums[2] === sortedNums[1] → skip
// Result: Only unique triplets are added.