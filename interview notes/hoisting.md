# 🧠 Hoisting in JavaScript (Interview Explanation)

Hoisting is JavaScript’s default behavior of moving variable and function declarations to the top of their scope (global or function) before code execution.

But only declarations are hoisted — not initializations.

## ✔ What gets hoisted?
✅ Function Declarations

Fully hoisted. You can call them before they appear.

sayHello(); // works

function sayHello() {
  console.log("Hello!");
}

✅ var Declarations

Hoisted but initialized as undefined.

console.log(a); // undefined
var a = 10;

❌ let and const

Hoisted but placed in the Temporal Dead Zone (TDZ) → you cannot use them before declaration.

console.log(x); // ReferenceError (TDZ)
let x = 5;

# 💡 Are Arrow Functions Hoisted?
Arrow functions are not hoisted like function declarations.

It depends on how they are defined:

## ❌ Case 1: Arrow function assigned to var
doSomething(); // ❌ TypeError: doSomething is not a function

var doSomething = () => {};


Why?

var doSomething is hoisted as undefined

Calling undefined() → TypeError

# 📌 Temporal Dead Zone (TDZ)

The time between the start of the scope and the line where let or const appears.

Variable exists but is not accessible → Using it causes ReferenceError.


## 🎯 Why TDZ Exists (Its Usefulness)
### 1️⃣ Prevents accidental usage before initialization

Avoids bugs like:

console.log(count); // undefined?? (if var)
var count = 5;




# 🔍 var vs let vs const (JavaScript) — Interview Answer
## 1. Scope
var

Function-scoped

NOT block-scoped

if (true) {
  var x = 10;
}
console.log(x); // 10

let & const

Block-scoped ({ })

if (true) {
  let y = 20;
}
console.log(y); // ❌ ReferenceError

## 2. Hoisting
var

Hoisted and initialized as undefined.

console.log(a); // undefined
var a = 5;

let & const

Hoisted but not initialized → exist in Temporal Dead Zone (TDZ) until their declaration.

console.log(b); // ❌ ReferenceError (TDZ)
let b = 10;

## 3. Re-declaration
var

Can be re-declared in the same scope.

var x = 5;
var x = 10; // allowed

let

Cannot be re-declared in the same scope.

let y = 5;
let y = 10; // ❌ SyntaxError

const

Cannot be re-declared.

## 4. Re-assignment
var — allowed
let — allowed
const — ❌ not allowed
const a = 5;
a = 10; // ❌ TypeError


But object mutation is allowed:

const obj = { a: 5 };
obj.a = 10; // ✔ allowed

## 5. Global Object Behavior
var

Declared in global scope → becomes a property of window (browser).

var a = 10;
console.log(window.a); // 10

let & const

Do not attach to window.