🔍 Difference Between Normal Function and Arrow Function (Interview Answer)
## 1. this Binding

Normal functions have their own this context, which depends on how they are called.

Arrow functions do not have their own this; they lexically inherit this from their parent scope.

Example:

const obj = {
  value: 10,
  normalFn() { return this.value; },
  arrowFn: () => this.value
};

obj.normalFn(); // 10 (works)
obj.arrowFn();  // undefined (arrow takes `this` from outer scope)

## 2. arguments Object

Normal functions have the built-in arguments object.

Arrow functions do not. You must use rest parameters (...args).

function normal() {
  console.log(arguments); // works
}

const arrow = () => {
  console.log(arguments); // error: arguments is not defined
};





🔍 What is this in JavaScript? (Interview Answer)

this in JavaScript is a special keyword that refers to the execution context — meaning the object that is currently calling or owning the function.

In short:
this = the object that a function is executed on.

But its value depends on how the function is called, not where it is written.

## 1. this in Global Context
Browser
console.log(this); // window

Node.js (modules)
console.log(this); // undefined (in strict mode)

## 2. this in Object Methods

When a function is called as a method of an object, this refers to that object.

const user = {
  name: "Akash",
  greet() { 
    console.log(this.name); 
  }
};

user.greet(); // "Akash"  (this = user)

## 3. this in Regular Functions

Regular functions get this based on how they are invoked.

function show() {
  console.log(this);
}
show();        // global this (window / undefined)

## 4. this in Arrow Functions

Arrow functions do not have their own this.

They lexically inherit this from the surrounding scope.

const obj = {
  value: 10,
  arrow: () => console.log(this.value)
};

obj.arrow();   // undefined (this comes from global scope)