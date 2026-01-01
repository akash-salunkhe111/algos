function segregateBinary(arr) {
    let left = 0;
    let right = arr.length -1;

    while (left < right) {
        if (arr[left] === 1 && arr[right] === 0) {
            // swap
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        } else if(arr[left] === 1 && arr[right] === 1) {
            right--
        } else if(arr[left] === 0 && arr[right] === 1){
            left++
        } else {
            left ++;
        }
    }
    return arr;
}
  
  console.log(segregateBinary([0, 1, 0, 1, 1, 1]));


//   two pointer

//   ✅ Solution 2: Counting Method (Simple & Fast)
// function segregate(arr) {
//   let countZero = 0;

//   // Count zeros
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === 0) countZero++;
//   }

//   // Fill zeros first
//   for (let i = 0; i < countZero; i++) {
//     arr[i] = 0;
//   }

//   // Fill ones next
//   for (let i = countZero; i < arr.length; i++) {
//     arr[i] = 1;
//   }

//   return arr;
// }

// // Test
// console.log(segregate([0, 1, 0, 1, 1, 1]));
// // Output: [0, 0, 1, 1, 1, 1]