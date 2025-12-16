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