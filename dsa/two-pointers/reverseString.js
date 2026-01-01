// Reverse string in place

var reverseString = function(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        const leftElement = s[left];
        const rightElement = s[right];
        s[left] = rightElement;
        s[right] = leftElement;
        left++;
        right--;        
    }
    return s;
};

var basicReverseString = function(s) {
    let result = '';
    for (let i = s.length - 1; i >= 0; i--) {
        const element = s[i];
        result += element;
    }
    return result
};


console.log(reverseString(["h","e","l","l","o"]));
console.log(basicReverseString('hello'));



// Two pointers
// swap places of 2 pointers
