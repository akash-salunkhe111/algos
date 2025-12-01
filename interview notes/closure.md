## Closure
A closure is a function that remembers and can access variables from its outer (enclosing) scope, even after that outer function has finished executing.
It lets functions “keep” their surrounding state.
### Functions with memories

- When our functions get called, we create a live store of data (local
  memory/variable environment/state) for that function’s execution context.
- When the function finishes executing, its local memory is deleted (except the
  returned value)
- But what if our functions could hold on to live data between executions?
- This would let our function definitions have an associated cache/persistent
  memory
- But it all starts with us **returning a function from another function**

### Calling a function outside of the function call in which it was defined

```javascript
function outer() {
  let counter = 0;
  function incrementCounter() {
    counter++;
  }
  return incrementCounter;
}
const myNewFunction = outer();
myNewFunction();
myNewFunction();
```

### The bond

When a function is defined, it gets a bond to the surrounding Local Memory
(“Variable Environment”) in which it has been defined

### The ‘backpack’

- We return incrementCounter’s code (function definition) out of outer into global and give it a new name - myNewFunction
- We maintain the bond to outer’s live local memory - it gets ‘returned out’ attached on the back of incrementCounter’s function definition.
- So outer’s local memory is now stored attached to myNewFunction - even
  though outer’s execution context is long gone
- When we run myNewFunction in global, it will first look in its own local memory first (as we’d expect), but then in myNewFunction’s ‘backpack’ and later in global space


### Let’s run outer again

```javascript
function outer() {
  let counter = 0;
  function incrementCounter() {
    counter++;
  }
  return incrementCounter;
}

const myNewFunction = outer();
myNewFunction();
myNewFunction();

const anotherFunction = outer();
anotherFunction();
anotherFunction();
```

### Individual backpacks

If we run 'outer' again and store the returned 'incrementCounter' function definition in 'anotherFunction', this new incrementCounter function was created in a new execution context and therefore has a brand new independent backpack


### Where to check value
the value of closure is stored in inner function in above case incrementCounter [[Scopes]]
```javascript
console.dir(myNewFunction)
```


Garbage collection

```javascript
function outer() {
  let counter = 0;
  let name = 'asd'
  function incrementCounter() {
    counter++;
  }
  return incrementCounter;
}
const myNewFunction = outer();
myNewFunction();
myNewFunction();
```

here name will be garbage collected by compiler as it is not referenced in inned function

