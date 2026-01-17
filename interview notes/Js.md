
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

## 2. this in Object Methods

When a function is called as a method of an object, this refers to that object.

```javascript
const user = {
  name: "Akash",
  greet() { 
    console.log(this.name); 
  }
};

user.greet(); // "Akash"  (this = user)
```

## 3. this in Regular Functions

Regular functions get this based on how they are invoked.

```javascript
function show() {
  console.log(this);
}
show();        // global this (window / undefined)
```

## 4. this in Arrow Functions

Arrow functions do not have their own this.

They lexically inherit this from the surrounding scope.

```javascript
const obj = {
  value: 10,
  arrow: () => console.log(this.value)
};

obj.arrow();   // undefined (this comes from global scope)
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