In JavaScript, the prototype chain is the mechanism by which objects inherit properties from other objects, walking “up” a linked list of prototypes until a property is found or the end (null) is reached.​

Prototype chain basics
Every object has an internal [[Prototype]] link that points to another object (its prototype) or null.​

When you access obj.prop:

JS checks obj itself.

If not found, it checks Object.getPrototypeOf(obj).

It keeps going up until it either finds prop or hits null (end of the chain).​

The top built‑in prototype in the chain for normal objects is Object.prototype, whose prototype is null.​

Small example with Object.create
Here is a minimal example that shows a prototype chain:

js
```
const game = {
  type: "puzzle",
  describe() {
    console.log(`This is a ${this.type} game`);
  },
};

const wordGame = Object.create(game); // [[Prototype]] of wordGame is game
wordGame.type = "word";

const timedWordGame = Object.create(wordGame); // [[Prototype]] of timedWordGame is wordGame
timedWordGame.isTimed = true;

timedWordGame.describe(); // "This is a word game"
console.log(Object.getPrototypeOf(timedWordGame) === wordGame); // true
console.log(Object.getPrototypeOf(wordGame) === game); // true
```

What happens when timedWordGame.describe() is called:

describe is not on timedWordGame itself.

JS looks at wordGame (its prototype) and doesn’t find describe there either.

JS looks at game (prototype of wordGame), finds describe, and calls it with this bound to timedWordGame (so this.type is "word").
This illustrates how a chain like timedWordGame → wordGame → game → Object.prototype → null is traversed.​

Arrow functions vs normal methods in prototypes
Arrow functions behave differently from normal functions in two key ways that matter with prototypes:

Arrow functions do not have their own this; they capture this from the surrounding lexical scope when defined.​

Arrow functions are not suitable as constructor functions and don’t have their own prototype property in the same way as normal functions.​

Using Object.create with methods defined as arrow functions changes how this works:

js
```
const base = {
  // BAD as a prototype method if you rely on `this`
  describe: () => {
    console.log(`Type is: ${this.type}`);
  },
};

const obj = Object.create(base);
obj.type = "arcade";

obj.describe(); // `this` is NOT `obj`, usually ends up being undefined (in strict mode) or the global object
```
Here:

describe is defined as an arrow function, so this is captured from wherever base was created (likely the module/global scope), not from the receiver obj when calling obj.describe().

As a result, this.type does not refer to "arcade" on obj, which is almost never what you want in a prototype method.​

Correct version using a normal function (method syntax):

js
```
const base = {
  // GOOD: regular method with dynamic `this`
  describe() {
    console.log(`Type is: ${this.type}`);
  },
};

const obj = Object.create(base);
obj.type = "arcade";

obj.describe(); // "Type is: arcade"
```
Now:

describe gets this dynamically from the call site (obj.describe()), so this === obj.

The prototype chain still works the same, but the behavior of this is now what is expected in an OO/prototype style.​