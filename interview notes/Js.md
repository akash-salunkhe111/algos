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

# difference between __proto__ and prototype in js

🟦 prototype
Works on functions

Every function in JavaScript automatically gets a prototype property.

```
function Person() {}
console.log(Person.prototype);
```

Used when creating objects with the new keyword:

```
const p = new Person();
```

p will inherit methods from Person.prototype.

Think:

prototype is used to build the prototype chain for objects created by a constructor function

🟩 __proto__
Works on objects

__proto__ is an internal reference that points to the prototype object from which the object inherits.

```
const obj = {};
console.log(obj.__proto__);
```

This points to Object.prototype.

Think:

```
__proto__ links an object to its prototype.
```

🧠 Relationship

When you do:

```
const p = new Person();
```

Behind the scenes:

```
p.__proto__ === Person.prototype
```

***
***
***

# Prototype inheritance with eg 

```
const person = {
  sayHello() {
    console.log("Hello!");
  },
};

const user = {
  name: "Akash",
};

// make user inherit from person
user.__proto__ = person;

user.sayHello(); // "Hello!"
```

```
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log("Hello from", this.name);
};

const p1 = new Person("Akash");
p1.sayHello(); // Hello from Akash
```

***
***
***