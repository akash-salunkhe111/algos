🌐 Core Web Vitals (CWV)

Core Web Vitals are a set of performance metrics defined by Google that measure real-world user experience on a webpage.
They focus on three key aspects:

Loading performance

Interactivity

Visual stability

Google uses these metrics as SEO ranking factors, meaning optimizing them improves both user experience and search engine visibility.

📊 The Three Core Web Vitals
1️⃣ Largest Contentful Paint (LCP) – Loading Speed

Measures:

How long it takes for the largest visible element to appear on screen.

Good score: ≤ 2.5 seconds

Common LCP elements:

Hero image

Heading text

Background image via CSS

Fixes for bad LCP:

Optimize images (compression, WebP)

Use CDN

Remove render-blocking JS/CSS

Server-side rendering or caching

2️⃣ First Input Delay (FID) → replaced by Interaction to Next Paint (INP)

Measures:

How quickly the page responds to the first user interaction (tap, click, key press).

Good FID: ≤ 100 ms
Good INP: ≤ 200 ms

Fixes:

Reduce heavy JavaScript

Split bundles

Avoid blocking main thread

Debounce expensive events

3️⃣ Cumulative Layout Shift (CLS) – Visual Stability

Measures:

How much the layout unexpectedly shifts while loading.

Good score: ≤ 0.1

Examples of bad CLS:

Images loading without size attributes

Ads or banners pushing content down

Lazy-loaded items changing layout

Fixes:

Always set width/height for images

Reserve space for ads or dynamic content

Avoid inserting DOM elements above existing content



***
***
***

# What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a **browser security mechanism** that controls whether a web application running on one origin can request resources from another origin.

An **origin** is defined by:
- **Protocol** (http / https)
- **Domain**
- **Port**

If any of these differ → it’s a **cross-origin request**.

Example:
```
text
Frontend: http://localhost:3000
Backend:  http://localhost:4000
→ Different port → Cross-origin

```

How to Fix CORS Error (Correct Way)
✅ 1️⃣ Fix CORS on the Backend (Best Practice)
Example (Node.js / Express):
const cors = require("cors");
```
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
```

Or manually:
```
res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
```

***
***
***

# REST and HTTP methods

REST (Representational State Transfer)** is an architectural style for designing networked applications.

## Key Principles of REST

### 1️⃣ Stateless
- Each request contains all required information
- Server does NOT store client session state

### 2️⃣ Resource-Based
- Everything is a **resource**
- Identified using URLs


## HTTP Methods (MOST IMPORTANT)

### 🔹 GET
- Fetch data from server
- **No side effects**
- **Idempotent**


### POST

Create a new resource
Not idempotent
❌ Calling twice creates two users

### PUT

Update or replace a resource completely

Idempotent


### PATCH

Partially update a resource

Idempotent (usually)


### DELETE

Remove a resource

Idempotent


### OPTIONS

OPTIONS is used by a client to ask the server:

“What can I do with this resource?”

It tells the client:

Which HTTP methods are allowed

Which headers are accepted

Whether cross-origin requests are permitted


### 🌍 OPTIONS in CORS (MOST IMPORTANT USE)

Browsers automatically send an OPTIONS request before certain cross-origin requests.

This is called a CORS preflight request.



## Common HTTP Status Codes
✅ Success

200 OK → Request successful

201 Created → Resource created

204 No Content → Success, no response body

❌ Client Errors

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

💥 Server Errors

500 Internal Server Error

502 Bad Gateway

503 Service Unavailable



***
***
***

# 🍪 Cookies vs 🧠 Session Storage

| Feature                          | **Cookies**                            | **Session Storage**             |
| -------------------------------- | -------------------------------------- | ------------------------------- |
| **Stored in**                    | Browser + sent to server               | Browser only                    |
| **Size limit**                   | ~4 KB                                  | ~5–10 MB                        |
| **Sent with every HTTP request** | ✅ Yes                                  | ❌ No                            |
| **Accessible from JS**           | ✅ Yes (unless HttpOnly)                | ✅ Yes                           |
| **Expiration**                   | Can expire (via `Expires` / `Max-Age`) | Cleared when tab/browser closes |
| **Scope**                        | Shared across tabs (same domain)       | Tab-specific                    |
| **Security options**             | HttpOnly, Secure, SameSite             | No built-in security flags      |
| **Use case**                     | Authentication, server-side sessions   | Temporary UI/state data         |



***
***
***



***
***
***


***
***
***

