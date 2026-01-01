/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
let first = m - 1;
let second = n - 1;
let i = (m + n) - 1;

while (second >= 0) {
    const firstEle = nums1[first];
    const secondEle = nums2[second];

    if (firstEle > secondEle) {
        nums1[i] = firstEle;
        first--;
        i--;
    } else {
        nums1[i] = secondEle;
        second--;
        i--;    
    }
}
};

console.log(merge([1,2,3,0,0,0], 3, [2,5,6] , 3));


// We have to merge in place
// https://www.youtube.com/watch?v=FhIhUy8bZww
// copy
// if (firstEle > secondEle) {  this if condition should be first, dont make reverse


// merge 2 sorted arrays without space restriction
// function mergeSortedArrays(nums1, nums2) {
//     const merged = [];
//     let i = 0, j = 0;

//     // Merge while both pointers have elements
//     while (i < nums1.length && j < nums2.length) {
//         if (nums1[i] < nums2[j]) {
//             merged.push(nums1[i]);
//             i++;
//         } else {
//             merged.push(nums2[j]);
//             j++;
//         }
//     }

//     // Push remaining elements (if any)
//     while (i < nums1.length) {
//         merged.push(nums1[i]);
//         i++;
//     }

//     while (j < nums2.length) {
//         merged.push(nums2[j]);
//         j++;
//     }

//     return merged;
// }

// // Example
// console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); 
// // Output: [1, 2, 3, 4, 5, 6]