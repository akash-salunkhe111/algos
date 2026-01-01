var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    let hashMap = {};

    for(let i = 0; i < s.length; i++) {
        const letter = s[i];

        if(hashMap[letter]) {
            hashMap[letter] = hashMap[letter] + 1
        } else {
            hashMap[letter] = 1;
        }
    }

    for (let j = 0; j < t.length; j++) {
        const letter = t[j];
        if(!hashMap[letter] || hashMap[letter] < 1) {
            return false
        } else {
            hashMap[letter] = hashMap[letter] - 1
        }
    }

    return true;
};

console.log(isAnagram('rat', 'car'))

// First check length of strings, if not the same, return false. This is to avoid cases like 'ton' and 'note', where the letters are the 
// same but the length is different.
// Then create a hashMap to count the occurrences of each letter in the first string.
// Then iterate through the second string and check if the letter exists in the hashMap. If it does, decrement the count. If it doesn't, return false.