const result = [];
function flattenNestedAray(arr) {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (Array.isArray(element)) {
            console.log(element);
            
            flattenNestedAray(element)
        } else {
            result.push(element);
        }
    }

    return result

}
  

console.log(flattenNestedAray([1, [2, [3, [4]], 5], 6] ));

