Here are clean, short Markdown notes on the difference between == and === and when to use which.

## ⚖️ JS == vs === — Short Notes
### 🔹 == (Loose Equality)

Compares values only

Performs type coercion before comparing

Can produce unexpected results

Examples

```javascript
"5" == 5        // true  (string → number)
false == 0      // true
null == undefined // true
"" == 0         // true
```

### 🔹 === (Strict Equality)

Compares value + type

No type coercion

Safer and more predictable

Examples

```javascript
"5" === 5       // false (string vs number)
false === 0     // false
null === undefined // false
0 === 0         // true
```

***
***
***


📝 JS Coercion: + vs Other Operators
## ➕ 1. + Operator → Prefers ToString

When one operand is a string, + performs string concatenation.

JS first tries to convert the other operand using ToString.

Examples

```javascript
"5" + 2      // "52"   (2 → "2")
"Hello " + true   // "Hello true"
"" + 5       // "5"
```


This happens because + has two meanings:

string concatenation

numeric addition

If either operand is a string, JS chooses string concatenation.


***
***
***


## ➗ 2. Other Arithmetic Operators → Use ToNumber

Operators like -, *, /, %, ** always expect numbers, so they trigger ToNumber coercion.

Examples

```javascript
"5" - 1      // 4      ("5" → 5)
"10" * "2"   // 20     (both → numbers)
"8" / "2"    // 4
true - 1     // 0      (true → 1)
null + 5     // 5      (null → 0)
```


Even if a string is involved (except for +), JS will convert it to a number.


***
***
***


### Example questions

```javascript
var y = 1;
if (function f() {}) {
   y += typeof f;
}
console.log(y); // ?
```
✅ Output
```text
1undefined
```
✍️ Short explanation (step-by-step)
function f() {} in an expression position (if ( ... )) is a function expression (a function object). Any function object is truthy, so the if condition is true and the body runs.

typeof f → "undefined" (a string)

y += "undefined" is equivalent to y = y + "undefined".

1 + "undefined" → JavaScript converts number to string and concatenates → "1undefined".

console.log(y) therefore logs the string:

```text
1undefined
```


***
***
***


## console.log(undefined == false)

## 🔍 undefined == false — Result & Explanation
✅ Output
false

## 📝 Why? (Short Explanation)

== (loose equality) in JavaScript performs type coercion, but it follows specific rules.

If one side is undefined and the other is boolean, the result is always false.



***
***
***

📌 JavaScript Hoisting Example Explained
Code
```javascript
var name = 'fvdf';

(function () {
  console.log(name);
  var name = "sdcds";
  console.log(name);
}());
```

🧠 Explanation (Step-by-Step)
### 1. Global variable
var name = 'fvdf';


## 3. Hoisting happens inside the function

The var name inside the function is hoisted:

JavaScript rewrites the function like this:

```javascript
(function () {
  var name;              // hoisted with value undefined
  console.log(name);     // prints undefined
  name = "sdcds";        // assignment happens here
  console.log(name);     // prints "sdcds"
}());
```

🎉 Final Output
```text
undefined
sdcds
```

***
***
***


📌 JS Reference Assignment Example Explained
Code
```javascript
let a = [1, 2, 3];
let b = a;
a = [4, 5, 6];
console.log(b);
```

🧠 Explanation (Step-by-Step)
## 1. let a = [1, 2, 3];

a stores a reference to the array [1, 2, 3] in memory.

## 2. let b = a;

b is assigned the same reference that a currently holds.

So both a and b point to the same array object.

Memory diagram:

a ---> [1, 2, 3]
b ---^

## 3. a = [4, 5, 6];

This does NOT change the old array.

Instead, a is now assigned a new array.

b still points to the old one.

Updated memory:

a ---> [4, 5, 6]

b ---> [1, 2, 3]   (unchanged)

## 4. console.log(b);

b still references the original array, so output is:

```javascript
[1, 2, 3]
```


***
***
***