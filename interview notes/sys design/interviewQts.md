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

Create MongoDB connection once
Reuse 100% of the time

### MongoDB Data API is a serverless, HTTP-based API provided by MongoDB Atlas.

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

### Create a middleware gateway service like ecs where lambda will request to get data. This service will keep and handle pool of connections


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
- its own IP space
- its own subnets
- its own security boundaries
- No other customer can access your VPC unless explicitly allowed.


***
***
***

# Proxy vs Reverse proxy
## Proxy (Forward Proxy)

Sits between client and internet

Hides the client’s identity

Used for access control, caching, anonymity

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
Code Level - 
1 - Authentication – Who are you? (JWT)
2 - Authorization – What are you allowed to do? (RBAC (Role-Based Access Control))
3 - Input Validation & Request Security (sql injection, XSS)
4 - Security headers like 
(cookie - httpOnly, SameSite, Content-Security-Policy header)
(CSP - to avoid xss, tell browser what scripts (same origin) is allowed to load and execute
httpOnly cookie cannot be accessed by javascript
sameSite-  cookies can be sent only to same domain)
Infra level - 
1 - HTTPS everywhere
2 - Rate Limiting & Abuse Protection
3 - Secrets Management (vault)
4- Logging, Monitoring & Auditing
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
Long-running workflows

WebSockets

Transactions
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
## 1️⃣ Code-Level Optimizations (Component Logic)

- Use `React.memo` to prevent unnecessary re-renders
- Use `useCallback` for stable function references
- Use `useMemo` for expensive computations


## 2️⃣ Rendering Optimizations (DOM & UI)
- Virtualize long lists (`react-window`, `react-virtualized`).
- Use Keys in list.


## 3️⃣ Framework-Level Optimizations (Next.js)
- Use **App Router + Server Components** latest react/nextjs version
- Prefer **SSG / ISR** over SSR
- Lazy-load heavy components
- Enable code splitting
- Use `next/image` for responsive images


## 6️⃣ Data Fetching & State Optimization
- Cache API responses
- Use **SWR / React Query**
- Browser cache

## 7️⃣ Network & Infrastructure Optimizations
- Use CDN for static assets
- Enable HTTP compression (gzip / brotli)

## other js related
- Ensure effective tree-shaking
- Remove unused dependencies

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
- Use keys in list


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
### Code level
- Use **async/non-blocking I/O** (use promise.all)
- Avoid CPU-heavy work on main thread (use **Worker Threads**)

### DB level and caching
- Optimize database queries & add indexes
- Use caching (Redis, in-memory)

### Network and protocol level
- Enable HTTP compression & keep-alive
- Scale with **Cluster mode / PM2**
- Use graphql and keep payload size small
- use http2/grpc



***
***
***


# Throttling vs Rate Limiting (Short)

## Throttling
- Controls **request speed**
- Delays or slows requests when limit is exceeded (in queue for graceful degradation)
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

## Where it is configured
```
Primarily at infra level, optionally at code level for business logic.

Lambda Concurrency (Implicit Throttling)
- Lambda has concurrency limits
- If exceeded → 429 Too Many Requests

API Gateway (PRIMARY – Best Choice)
- We can do Account-Level Throttling (The Safety Net)
- Stage-Level Throttling (The API-Wide Limit)
This allows you to set limits for a specific stage (like prod or dev) within a single API
- Usage Plan Throttling (The Per-Client Limit)
This is the most common method for businesses (like Experity) because it lets you limit individual customers using API Keys.


AWS WAF (Web Application Firewall)
- Rate-based rules
Example:
Block IP if > 2000 requests in 5 minutes
```


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

# When to use microservice vs monolith
## Monolith vs Microservices – When to Use

### ✅ Use Monolith When
- Small or early-stage product
- Team size is small
- Requirements are simple & stable
- Need fast development and deployment
- Want easier debugging & testing
- Low operational complexity

📌 Example: MVP, internal tools, early startup apps

---

### ✅ Use Microservices When
- Large and complex application
- Multiple teams working in parallel
- Independent scaling is required
- High traffic on specific features
- Different services need different tech stacks
- High availability & fault isolation is important

📌 Example: E-commerce, streaming platforms, fintech systems

---

## Key Trade-offs

| Factor | Monolith | Microservices |
|----|--------|-------------|
| Deployment | Simple | Complex |
| Scalability | Whole app | Per service |
| Performance | Faster (in-process) | Network latency |
| Fault Isolation | Poor | Strong |
| DevOps Overhead | Low | High |
| Tech Flexibility | Low | High |

---

## ⭐ Interview One-Liner
> Start with a monolith, move to microservices when scale, team size, or complexity demands it.

***
***
***

# How to Move from Monolith to Microservices (Short)

1. **Identify Bounded Contexts**
   - Split by business domains (users, orders, payments)

2. **Start with One Service**
   - Extract a low-risk, high-value module first

3. **Use Strangler Pattern ⭐**
   - New requests go to microservice, New functionality is built as **microservices**
   - Traffic is **gradually redirected** to new services
   - Old monolith code is **slowly removed**

4. **Separate Database**
   - Each microservice owns its own data
   - Avoid shared DBs

5. **Introduce API Layer**
   - Use API Gateway for routing & security

6. **Add Observability**
   - Logging, monitoring, tracing before scaling

7. **Handle Communication**
   - Sync (REST/GraphQL)
   - Async (Events / queues)

8. **Automate CI/CD**
   - Independent deploys per service

---

## ⭐ Interview One-Liner
> Move incrementally using the strangler pattern by extracting domain-based services while keeping the monolith running.





***
***
***

# ECS vs EC2
```
Use EC2 if:

- Full OS Control: You need to install custom drivers, specialized software, or specific kernel configurations, GPUS.

Use ECS if:

- Microservices: You are building a modern app with many small, independent parts.

- Standardization: You want your "Dev" and "Prod" environments to be identical using Docker.

```


***
***
***

```
suppose i am using aws lambda for user-service, and then when user requests userInfo, the lambda is started, it is cold at the start and then it takes time to create connection then after 15 mins it stops, again 2nd requests come, most of the time is spent in making lambda hot again, how to avoid this
```

Answer - 
```
1. Provisioned Concurrency (The "Always Hot" Solution)
This is the most direct way to eliminate cold starts. You tell AWS to keep a specific number of execution environments "pre-warmed" and ready to respond.

How it works: AWS initializes the environment, downloads your code, and runs your global setup (like DB connections) before a request ever arrives.

Trade-off: You pay for this capacity 24/7 (or on a schedule), even if no one is using the service. It is great for predictable high-traffic periods.


2 Move User-Service to ECS (If Very Latency Sensitive)

If:

User-service is hit frequently

Needs persistent DB connections

Sub-100ms latency required

👉 ECS/Fargate is better

Lambda is best for:

Spiky traffic

Event-driven workloads



3. RDS Proxy (The "Connection Pooler")
If your Lambda is slow because it’s struggling to negotiate a new TLS handshake or connection with a database (like MySQL or Postgres) every time, you should use Amazon RDS Proxy.

The Problem: Traditional databases aren't built for the "connect-query-disconnect" cycle of thousands of Lambdas.

The Solution: RDS Proxy sits between Lambda and your DB. It maintains a "warm pool" of database connections. When your Lambda starts up, it connects to the Proxy (which is nearly instant) instead of the database.


```



***
***
***


# Cacheing in frontend

```
Browser Cache
  ↓
Next.js Cache (Data & HTML) - eg SSG
  ↓
CDN Cache (Vercel / CloudFront)
  ↓
App-level Cache (Memory / SWR / React Query)


Browser Cache (HTTP Caching)
- Uses HTTP headers
- Cache-Control: public, max-age=3600

```



***
***
***

## When to Use React vs Next.js

### ✅ Use React.js When
- Building a **Single Page Application (SPA)**
- App is **highly interactive** (dashboards, admin panels)
- SEO is **not important**


📌 Examples:
- Internal tools
- Admin dashboards

---

### ✅ Use Next.js When
- SEO is **important**
- Need **server-side rendering (SSR)** or **static generation (SSG)**
- Public-facing websites
- Faster initial page load required
- Want full-stack capabilities (API routes)

📌 Examples:
- Blogs
- E-commerce sites
- Marketing pages
- Content-heavy apps

---

## Quick Decision Rule ⭐
- **Public, SEO-driven app → Next.js**
- **Private, interaction-heavy app → React**

---

## Interview One-Liner
> Use React for client-heavy SPAs and Next.js for SEO-friendly, production-ready web applications that need server-side rendering.

***
***
***

## `next/image` in Next.js

```
- `next/image` is a built-in **image optimization component** in Next.js
- Automatic **image resizing**
- **Lazy loading** by default
- Compresses image
- Serves images in modern formats (WebP/AVIF)
- Responsive images for different screen sizes
```

***
***
***

## Core Web Vitals (Short)

### 1️⃣ LCP – Largest Contentful Paint
**What:** Time taken to load the largest visible content  
**Good:** ≤ 2.5s  

**Improve by:**
- Use `next/image`
- Use CDN & caching
- Optimize server response (SSR / SSG)
- Reduce JS & CSS blocking

---

### 2️⃣ INP – Interaction to Next Paint
**What:** Responsiveness to user interaction  
**Good:** ≤ 200ms  

**Improve by:**
- Reduce heavy JS execution
- Code splitting & lazy loading
- Use `useCallback` / `useMemo`
- Avoid long main-thread tasks

---

### 3️⃣ CLS – Cumulative Layout Shift
**What:** Visual layout stability  
**Good:** ≤ 0.1  

**Improve by:**
- Always set image width & height
- Reserve space for ads & embeds
- Avoid injecting content above the fold
- Use stable fonts (`font-display: swap`)

---

## Supporting Metrics

### ⚡ FCP – First Contentful Paint
- Load critical CSS early
- Optimize fonts

### ⏱️ TTFB – Time To First Byte
- Use CDN
- Cache responses
- Improve backend latency

---

## Interview One-Liner ⭐
> Core Web Vitals measure loading performance (LCP), interactivity (INP), and visual stability (CLS), and are improved through caching, image optimization, reducing JavaScript, and stable layouts.



***
***
***

# explain langchain
## LangChain (Short Explanation)

- LangChain is a **framework for building LLM-powered applications**
- It helps connect **LLMs with data, tools, and workflows**
- Used to build **chatbots, RAG systems, agents, and pipelines**

---

## What LangChain Provides

- **Prompt templates** – reusable prompts
- **Chains** – multi-step LLM workflows
- **Memory** – conversation state
- **Retrievers** – connect vector databases
- **Agents** – LLMs that can use tools dynamically

---

## Common Use Cases
- Retrieval-Augmented Generation (RAG)
- Chatbots with memory
- Document Q&A
- Tool-using AI agents

---

## Interview One-Liner ⭐
> LangChain is a framework that simplifies building LLM applications by chaining prompts, models, tools, and data sources together.



***
***
***

# HTTP Status Codes (Interview Overview)

HTTP status codes indicate the **result of an HTTP request** and are grouped by range.

---

## 1xx – Informational
Request received, processing continues.

- **100 Continue** → Server ready to receive request body

📌 Rarely handled directly in apps

---

## 2xx – Success
Request successfully processed.

- **200 OK** → Successful GET/PUT
- **201 Created** → Resource created (POST)
- **204 No Content** → Success, no response body (DELETE)

📌 Most common success responses

---

## 3xx – Redirection
Client must take additional action.

- **301 Moved Permanently** → SEO-friendly redirect
- **302 Found** → Temporary redirect

📌 Used for routing & caching

---

## 4xx – Client Errors
Problem with the request.

- **400 Bad Request** → Invalid request data
- **401 Unauthorized** → Authentication required
- **403 Forbidden** → Authenticated but not allowed
- **404 Not Found** → Resource doesn’t exist
- **429 Too Many Requests** → Rate limit exceeded

📌 Indicates client-side issue

---

## 5xx – Server Errors
Server failed to handle valid request.

- **500 Internal Server Error** → Generic server failure
- **502 Bad Gateway** → Invalid response from upstream service
- **503 Service Unavailable** → Server overloaded / down
- **504 Gateway Timeout** → Upstream service timeout

📌 Indicates backend or infrastructure issues

---

## Interview Tip ⭐
- 4xx → Client fault
- 5xx → Server fault
- 429 → Throttling / rate limiting


***
***
***

# SNS-SQS


## SNS–SQS (Interview Explanation)

### SNS (Simple Notification Service)
- **Pub/Sub messaging service**
- One message → **multiple subscribers**
- Does **not store messages**
- Push-based delivery

---

### SQS (Simple Queue Service)
- **Message queue**
- Messages are **stored until consumed**
- Pull-based
- Ensures **reliable delivery**

---

## SNS + SQS Together (Very Common ⭐)

### Why Combine Them?
- SNS for **fan-out**
- SQS for **durability & buffering**

---

## How It Works
1. Producer publishes message to **SNS**
2. SNS pushes message to **all subscribed SQS queues**
3. Each service consumes from its own queue
4. Messages persist until processed


***
***
***


# Explain difference  between S3, EBS and EFS

```
Amazon S3 (Simple Storage Service)
What it is

Stores data as objects (files + metadata + ID)

Accessed via HTTP / REST APIs

Common use cases

 - Static website hosting

 - Media storage (images, videos)

```

```
Amazon EBS (Elastic Block Store)
What it is

Acts like a virtual hard disk

Attached to one EC2 instance at a time


Common use cases

- Databases (MySQL, PostgreSQL)
- Applications requiring fast disk access


Amazon EFS (Elastic File System)

What it is

Managed shared file system

Multiple EC2 instances can mount it simultaneously

Common use cases

 - Shared application code

 - Microservices shared storage
 
 - CI/CD build artifacts
```



***
***
***

# what is optimistic and pessimist locking in db

### When 2 threads ties to update same row, we face inconsistency, to avoid this, we have lockings

```
Pessimistic Locking

- DB locks the row immediately

- Other transactions must wait or fail

- Lock held until commit / rollback

What happens

- Transaction A locks row

- Transaction B tries → blocked


Typical use cases - Bank account balance, Inventory stock deduction, Seat booking systems
Where stong consistency is needed

```


```
Optimistic Locking

How it works

- No lock while reading

- Update succeeds only if data hasn’t changed

- Uses version / timestamp

When thread 1 changes data, it also changes version number.
when thread 2 changes, i faces error as version has changed

UPDATE accounts
SET balance = 900, version = version + 1
WHERE id = 1 AND version = 5;

If rows affected = 0 → conflict detected


Pros

✅ High concurrency
✅ No blocking
✅ Scales very well
```


```
In Distributed Systems (Important)

In microservices:

 - DB locks don’t work across services

 - Optimistic locking + retries is preferred

 - Use saga pattern

```


```
## 🔄 Saga Pattern (Microservices) — Interview Short

**Saga Pattern** is a way to manage **distributed transactions** in microservices **without using database locks or 2-phase commit**.

Instead of one global transaction:
- Each service performs a **local transaction**
- Publishes an **event**
- If a step fails, **compensating actions** undo previous steps

---

### 🧩 How It Works (Example: Order Flow)

1. **Order Service**
   - Create order
   - Emit `ORDER_CREATED`

2. **Payment Service**
   - Charge payment
   - Emit `PAYMENT_SUCCESS`
   - ❌ On failure → emit `PAYMENT_FAILED`

3. **Inventory Service**
   - Reserve stock
   - Emit `STOCK_RESERVED`
   - ❌ On failure → trigger refund

4. **Compensation (if needed)**
   - Refund payment
   - Release stock
   - Mark order as `CANCELLED`

➡️ System reaches **eventual consistency**

---

### 📌 Saga Types

| Type | Description |
|----|-----------|
| **Choreography** | Services communicate via events (no central controller) |
| **Orchestration** | Central saga orchestrator controls the flow |

---

### ✅ Why Use Saga Pattern

- No distributed locks
- Scales well
- Works across independent databases
- Handles partial failures safely

---

### ⚠️ Trade-offs

- Eventual consistency
- Complex debugging
- Requires idempotency & retries

---

### 🎯 Interview One-Liner

> **Saga pattern manages distributed transactions by breaking them into local steps with 
compensating actions, ensuring eventual consistency without global locks.**

```

***
***
***

# Use state vs use Ref
```
If we want UI to rerender, use useState or else use useRef.
Both are use to store data.
sometimes useRef is used to store the previous state values

useRef is also use to access html element

```

***
***
***

# Server Components (App Router) vs  getServerSideProps

```
Server Components move data fetching into the component itself and eliminate sending data 
as JSON to the browser, unlike getServerSideProps.

Execution Flow
getServerSideProps

Request
 → getServerSideProps()
 → Page component
 → JSON props + HTML
 → Client hydration



Server Components

Request
 → Server Component fetch()
 → HTML stream
 → Client hydrates only Client Components



Data Freshness Control (Big Win)
Server Components - 
fetch(url, { cache: "no-store" }) // SSR
fetch(url, { next: { revalidate: 60 } }) // ISR
fetch(url) // SSG (default)



getServerSideProps - 
Always SSR — no caching control



```



***
***
***

# What is MCP

- The Model Context Protocol is an open-source standard that allows AI applications to connect seamlessly with external data sources and tools. 
- MCP standardizes how Large Language Models (LLMs) "talk" to databases, Google Drive, Slack, or local files.

```
MCP Host: The AI application or environment where the model lives (e.g., Claude Desktop, an IDE like Cursor, or a custom chatbot).

MCP Client: The component within the host that initiates connections and handles the protocol's "handshake."

MCP Server: A lightweight program that exposes specific data or tools (e.g., a "Postgres MCP Server" that lets the AI query a database).
```

***
***
***


### ACID Properties
## 1️⃣ Atomicity — “All or nothing”

A transaction must either complete fully or not happen at all.

✔ If one step fails → entire transaction is rolled back
✔ No partial updates

Example

Bank transfer:

Debit ₹500 from A

Credit ₹500 to B

If credit fails → debit is rolled back.

## 2️⃣ Consistency — “Valid state → valid state”

The database must always move from one valid state to another valid state, following all rules:

data types

constraints

foreign keys

unique rules

business logic

Example

If a column requires a unique email, the DB must prevent duplicates.

## 3️⃣ Isolation — “Transactions don’t interfere”

Multiple transactions running at the same time should not affect each other’s results.

Different isolation levels avoid problems like:

Dirty reads

Non-repeatable reads

Phantom reads

Example

Two people booking the last movie ticket at the same time — isolation ensures only one succeeds.

## 4️⃣ Durability — “Once committed, it stays”

After a transaction is committed:

power failure

crash

system reboot

…should NOT remove the committed data.

Databases use:

Write-ahead logs

Disk flush

Replication

Backups

To guarantee durability.


***
***
***

# CAP
```
## What is CAP Theorem?
**CAP theorem** states that in a **distributed system**, you can **guarantee only two 
out of three** properties at the same time:

When a **network partition** happens, the system must choose between **Consistency** and **Availability**.

## 1️⃣ Consistency (C)
- Every read receives the **latest write**
- All nodes see the **same data at the same time**
- Similar to a single-node system
**Example:**
- After updating user profile, any service reading it gets the updated
 data immediately.

## 2️⃣ Availability (A)
- Every request gets a **response** (success or failure)
- System never returns “no response”
- Response may be **stale data**

**Example:**
- Recommendation service always responds even if data is slightly outdated.



## 3️⃣ Partition Tolerance (P)
- System continues to operate despite **network failures**
- Nodes cannot communicate with each other

**Example:**
- Network issue between two microservices or between repla sets or pods of db.

👉 **In distributed systems, P is non-negotiable**  
(Network failures WILL happen)

## Why You Can’t Have CA in Distributed Systems
### CA = Consistency + Availability (❌ No Partition Tolerance)

This only works if:
- System runs on **single node**
- OR network is **100% reliable** (not realistic)

### What happens during a partition?

Imagine:
- Service A and Service B both have a copy of data
- Network breaks between them

Now a request comes to Service B:

| Choice | Result |
|------|-------|
| Maintain Consistency | Service B must **reject request** → ❌ Availability |
| Maintain Availability | Service B must **serve stale data** → ❌ Consistency |
```


👉 **You must sacrifice either C or A**

Hence, **CA systems cannot exist once a partition occurs**

***
***
***

# Example of wrapper/integration service
```
Client clicks "Pay"
 ↓
API Gateway authenticates
 ↓
Order Wrapper starts saga
 ↓
Inventory reserved (sync)
 ↓
Order created (sync)
 ↓
Payment captured (sync)
 ↓
Order confirmed
 ↓
OrderConfirmed event emitted
 ↓
Email sent (async)
 ↓
Analytics updated (async)

```
```
here order-wrapper has both sync and async operations
Why not make everything async?

Because inventory and payment are part of a critical transaction and must be confirmed 
before completing checkout. Non-critical operations are async to reduce 
latency and improve reliability.
```

***
***
***

# How do you handle transaction in document based db

```
1. The First Rule: Atomic Document Operations
In MongoDB, any write operation on a single document is atomic by default. 
This means if you update 10 fields inside one document, it either all succeeds or all fails.
The Strategy: Use Embedded Documents. Instead of having a Users table and a Settings table,
put the settings inside the user document. You now have "transaction-like" safety without the performance 
hit of a formal transaction.

2. Multi-Document Transactions (ACID)
In MongoDB, Multi-Document Transactions allow you to group multiple read/write operations together. They follow the ACID principle: either every operation in the group succeeds, or none of them are applied to the database.


Here is the breakdown of how the process actually works under the hood.

1. The Core Prerequisites
Before you can run a transaction, two things must be true:

WiredTiger Storage Engine: You must be using this engine (it's the default since MongoDB 3.2).

Replica Sets or Sharded Clusters: Transactions rely on the Oplog (operations log) to synchronize data across nodes. They do not work on "Standalone" instances.


2. The Transaction Workflow (Step-by-Step)
MongoDB uses a Snapshot Isolation model. When a transaction starts, it takes a "snapshot" of the data.

Start a Session: You first create a ClientSession. This is the container that tracks all your operations.

Start Transaction: You call session.startTransaction(). At this point, no data has changed yet.

Execute Operations: You perform your update, insert, or delete commands. 
Important: You must pass the { session } object into every command so MongoDB knows they belong to that transaction.

Pending State: While the transaction is open, other users looking at the database cannot see your changes yet. 
They still see the "old" data.

Commit: When you call session.commitTransaction(), the changes are written to the Oplog and made visible to everyone simultaneously.

Abort/Rollback: If any error occurs (or you call abortTransaction()), MongoDB discards all pending 
changes in that session, and the database remains as if nothing ever happened.

```


***
***
***

# How do we do consistency in mongodb
```
1. Application-Level Consistency (Mongoose)
How it works: You define a "Schema" in your code. If you try to save a document that doesn't match the schema 
(e.g., a string where a number should be), Mongoose throws an error before the data ever reaches MongoDB.

2. Database-Level Consistency (JSON Schema)
MongoDB has built-in JSON Schema Validation. This is a set of rules stored inside the database itself.

How it works: You tell the collection: "Every document must have a username (string) and an age (minimum 18)."
```




***
***
***