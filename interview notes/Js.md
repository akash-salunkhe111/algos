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




***
***
***



***
***
***


***
***
***