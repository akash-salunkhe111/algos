# 🚀 What is Streaming in Node.js?

Streaming in Node.js is a way to process data piece-by-piece (chunks) instead of loading the entire data into memory at once.

Node.js streams allow you to read/write large files or data efficiently, without waiting for the whole data to be available.

# 🌊 Why Streams Are Useful?
✔ Handle large files

Instead of loading a 5GB file fully into RAM, you process it chunk-by-chunk.

✔ Better performance & memory usage

Only a small part of data stays in memory at any time.

✔ Faster data handling

You can start processing data as soon as it begins to arrive.

✔ Ideal for real-time data

Such as video streaming, audio, logs, network packets.

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


# process.nextTick()
process.nextTick() is a Node.js function that schedules a callback to run:

Immediately after the current operation completes, but before the event loop continues.
It runs after all synchronous code is finished but before any promises or timers


***
***
***

# Multithreading in node js

1. Worker Threads (worker_threads)
Worker Threads allow you to run JavaScript in parallel within the same process. Each worker runs its own isolated V8 engine instance but shares the same system memory as the main thread.

Best For: CPU-intensive tasks (e.g., image processing, encryption, complex mathematical calculations).

Memory: They can share memory using SharedArrayBuffer, which makes passing large amounts of data extremely fast because you don't have to copy the data.

Overhead: Low. Starting a thread is "cheaper" than starting a whole new process.

Communication: Uses postMessage() to send data back and forth.


### How many should you spawn?

✅ Rule of thumb:
Number of workers ≤ number of CPU cores

So if you have:

4 cores → 4–6 workers

8 cores → 8–12 workers

Why?

Each Worker = real OS thread

Too many workers = context switching overhead

Performance drops beyond core count


2. Child Processes (child_process)
A Child Process is a completely separate instance of the Node.js runtime (or even a different language like Python). It has its own memory space, its own PID, and its own V8 instance.

Best For: Running system commands (like ls or git), executing external scripts, or tasks where you need isolation (if the child crashes, the parent stays alive).

Memory: Completely isolated. They do not share memory.

Overhead: High. Each child process consumes its own memory and CPU resources, similar to opening a new tab in a browser.

Communication: Uses Inter-Process Communication (IPC). Data must be "serialized" (converted to a string/JSON), sent, and "deserialized" on the other end, which is slower than sharing memory.


***
***
***