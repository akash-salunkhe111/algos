var isValidParanthesis = function(s) {
    const map = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
    const arr = [];
    for (let i = 0; i < s.length; i++) {
        const element = s[i];

        if(element === "(" || element === "[" || element === "{") {
            arr.push(element)
        } else {
            if(map[arr.pop()] !== element) {
                return false
            }
        }
    }

    return arr.length === 0;
};

console.log(isValidParanthesis("([])"));
