## Closure
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

