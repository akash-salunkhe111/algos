# ⭐ Spread Operator – Interview Questions
## 1️⃣ What will be the output?
```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
arr2.push(4);

console.log(arr1);
console.log(arr2);
```

Expected output
```javascript
[1, 2, 3]
[1, 2, 3, 4]
```

Why?

[...arr1] creates a shallow copy, so modifying arr2 does not change arr1.

## 2️⃣ What happens here?
```javascript
const arr = [1, 2, 3];
const newArr = [...arr, ...arr];

console.log(newArr);
```

Output
```javascript
[1, 2, 3, 1, 2, 3]
```

Why?

Spread expands both arrays in order → concatenation effect.

## 3️⃣ What will this print?
```javascript
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 10, c: 3 };

const merged = { ...obj1, ...obj2 };

console.log(merged);
```

Output
```javascript
{ a: 1, b: 10, c: 3 }
```

Why?

Later keys (obj2.b) overwrite earlier keys (obj1.b).

## 4️⃣ What happens with nested objects?
```javascript
const user = {
  name: "John",
  address: {
    city: "Mumbai",
  }
};

const copy = { ...user };
copy.address.city = "Pune";

console.log(user.address.city);
```

Output
```javascript
"Pune"
```

Why?

Spread performs a shallow copy, meaning nested objects reference the same memory.

## 5️⃣ Predict the output
```javascript
function test(a, b, c) {
  console.log(a, b, c);
}

const arr = [10, 20, 30];

test(...arr);
```

Output
```text
10 20 30
```

Why?

Spread breaks the array into individual arguments.

## 6️⃣ Tricky spread + rest
```javascript
function calc(x, ...rest) {
  console.log(x, rest);
}

const nums = [1, 2, 3, 4];

calc(...nums);
```

Output
```javascript
1 [2, 3, 4]
```

## 7️⃣ What is the output? (spread with string)
```javascript
console.log([..."abcd"]);
```

Output
```javascript
['a', 'b', 'c', 'd']
```

Why?

Spread operator spreads iterable types (string → chars).

## 8️⃣ Spread with conditional merging
```javascript
const isAdmin = false;

const settings = {
  theme: "dark",
  ...(isAdmin && { access: "all" })
};

console.log(settings);
```

Output
```javascript
{ theme: "dark" }
```

Why?

isAdmin && {...} becomes false, so nothing is spread.

## 9️⃣ Interview: remove duplicate numbers using spread
```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];

const unique = [...new Set(arr)];

console.log(unique);
```

Output
```javascript
[1, 2, 3, 4, 5]
```

## 🔟 Clone array and add element immutably
```javascript
const arr = [1, 2, 3];
const updated = [...arr, 4];

console.log(updated);
```

# ✅ 1. Convert entire Map to array of [key, value] pairs
```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3]
]);

const arr = [...map];

console.log(arr);
```

Output:
```javascript
[ ["a", 1], ["b", 2], ["c", 3] ]
```

# ✅ 2. Convert just keys to array
```javascript
const keys = [...map.keys()];
console.log(keys);
```

Output:
```javascript
["a", "b", "c"]
```

# ✅ 3. Convert just values to array
```javascript
const values = [...map.values()];
console.log(values);
```

Output:
```javascript
[1, 2, 3]
```
