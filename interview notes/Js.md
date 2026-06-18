🔍 What is this in JavaScript? (Interview Answer)

this in JavaScript is a special keyword that refers to the execution context — meaning the object that is currently calling or owning the function.

In short:
this = the object that a function is executed on.

But its value depends on how the function is called, not where it is written.

## 1. this in Global Context
Browser
```javascript
console.log(this); // window
```

Node.js (modules)
```javascript
console.log(this); // undefined (in strict mode)
```



***
***
***

🔍 Difference Between Normal Function and Arrow Function (Interview Answer)
## 1. this Binding

Normal functions have their own this context, which depends on how they are called.

Arrow functions do not have their own this; they lexically inherit this from their parent scope.

Example:

```javascript
const obj = {
  value: 10,
  normalFn() { return this.value; },
  arrowFn: () => this.value
};

obj.normalFn(); // 10 (works)
obj.arrowFn();  // undefined (arrow takes `this` from outer scope)
```

## 2. arguments Object

Normal functions have the built-in arguments object.

Arrow functions do not. You must use rest parameters (...args).

```javascript
function normal() {
  console.log(arguments); // works
}

const arrow = () => {
  console.log(arguments); // error: arguments is not defined
};
```




***
***
***


# Strict Mode in JavaScript

- **Strict Mode** is a restricted variant of JavaScript
- It helps catch **common bugs**, prevents **unsafe actions**, and enables **better optimizations**

### How to Enable
```
js
"use strict";
```

```
1. Undeclared Variables ❌
x = 10;   // ❌ Error in strict mode


✔ Forces variable declaration (let, const, var)

2. this in Functions
function test() {
  console.log(this);
}
test();


Non-strict: this → window

Strict: this → undefined

3. Duplicate Parameters ❌
function sum(a, a) {} // ❌ Error

```




***
***
***



# difference between __proto__ and prototype in js

🟦 prototype
## Prototype in JavaScript

- JavaScript uses **prototypal inheritance**
- Every object has an internal property called **`[[Prototype]]`**
- Objects can **inherit properties and methods** from another object via the prototype chain

---

## Simple Example

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  return `Hello, I am ${this.name}`;
};

const p1 = new Person("Akash");
console.log(p1.sayHello());
```

```
How It Works

p1 does not have sayHello

JavaScript looks up:

- p1

- Person.prototype

- Object.prototype

- null
```

```
__proto__ vs prototype
p1.__proto__ === Person.prototype // true

Term	Meaning
prototype ->	Property of constructor functions
__proto__	 -> Internal link of an object
```

```
Why Prototypes Matter ⭐

Memory efficient (methods shared)

Enables inheritance

Core to how JS objects work
```

```
ES6 Class (Same Thing Under the Hood)
class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    return `Hello, I am ${this.name}`;
  }
}
```




***
***
***

# Closure
A closure is a function that remembers and can access variables from its outer (enclosing) scope, even after that outer function has finished executing.
It lets functions “keep” their surrounding state.
### Functions with memories

### Let’s run outer again

```javascript
function outer() {
  let counter = 0;

  function incrementCounter() {
    counter++;
    console.log(counter);
  }

  return incrementCounter;
}

const myNewFunction = outer();
myNewFunction(); // 1
myNewFunction(); // 2

const anotherFunction = outer();
anotherFunction(); // 1
anotherFunction(); // 2
```





***
***
***

# 🧠 Hoisting in JavaScript (Interview Explanation)

Hoisting is JavaScript’s default behavior of moving variable and function declarations to the top of their scope (global or function) before code execution.

But only declarations are hoisted — not initializations.

## ✔ What gets hoisted?
✅ Function Declarations

Fully hoisted. You can call them before they appear.

```javascript
sayHello(); // works

function sayHello() {
  console.log("Hello!");
}
```

✅ var Declarations

Hoisted but initialized as undefined.

```javascript
console.log(a); // undefined
var a = 10;
```

❌ let and const

Hoisted but placed in the Temporal Dead Zone (TDZ) → you cannot use them before declaration.

```javascript
console.log(x); // ReferenceError (TDZ)
let x = 5;
```

# 💡 Are Arrow Functions Hoisted?
Arrow functions are not hoisted like function declarations.

It depends on how they are defined:

## ❌ Case 1: Arrow function assigned to var
```javascript
doSomething(); // ❌ TypeError: doSomething is not a function

var doSomething = () => {};
```


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






***
***
***


# 🔍 var vs let vs const (JavaScript) — Interview Answer
## 1. Scope
var

Function-scoped

NOT block-scoped

```javascript
if (true) {
  var x = 10;
}
console.log(x); // 10
```

let & const

Block-scoped ({ })

```javascript
if (true) {
  let y = 20;
}
console.log(y); // ❌ ReferenceError
```

## 2. Hoisting
var

Hoisted and initialized as undefined.

```javascript
console.log(a); // undefined
var a = 5;
```

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

```javascript
let y = 5;
let y = 10; // ❌ SyntaxError
```

const

Cannot be re-declared.

## 4. Re-assignment
var — allowed
let — allowed
const — ❌ not allowed
```javascript
const a = 5;
a = 10; // ❌ TypeError
```


But object mutation is allowed:

const obj = { a: 5 };
obj.a = 10; // ✔ allowed

## 5. Global Object Behavior
var

Declared in global scope → becomes a property of window (browser).

```javascript
var a = 10;
console.log(window.a); // 10
```

let & const

Do not attach to window.



***
***
***


## Guess op
```javascript
console.log('Start');
setTimeout(() => console.log('Timeout 1!'), 0);
Promise.resolve(Promise.resolve('Promise'))
.then(res => console.log('promise 1')).then(res => console.log(`promise 2`))
setImmediate(() => console.log('setImmediate callback'));
process.nextTick(() => console.log('process.nextTick callback'));
console.log('End');
```



```text
Start
end
process.nextTick callback
promise 1
promise 2
Timeout 1
setImmediate callback
```








***
***
***


📘 JavaScript Promises — Cheat Sheet
⭐ What is a Promise?

A Promise represents the result of an asynchronous operation.

States: pending | fulfilled | rejected

```javascript
const p = new Promise((resolve, reject) => {
  resolve("Done");
});
```

⭐ Pending State Example
```javascript
const pending = new Promise((resolve, reject) => {
  // No resolve or reject called yet
  setTimeout(() => resolve("Done"), 5000);
});
console.log(pending); // Promise { <pending> }
```

⭐ Creating & Consuming Promises
```javascript
function task() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("OK"), 1000);
  });
}

task()
  .then(res => console.log(res))
  .catch(err => console.error(err));
```

⭐ Promise Chaining
```javascript
task1()
  .then(r1 => task2(r1))
  .then(r2 => task3(r2))
  .catch(err => console.error(err));
```

⭐ Error Handling
```javascript
doTask()
  .then(() => { throw new Error("fail") })
  .catch(err => console.log("Caught:", err))
  .finally(() => console.log("Always runs"));
```

⭐ Rejection Flow (Chain Skipping)
```javascript
Promise.reject("Error occurred")
  .then(() => console.log("1. Skipped"))
  .then(() => console.log("2. Skipped"))
  .catch(err => console.log("3. Caught:", err))
  .then(() => console.log("4. Chain continues"));
// Output:
// 3. Caught: Error occurred
// 4. Chain continues
```

⭐ Async / Await (syntax sugar for Promises)
```javascript
async function run() {
  try {
    const res = await fetchData();
    console.log(res);
  } catch (e) {
    console.error(e);
  }
}
```

⭐ Microtask Queue (Promise Priority)

Promise callbacks (then/catch/finally) run before macrotasks (setTimeout, etc.).

```javascript
console.log("A");

setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));

console.log("B");
```


Output:

```text
A
B
promise
timeout
```



# 🔥 Promise Combinators — Comparison Table (With Return Type)
| Method                           | When it resolves                                     | When it rejects                    | Return Type                                           |
| -------------------------------- | ---------------------------------------------------- | ---------------------------------- | ----------------------------------------------------- |
| **Promise.all(iterable)**        | When **ALL** promises fulfill                        | If **ANY** promise rejects         | **Promise → Array of results**                        |
| **Promise.allSettled(iterable)** | When **ALL** promises settle (fulfilled or rejected) | **Never rejects**                  | **Promise → Array of `{status, value/reason}`**       |
| **Promise.any(iterable)**        | When the **FIRST fulfilled** promise resolves        | Only if **ALL** promises reject    | **Promise → First successful value**                  |
| **Promise.race(iterable)**       | First promise that settles (fulfilled OR rejected)   | Same — whichever settles first     | **Promise → Value or Error of first settled promise** |
| **Promise.resolve(value)**       | Immediately fulfills with the value                  | —                                  | **Promise → value**                                   |
| **Promise.reject(error)**        | —                                                    | Immediately rejects with the error | **Promise → rejection**                               |




***
***
***


JavaScript Type Coercion Summary

## Coercion in JavaScript is the automatic or manual conversion of one data type to another (like string → number, number → boolean) during operations or comparisons.

JavaScript performs three types of coercions:

```
eg - 
Falsy values (convert to false):

0

"" (empty string)

null

undefined

NaN

Everything else → true
```


***
***
***


# Stack vs Heap

```
JavaScript uses two main memory areas:

Memory Area	Purpose
Stack	Fast, structured memory for execution
Heap	Large, flexible memory for objects

What goes in the stack?
    Primitive values
    Function call frames
    References (addresses) to heap objects


let a = 10;
let b = "hello";
📦 Stored directly in stack (simple, fixed size)

🧺 Heap
What goes in the heap?
    Objects
    Arrays
    Functions (as objects)
    Closures
```





***
***
***

🌐 ESM vs CommonJS
CommonJS (CJS)

Older module system (Node.js default before ES modules)

Uses require() and module.exports

Loaded at runtime

Example:
```
const fs = require("fs");
module.exports = { hello };
```

ES Modules (ESM)

Modern JavaScript standard modules

Uses import and export

Statically analyzable

Example:
```
import fs from "fs";
export const hello = () => {};
```

🔥 Key Differences
| Feature              | CommonJS          | ESM             |
| -------------------- | ----------------- | --------------- |
| Syntax               | require / exports | import / export |
| Load time            | Runtime           | Compile-time    |
| Tree-shaking         | ❌ No              | ✔ Yes           |
| Default for browsers | ❌ No              | ✔ Yes           |
| Node.js support      | Old default       | Now supported   |
| Static analysis      | ❌ Hard            | ✔ Easy          |


So if math.js exports 10 functions, but you only use 1, the bundler (Webpack) can safely remove the other 9 from the final bundle → this is tree-shaking.

***
***
***


# how do we enforce immutable in js

1️⃣ Use const (but know its limit)
```
const user = { name: "Akash" };
user.name = "John"; // ✅ allowed
user = {};          // ❌ not allowed (reassignment)
```

const prevents reassignment of the variable.

It does NOT prevent mutation of the object contents.


2️⃣ Object.freeze() – Shallow immutability
```
const user = Object.freeze({ name: "Akash", address: { city: "Mumbai" } });

user.name = "John";          // ❌ silently ignored (or error in strict mode)
user.address.city = "Pune";  // ✅ still allowed (nested object is mutable)

```
Object.freeze(obj):

prevents adding/removing/changing properties

but only at the top level (shallow)


Even without Object.freeze, you can enforce immutability by convention:

Arrays
```
// ❌ mutation
numbers.push(4);
```

```
// ✅ immutable — create new array
const newNumbers = [...numbers, 4];
const withoutFirst = numbers.slice(1);
const doubled = numbers.map((n) => n * 2);
```

6️⃣ TypeScript readonly (compile-time safety)

TypeScript can prevent mutation at compile time:
```
type User = {
  readonly name: string;
};

const user: User = { name: "Akash" };
user.name = "John"; // ❌ TypeScript error
```

This doesn’t change runtime behavior, but stops mutation in code via type checking.

### uer lib like immutalbe.js


***
***
***

# diff between spread, deep copy and structuredClone

1️⃣ Spread operator (...)

Creates a shallow copy of objects or arrays.
```
const user = { name: "Akash", address: { city: "Mumbai" } };
const copy = { ...user };

copy.address.city = "Pune"; // Affects original!
```

❗ Important

Only copies top-level properties

Nested objects still reference the same memory

So spread is for:

shallow copy

updating immutable state at top level only

merging objects

2️⃣ Object.deepFreeze() (or custom deepFreeze)

Prevents mutation, not copying.
```
const user = deepFreeze({
  name: "Akash",
  address: { city: "Mumbai" }
});

user.address.city = "Delhi"; // ❌ fails
```
❗ Important

Makes object read-only

Enforces immutability

Only stops mutation, does NOT create a copy

Built-in Object.freeze() is shallow, so deepFreeze must be implemented manually

So deepFreeze is for:

runtime immutability

preventing accidental changes

debugging mutation bugs

3️⃣ structuredClone()

Creates a deep clone (copies all nested objects).

```
const user = { name: "Akash", address: { city: "Mumbai" } };

const copy = structuredClone(user);

copy.address.city = "Delhi"; // Does NOT affect original

```

✔ Capabilities

deep copy

handles nested objects

handles arrays

handles Maps, Sets, Dates, RegExp

⚠ Cannot clone:

functions

DOM nodes

So structuredClone is for:

making a separate deep copy

complex data structures

avoid reference sharing

***
***
***

# How do errors propagate inside chained Promises?

❓ When does .catch() NOT get triggered?
1️⃣ Error happens in a separate async callback

(e.g., inside setTimeout)

```
Promise.resolve()
  .then(() => {
    setTimeout(() => {
      throw new Error("boom"); // NOT caught by catch
    }, 0);
  })
  .catch(console.error);
```

Why?

setTimeout callback runs outside the promise chain.

Because setTimeout runs its callback as a separate event, after the current promise chain has finished.

Meaning:

The .then() callback is part of the microtask queue (Promise job)

The setTimeout callback runs in the macrotask queue (timer task)

The promise chain already completed before setTimeout runs

So the error is not part of the promise chain anymore.

🧠 In simple words

Promise .then() finishes first.
Later, setTimeout runs on a different “thread” of execution (event loop cycle), so the .catch() is already done.


3️⃣ You return a value in catch (not rethrowing)
```
Promise.reject("oops")
  .catch(e => "fixed")     // resolved now
  .catch(() => console.log("will NOT run"));
```

If you want error to continue, rethrow:
```
.catch(e => { throw e; })
```

4️⃣ Error occurs after .catch() and no more catch below
```
Promise.resolve()
  .catch(() => {})
  .then(() => { throw "x"; });
// No catch after this → unhandled rejection
```

***
***
***





***
***
***






***
***
***