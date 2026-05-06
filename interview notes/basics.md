
<!-- 1 -->
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

### Can we bypass cors using curl or postman ?
```
YES

🔍 What actually happens
In Browser ❌

Browser sends request

Server doesn’t include proper CORS headers

Browser blocks response

You see CORS error

In Postman / curl ✅

Request goes directly to server

Server responds

No CORS check → you get response normally
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
```
A CORS preflight request is an OPTIONS request sent by the browser to check if a cross-origin 
request is allowed before sending the actual request.
It is triggered for non-simple requests, such as those using methods other than 
GET, POST, or HEAD, requests with custom headers (like Authorization), 
or with non-standard content types (like application/json).
```



## Common HTTP Status Codes
✅ Success

200 OK → Request successful

201 Created → Resource created

204 No Content → Success, no response body

❌ Client Errors

400 Bad Request

401 Unauthorized - (Wrong username/password, Expired JWT)

403 Forbidden - (You are logged in, but not allowed to access this resource. User role not allowed (e.g., not admin))

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

