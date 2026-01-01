var firstUniqueChar = function(s) {
    let hashMap = {};

    for(let i = 0; i < s.length; i++) {
        const letter = s[i];

        if(hashMap[letter]) {
            hashMap[letter] = hashMap[letter] + 1
        } else {
            hashMap[letter] = 1;
        }
    }

    for(let i = 0; i < s.length; i++) {
        if (hashMap[s[i]] === 1) {
            return i
        }
    }

    return -1;
};

console.log(firstUniqueChar("loveleetcode")); // 2
