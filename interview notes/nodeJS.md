# 🚀 What is Streaming in Node.js?

Streaming in Node.js is a way to process data piece-by-piece (chunks) instead of loading the entire data into memory at once.

Node.js streams allow you to read/write large files or data efficiently, without waiting for the whole data to be available.

***
***
***



# 🔄 Types of Streams in Node.js

Node.js provides 4 types of streams:

1️⃣ Readable Streams

You read data from them.
Examples:

fs.createReadStream()

http.IncomingMessage (request)

2️⃣ Writable Streams

You write data to them.
Examples:

fs.createWriteStream()

http.ServerResponse

3️⃣ Duplex Streams

Both readable and writable.
Examples:

TCP sockets (net.Socket)

4️⃣ Transform Streams

Data is read, transformed, and written.
Examples:

zlib.createGzip()

Encryption streams

***
***
***



# 📌 How Streams Work (Simple Example)
```javascript
const fs = require("fs");

const readable = fs.createReadStream("bigfile.txt");
const writable = fs.createWriteStream("output.txt");

readable.pipe(writable);
```


✔ Reads file in small chunks
✔ Writes chunks to output
✔ No memory overload
✔ No manual handling





***
***
***




# 🔄 What is REPL in Node.js?

REPL stands for:

R – Read
E – Evaluate
P – Print
L – Loop

It is an interactive shell that allows you to write JavaScript code and see results instantly.

You can think of it like the browser console, but for Node.js.



***
***
***


# 🚀 1. Web Workers
What they are:

Web Workers allow JavaScript to run in background threads, separate from the main UI thread.
this feature is provided by browser. it is diff from worker threads

Why they exist:

JavaScript is single-threaded → heavy calculations block the UI.
Web Workers fix this by moving CPU-heavy work off the main thread.

Key Features

Run JavaScript in parallel (background thread)

No access to DOM

Communicate with main thread via postMessage

Ideal for CPU-intensive tasks

Example Use Cases

✔ Heavy calculations
✔ Image/video processing
✔ Large data parsing (JSON, CSV)
✔ Encryption, compression
✔ Machine learning models in browse

# 🛠 2. Service Workers
What they are:

### A Service Worker is a background script that sits between your web app and the internet, acting like a smart middleman or network proxy.

```
It is also a browser feature, browser provides API and we call using js

Key Features

Runs independently of web pages

Can intercept and modify network requests

Can cache assets (HTML, CSS, JS, images)

Does NOT interact with DOM directly

Used for Progressive Web Apps (PWAs)
```

***
***
***



# Multithreading in node js

1. Worker Threads (worker_threads)
Worker Threads allow you to run JavaScript in parallel within the same process. 
Each worker runs its own isolated V8 engine instance but shares the same system memory as the main thread.

Best For: CPU-intensive tasks (e.g., image processing, encryption, complex mathematical calculations).

Memory: They can share memory using SharedArrayBuffer, which makes passing large amounts of data extremely fast because you don't have to copy the data.

Overhead: Low. Starting a thread is "cheaper" than starting a whole new process.

Communication: Uses postMessage() to send data back and forth.


### How many should you spawn?

✅ Rule of thumb:
Number of workers ≤ number of CPU cores

So if you have:
4 cores → 4–6 workers

Why?

Each Worker = real OS thread

Too many workers = context switching overhead

Performance drops beyond core count


2. Child Processes (child_process)
A Child Process is a completely separate instance of the Node.js runtime (or even a different language like Python). 
It has its own memory space, its own PID, and its own V8 instance.

Best For: Running system commands (like ls or git), executing external scripts.

Memory: Completely isolated. They do not share memory.

Overhead: High. Each child process consumes its own memory and CPU resources, similar to opening a new tab in a browser.

Communication: Uses Inter-Process Communication (IPC). Data must be "serialized" (converted to a string/JSON)

***
***
***


# 🔁 JavaScript Event Loop — Full Interview Explanation

JavaScript is single-threaded, meaning it can run one line of code at a time.
But JS can still handle asynchronous tasks (timers, promises, network calls) using the Event Loop.

The Event Loop decides what to run next from different queues


# 🧩 Main Components of the Event Loop

Call Stack

Web APIs (Browser) / C++ APIs (Node.js) LIBUV library

Event Loop

Task Queues / Callback Queues

Microtask Queue (Promise queue) and MacroTask queues (timers)

Rendering Queue (Browser)

# 🔥 Event Loop Flow (High-Level)

JS executes code line-by-line (call stack).

When async code is encountered → moved to Web APIs.

After completion, callbacks go into queues.

Event Loop continuously checks:

If the call stack is empty

If yes → it pulls tasks from queues (based on priority)

when sync code is completed then engine takes tasks from call stack

✔ 1. Microtask Queue (Highest priority)
Contains:

process.nextTick()

Promises (.then, .catch, .finally)

Always executed before any other queue.

✔ 2. Macrotask Queue (Task Queue / Callback Queue)

Contains:

setTimeout

setInterval

setImmediate (Node)

I/O callbacks

DOM events (click, scroll)

MessageChannel


***
***
***


# process.nextTick()
process.nextTick() is a Node.js function that schedules a callback to run:

Immediately after the current operation completes, but before the event loop continues.
It runs after all synchronous code is finished but before any promises or timers


***
***
***