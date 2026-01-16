# when we use lambda for mongodb connections, and mongodb has some defined pool size, but lambdas are triggered in around 1000 at a time, what issue we can face

🚨 The Core Problem

MongoDB has a maximum connection pool size (default ≈ 100–500 depending on server).
But Lambda can easily spawn 1000 separate instances at once.

If each Lambda does this:

const client = new MongoClient(uri);
await client.connect();


It creates a new TCP connection to MongoDB.

💥 1000 Lambdas → 1000 connections
💥 But your MongoDB cluster may allow only ~200–500

This causes connection storm → connection exhaustion.

### ECS completely avoids the Lambda + MongoDB connection storm problem, because ECS runs long-lived containers, not short-lived per-invocation functions.

Let’s break this down clearly.

✅ Why ECS Solves the MongoDB Connection Problem
🔵 1. ECS containers are long-lived

Unlike Lambda, ECS tasks:

start once

stay running for hours/days

handle many requests over their lifetime

Meaning:

Create MongoDB connection once
Reuse 100% of the time


So instead of 1000 Lambdas each opening a connection, you might have:

5 ECS tasks

each with a single MongoDB connection or small pool (e.g., 10)

Result:

Total Mongo connections: ~5–50
Instead of 1000+


### MongoDB Data API is a serverless, HTTP-based API provided by MongoDB Atlas.

Instead of your Lambda connecting to MongoDB via:

TCP

TLS handshake

MongoDB wire protocol

Persistent connection pooling

…you simply call an HTTPS endpoint to run MongoDB operations.

```
const client = new MongoClient(uri);
await client.connect(); // heavy
await client.db("test").collection("users").findOne();
with this:
```

js
```
await fetch(DATA_API_URL, {
  method: "POST",
  headers: { "api-key": API_KEY },
  body: JSON.stringify({
    collection: "users",
    database: "test",
    dataSource: "Cluster0",
    filter: { email: "hello@example.com" }
  })
});
```

### Create a middleware gateway service like ecs where lambda will request to get data


***
***
***

# How password is saved in db ? 

In zoro we use bcrypt to hash password, salt is automatically randomized by bcrypt,
so we save password + salt in single string as it is feature of bcrypt, each user has
unique salt by default in bcrypt.


***
***
***

# What is EC2?

**EC2 (Elastic Compute Cloud)** is a service from aws that lets you rent **virtual servers** in the cloud.

You get:
- Full control over OS (Linux/Windows)
- Choice of CPU, RAM, disk, network
- Ability to run long-running processes

👉 Think of EC2 as **your own server in AWS**.

---

# What is AWS Lambda?

**Lambda** is a **serverless compute service** where you only upload code and AWS runs it **on demand**.

You:
- Don’t manage servers
- Pay only when code runs
- Automatically scale

👉 Think of Lambda as **functions that run only when triggered**.

---

# EC2 vs Lambda (Most Important Interview Table)

| Feature | EC2 | Lambda |
|------|----|-------|
| Server management | You manage servers | AWS manages everything |
| Execution model | Always running | Event-driven |
| Scaling | Manual / Auto Scaling | Automatic |
| Pricing | Pay for uptime | Pay per execution |
| Startup time | Always on | Cold start possible |
| Max runtime | Unlimited | 15 minutes |
| OS access | Full access | No OS access |
| Best for | Long-running apps | Short tasks & events |

---

# When to Use EC2?

Use **EC2** when:

- You need **long-running services**
- You need **custom OS / system-level access**
- You run:
  - Backend APIs
  - Databases
  - Message consumers
  - ML workloads
- Predictable or constant traffic

**Examples**
- Node.js / Java backend server
- Kafka consumer
- Custom monitoring agent
- Game server

---

# When to Use Lambda?

Use **Lambda** when:

- Work is **event-driven**
- Execution time is **short**
- Traffic is **spiky or unpredictable**
- You want **zero server management**



***
***
***

# What is VPC
A VPC (Virtual Private Cloud) is an isolated, software-defined network you create inside a public cloud provider (AWS, GCP, Azure). Think of it as your own private data-center network, carved out within the provider’s global infrastructure.
Below is a precise, discipline-correct definition:

Key Characteristics
1. Logical Network Isolation
Although all customers share the cloud provider’s physical network fabric, your VPC gets:
its own IP space


its own subnets


its own routing domain


its own security boundaries


No other customer can access your VPC unless explicitly allowed.




***
***
***

# Proxy vs Reverse proxy
## Proxy (Forward Proxy)

Sits between client and internet

Hides the client’s identity

Used for access control, caching, anonymity

Example: Corporate proxy, VPN

Flow: Client → Proxy → Server

## Reverse Proxy

Sits between internet and backend servers

Hides the server’s identity

Used for load balancing, security, SSL termination

Example: Nginx, HAProxy, Cloudflare

Flow: Client → Reverse Proxy → Server

One-line difference (easy to remember):
👉 Proxy protects clients, Reverse Proxy protects servers.



***
***
***


# How video download and upload works in s3

## SECURE VIDEO UPLOAD FLOW

```
[ Client ] → [ Server ] → [ S3 ]
```

### Client → Server (Upload Request)

Client sends metadata only:

```
{
  "fileName": "video.mp4",
  "fileSize": "2.4GB",
  "fileType": "video/mp4"
}
```

### Security checks at Server

Authenticate user (JWT / session)

Authorize upload permission

Validate file type & size


## Server → S3 (Prepare Multipart Upload)

### Server:

Creates multipart upload

Generates pre-signed URLs for each chunk

URLs are:

Time-limited

Write-only

Object-scoped

Server returns:

```
{
  "uploadId": "abc123",
  "chunkUrls": [url1, url2, url3...]
}
```

## Client → S3 (Direct Chunk Upload)


Client:

Splits video into chunks (5–10MB)

Uploads chunks directly to S3

Parallel uploads + retries

✅ Server never touches video data
✅ Upload is resumable


## Client → Server (Upload Complete)

Client notifies:
```
{
  "uploadId": "abc123"
}
```

## Server → S3 (Finalize Upload)

Server:

Verifies all parts

Completes multipart upload

Stores metadata in DB

📌 Optional async jobs:

Virus scan

Transcoding

Thumbnail generation





# 🔵 SECURE VIDEO DOWNLOAD FLOW (CONFIDENTIAL)

```
[ Client ] → [ Server ] → [ S3 ]
```

## Client → Server (Access Request)
```
GET /videos/{videoId}/download
Authorization: Bearer <token>
```

## Server (Authorization + Policy Check)

Server verifies:

User identity

Ownership or access rights

Video sensitivity level

🚫 If unauthorized → 403 Forbidden



## Server → S3 (Generate Download URL)

Server generates read-only pre-signed URL:

Expiry: 30–120 seconds

Bound to single object

HTTPS only



## Client → S3 (Direct Download / Stream)

Client:

Streams or downloads video directly

URL expires automatically


***
***
***

# How do we secure api, for senior software developer interview
```
1 - Authentication – Who are you? (JWT)
2 - Authorization – What are you allowed to do? (RBAC (Role-Based Access Control))
3 - HTTPS everywhere
4 - Input Validation & Request Security (sql injection, XSS)
5 - Rate Limiting & Abuse Protection
6 - Secrets Management (vault)
7 - Logging, Monitoring & Auditing
8 - Versioning Apis, make it backward compatible
```



***
***
***

# how do you ensure api remain stable for long periods
```
1 - Strong API Contract (Contract-First Design) (swagger)
2 - Backward Compatibility as a Rule
3 - Idempotency & Deterministic Behavior
4 - Observability & API Health Monitoring
5 - Feature Flags & Dark Launches
```




***
***
***

# what kind of versioning strategies you have used, which do you recommend
```
- Tell about V1 V2 in url
- then tell about sdk or libraries versioning like 1.2.3
MAJOR.MINOR.PATCH
Major is breaking change, minor is backward compotable and patch is simple change
```



***
***
***

# How do you ensure backward compatible api
- tell about version, AB tests




***
***
***

# why statelessness is important
```
1 - Any request can go to any server instance. Easy to add/remove servers
2 - Fault Tolerance & Resilience . If a server crashes, no user session is lost
3 -  Enables Idempotency & Retries. Clients can safely retry requests for payments
```

## When Statelessness Is Not Ideal (Important!)

```
Senior engineers acknowledge trade-offs.

Legitimate State

Long-running workflows

WebSockets

Background jobs

Transactions

Rate-limiting counters
```

## Correct Approach

```
Store state externally, not in memory:

Redis

DB

Message queues
```
***
***
***

# how would you handle partial updates in rest

Updating only some fields of a resource without sending the entire representation.

Example:
```
PATCH /users/123
{
  "email": "new@mail.com"
}
```


***
***
***

# how would you handle async errors in node js
```
1 - Try/catch
2 - middleware for rest errors
3 - logging and monitoring
4 - Different levels of errors
```

***
***
***

# how would you manage dependencies

```
1 - Prefer standard library first
2 - npm audit - Fix vulnerabilities proactively
3 - "Synk" (often spelled Snyk) refers primarily to a popular developer-first security platform for finding and fixing vulnerabilities in code, dependencies, and containers
```
***
***
***

# Performance in React / Next.js

## 📊 How to Measure Performance

### 1. React DevTools Profiler
- Measures component render time
- Detects unnecessary re-renders

### 2. Chrome DevTools (Lighthouse)
- Metrics: **LCP, FID, CLS, TTFB**
```
- **LCP (Largest Contentful Paint):** Time taken for the largest visible element (image/text) to render on screen.
- **FID (First Input Delay):** Time between user’s first interaction and browser’s response.
- **CLS (Cumulative Layout Shift):** Measures unexpected layout movement during page load.
- **TTFB (Time to First Byte):** Time taken for the server to send the first byte of response.
```
- Performance and SEO scoring

### 3. Next.js Web Vitals
```js
export function reportWebVitals(metric) {
  console.log(metric);
}
```
Tracks real-user performance (RUM)

### Network Tab

- Analyze JS bundle size
- Measure API latency
- Waterfall request analysis

### Bundle Analyzer - Identifies large or unused dependencies

# ⚡ How to Optimize Performance
🧠 React-Level Optimizations

Use React.memo to prevent unnecessary re-renders

Use useCallback and useMemo

Avoid inline functions inside render

Virtualize long lists (react-window, react-virtualized)

🚀 Next.js Optimizations

Prefer SSG / ISR over SSR

Use App Router with Server Components

Use dynamic imports (next/dynamic)

Optimize images with next/image

Optimize fonts with next/font

📦 Bundle & Asset Optimization

Enable code splitting

Remove unused dependencies

Lazy-load heavy components

Ensure tree-shaking is effective

🌐 Network & API Optimization

Use CDN caching

Cache API responses

Use SWR or React Query

Enable HTTP compression and HTTP/2

🧪 Rendering Strategy

Reduce hydration using Server Components

Avoid browser-only logic during SSR

Defer non-critical JavaScript

***
***
***

### Measuring & Improving Component Re-rendering

**How to measure:**
- Use **React DevTools Profiler** to see render counts and duration
- Add `console.log()` inside components to detect re-renders
- Enable **why-did-you-render** for debugging unnecessary renders

**How to improve:**
- Wrap components with `React.memo`
- Use `useCallback` for stable function props
- Use `useMemo` for expensive calculations
- Avoid passing new object/array references
- Split large components into smaller ones


***
***
***

# Measuring & Improving Node.js Performance (Interview Short Notes)

## 📊 How to Measure Performance
- **Node.js Profiler (`--prof`)**: Analyze CPU usage and bottlenecks
- **APM Tools**: New Relic, Datadog, Elastic APM
- **Logging & Metrics**: Track latency, throughput, error rates
- **Load Testing**: Artillery, k6, JMeter

---

## ⚡ How to Improve Performance
- Use **async/non-blocking I/O** (use promise.all)
- Avoid CPU-heavy work on main thread (use **Worker Threads**)
- Optimize database queries & add indexes
- Use caching (Redis, in-memory)
- Enable HTTP compression & keep-alive
- Limit concurrency and use backpressure
- Scale with **Cluster mode / PM2**
- Optimize JSON parsing and payload size maybe use grpc




***
***
***

# End-to-End Request–Response Flow

## 1️⃣ User Action
- User enters URL or clicks a button
- Browser initiates an HTTP/HTTPS request

---

## 2️⃣ DNS Resolution
- Domain → IP address via DNS
- Result is cached by browser / OS

---

## 3️⃣ TCP + TLS Handshake
- TCP connection established (3-way handshake)
- TLS handshake for HTTPS (cert verification, encryption)

---

## 4️⃣ HTTP Request Sent
- Method: GET / POST / PUT / DELETE
- Headers: cookies, auth tokens, content-type
- Body (for POST/PUT)

---

## 5️⃣ CDN / Load Balancer
- CDN serves cached content (if available)
- Otherwise forwards request to load balancer
- Load balancer routes to healthy server

---

## 6️⃣ Backend Server Processing
- Request reaches Node.js server
- Middleware runs (auth, logging, validation)
- Controller executes business logic
- DB / cache / external API calls

---

## 7️⃣ Database Interaction
- Query executed (SQL / NoSQL)
- Data fetched or updated
- Response returned to server

---

## 8️⃣ Response Creation
- Server prepares response
- Status code + headers + JSON/HTML
- For SSR: HTML rendered on server

---

## 9️⃣ Response Sent to Client
- Data sent back over network
- Browser receives first byte (TTFB)

---

## 🔟 Browser Processing
- HTML parsed → DOM
- CSS parsed → CSSOM
- JS downloaded & executed
- Hydration (if SSR/Next.js)

---

## 1️⃣1️⃣ UI Update
- React updates Virtual DOM
- Events attached
- Page becomes interactive

---

## 🎯 Interview One-Liner
> *A request flows from the browser through DNS, TCP/TLS, CDN, backend processing, database interaction, and back as a response, which the browser parses, renders, and hydrates to make the UI interactive.*



***
***
***

# Throttling vs Rate Limiting (Short)

## Throttling
- Controls **request speed**
- Delays or slows requests when limit is exceeded
- Ensures system stability under heavy load

**Example:**  
User can send **1 request per second**

---

## Rate Limiting
- Controls **request count**
- Blocks or rejects requests after a fixed limit
- Prevents abuse and DDoS attacks

**Example:**  
User can send **100 requests per minute**

---

# Common Rate Limiting Algorithms

## 1️⃣ Fixed Window
- Counts requests in a fixed time window
- Simple but causes burst traffic at window edges

**Example:**  
100 requests per minute, reset every minute

---

## 2️⃣ Sliding Window
- Uses rolling time window
- Smoother and more accurate than fixed window

---

## 3️⃣ Token Bucket (Most Common)
- Tokens added at fixed rate
- Each request consumes a token
- Allows short bursts

**Used by:** API gateways, AWS, NGINX

---

## 4️⃣ Leaky Bucket
- Requests processed at constant rate
- Extra requests are queued or dropped
- No bursts allowed

---

## 🎯 Interview One-Liner
> *Rate limiting restricts request count, throttling controls request speed; common algorithms include fixed window, sliding window, token bucket, and leaky bucket.*


***
***
***

# AWS Lambda – Pros & Cons (Interview Short)

## ✅ Pros
- **Serverless**: No server management
- **Auto-scaling**: Scales automatically with traffic
- **Pay-per-use**: Charged only for execution time
- **High availability**: Built-in fault tolerance
- **Fast development**: Focus on code, not infra
- **Easy integration**: Works seamlessly with S3, API Gateway, DynamoDB, SQS

---

## ❌ Cons
- **Cold starts**: Higher latency for infrequent invocations
- **Execution limits**: Max 15 minutes runtime
- **Resource limits**: Limited memory, CPU, disk
- **Connection pooling issues**: DB connections don’t scale well
- **Debugging & observability**: Harder than long-running services
- **Vendor lock-in**: Tied to AWS ecosystem
- DB connection issues (the one from mongodb pool eg)


***
***
***

### Sharding (Interview Short)

**Sharding** is a database scaling technique where **large datasets are split into smaller parts (shards)** 
and distributed across multiple servers to improve **performance, scalability, and availability**.

- Each shard holds a **subset of data**
- Queries run in **parallel** across shards
- Reduces load on a single database

**Example:**  
Users with IDs `1–1M` on Shard A, `1M–2M` on Shard B

### Consistent Hashing (Interview Short)

**Consistent hashing** is a technique used to distribute data across multiple servers so that 
**adding or removing a server causes minimal data re-mapping**.

**Why it was needed:**
- Traditional hashing remaps **most keys** when nodes change
- Causes massive cache invalidation and data movement
- Poor for scalable distributed systems

**How it helps:**
- Only a small portion of keys move when a node is added/removed
- Improves scalability and availability

**Used in:**  
CDNs, distributed caches (Redis, Memcached), databases, load balancers


***
***
***

### Pub/Sub vs Fanout (Interview Short)

#### Pub/Sub (Publish–Subscribe)
- Producers publish messages to a **topic**
- Subscribers receive messages based on **subscriptions**
- Subscribers are **decoupled** from publishers
- Each subscriber gets **its own copy**

**Use case:** Event-driven systems, notifications, microservices

### What happens in AWS Pub/Sub

#### Normal flow
1. Producer publishes message to **SNS**
2. SNS fans out to **SQS queues**
3. Consumer processes message
4. Message is **deleted**

---

#### Fanout
- A single message is **broadcast** to multiple consumers simultaneously
- Often implemented via queues or push mechanisms
- Simpler, direct distribution pattern

**Use case:** Sending same event to multiple downstream services

---

### Key Difference
- **Pub/Sub** is a **pattern with topic-based subscriptions**
- **Fanout** is a **distribution strategy** to broadcast messages




***
***
***

### Kafka (Interview Short, Simple Explanation)

**Apache Kafka** is a **distributed event streaming platform** that stores events as 
a **durable, ordered log** and allows multiple consumers to **read and replay data independently**.

### In Simple Terms
> Kafka is like a **commit log** where applications write events, and other applications
 read them at their own pace — even multiple times.

### When Kafka Is Used

- High-volume event streaming
- Data pipelines & ETL
- Real-time analytics
- Log aggregation
- Event-driven microservices
- Systems needing **replay**


--



***
***
***