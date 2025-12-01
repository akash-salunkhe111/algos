📘 JavaScript Promises — Cheat Sheet
⭐ What is a Promise?

A Promise represents the result of an asynchronous operation.

States:

pending

fulfilled

rejected

```javascript
const p = new Promise((resolve, reject) => {
  resolve("Done");
});
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
