# What is the singleton design pattern?
```
The Singleton Design Pattern is a creational pattern that ensures:

✅ Only one instance of a class exists in the entire application
✅ That single instance is globally accessible

In short: “Create it once, reuse it everywhere.”

Why Singleton exists

Singleton is used when multiple instances would cause problems, such as:

Multiple DB connections


class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient;
  private db!: Db;

  private constructor() {
    this.client = new MongoClient(process.env.MONGO_URI!);
  }

  static async getInstance(): Promise<MongoConnection> {
    if (!MongoConnection.instance) {
      const conn = new MongoConnection();
      await conn.client.connect();
      conn.db = conn.client.db(process.env.DB_NAME);
      MongoConnection.instance = conn;
    }
    return MongoConnection.instance;
  }

  getDb(): Db {
    return this.db;
  }
}
```


***
***
***

# Difference between the restapi and graphql

```
| Feature             | REST API | GraphQL    |
| ------------------- | -------- | ---------- |
| Endpoints           | Multiple | Single     |
| Data Fetching       | Fixed    | Flexible   |
| Over/Under Fetching | Common   | Avoided    |
| Versioning          | Required | Not needed |
| Caching             | Simple   | Complex    |
| Client Control      | Low      | High       |

When to use what?

✔ Use REST when

Simple CRUD APIs

Heavy caching needed

Public APIs

Team prefers simplicity

✔ Use GraphQL when

Complex, nested data

Multiple clients (web, mobile)

Need flexible queries

Bandwidth is important

```




***
***
***

# graphql n+1 problem and solution

```
What is the N+1 problem?

N+1 happens when GraphQL runs 1 query to fetch a list and then N queries to fetch related data for each item.

Example:

1 query to get users

N queries to get posts for each user
👉 Total = N + 1 DB queries ❌

How to solve it?

Use DataLoader to batch and cache database calls per request.
N+1 is caused by per-item resolvers; DataLoader fixes it by batching database calls.
```
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


# How the sharding will be implemented

```
What is Sharding?

Sharding = horizontal partitioning
Data is split across multiple databases (shards) based on a shard key to scale writes and storage.

How sharding is implemented (high level)

Choose a shard key
Decide sharding strategy
Route queries to correct shard
Handle rebalancing & failures

Sharding strategies
Range-based (userId 1–1000)
Hash-based (hash(userId))

Things to consider in SQL databases
Shard key selection (avoid hot keys) (like country, all queries hit one country)
Cross-shard joins are expensive ❌
```



***
***
***

# How do you identify if the server stops working without looking at the logs in production?

```
Key ways to detect server failure
1️⃣ Health checks
EC2 → Load Balancers → Target Groups → Health checks
Load balancer / uptime probe hits /health

If it fails → server marked unhealthy


Alerts & alarms in cloudwatch

Alerts trigger when thresholds are breached

Pager / Slack / Email notifications

Example:

CPU > 90%

5xx error rate > X%

No traffic for N minutes
```

***
***
***

#Let's say one of the service api calls is failing because of a failure in the other service. How do you handle it? in mircoservices

```
1️⃣ Timeouts (first line of defense)

Never wait forever

Fail fast

Service A → Service B (timeout 200–500ms)
```

```
Retries (with backoff)

Retry only for transient errors

Use exponential backoff + jitter

Retry 2–3 times max
```

```
Graceful degradation / Fallback

Return cached or partial response

Disable non-critical features

Example:

Order placed, email delayed
```

```
Alerts and AB tests
```


***
***
***

# How do you identify the bottleneck in the service?

```
By observing metrics, traces, and load behavior to see where latency or saturation occurs.
```

```
1️⃣ Check Golden Signals

Focus on:

Latency – where response time spikes

Traffic – sudden drops or overload

Errors – 4xx / 5xx increase

Saturation – CPU, memory, threads, DB connections   

```

```
Downstream latency is the time your service spends waiting on another service it depends on
Client → Order Service → Payment Service
Order Service calls Payment Service

Order Service response time depends on Payment Service speed


```

***
***
***

# How do you handle the zero downtime if you have to deploy a new feature
```
Common strategies
1️⃣ Rolling deployment (MOST COMMON)

Deploy instances one by one

Load balancer routes traffic only to healthy instances

No full outage

Old v1 + New v2 → gradual replacement
```


```
Blue-Green deployment

Blue = current production

Green = new version

Switch traffic instantly

✔ Fast rollback
❌ Higher infra cost
```

```
AB tests feature flags
```


***
***
***

# Cassandra vs mongodb

```
| Aspect              | Cassandra    | MongoDB           |
| ------------------- | ------------ | ----------------- |
| Architecture        | Peer-to-peer | Primary-secondary |
| Write scalability   | Excellent    | Good              |
| Availability        | Very high    | Medium–high       |
| Query flexibility   | Limited      | Rich              |
| Joins / Aggregation | ❌            | ✅                 |

```


***
***
***

# In the microservice architecture, which design pattern have you used to explain the implementation

```
1️⃣ API Gateway Pattern

Single entry point for clients

Routes to multiple services

Used for:

Auth

Rate limiting

Request aggregation

Client → API Gateway → Order / Product / User
```

```
2️⃣ Database per Service

Each microservice owns its database

Used for:

Product DB

Order DB

Payment DB

✔ Loose coupling
✔ Independent scaling
```


```
3️⃣ Saga Pattern (MOST IMPORTANT)

Manages distributed transactions

Example:

Order → Payment → Inventory


If payment fails → rollback order & inventory.

✔ Event-driven
✔ Avoids 2PC
```


```
7️⃣ Strangler Pattern

Gradually migrate monolith to microservices

Used when:

Legacy e-commerce system exists
```



***
***
***

# Advantages of Micro-frontends
```
Each team owns its UI module
Teams work in parallel
Different frameworks can coexist
Faster releases due to quick builds
One UI failure doesn’t crash the entire app
```


***
***
***

# What is the difference between blue and green race conditions in elastic

```
Use atomic alias switch
2️⃣ Pause writes during switch (best practice)
Write to both Blue & Green, Switch reads only after sync
```



***
***
***


How would you prepare the system for a sale where users are going to be increased rapidly. sql db is expecting huge registration

```
queue requests and Bulk insert at intervals
Create appropriate indexes on userName or unique fields
increase connection pools
write to cassandra

```



***
***
***

# Redis Caching Policies
```
Write-Through
Flow - 
Write → Redis → DB (synchronously)
Read → Redis

Pros - 
Cache always consistent
No stale reads

Cons - 
Higher write latency
Cache write required even if data isn’t read
```


```
3️⃣ Write-Behind (Write-Back)
Flow - 
Write → Redis (immediate)
Redis → DB (async)

Pros - 
Very fast writes
Absorbs traffic spikes

Cons - 
Risk of data loss if Redis crashes
More complex recovery
Used in: Analytics, counters, logs
```

```
Cache-Aside (Lazy Loading) – MOST COMMON

Flow - 

Read → Check Redis
Miss → Read DB → Write to Redis → Return
Write → Update DB → Invalidate / Update Cache
```


## cache eviction

```
Redis Eviction Policies
1️⃣ noeviction

Redis rejects new writes

Reads still work

Default behavior

✔ Safe for critical data
❌ Can cause write failures
```


```
Redis Eviction Policies
1️⃣ noeviction

Redis rejects new writes

Reads still work

Default behavior

✔ Safe for critical data
❌ Can cause write failures
```

```
allkeys-lru

Evicts least recently used keys (any key)

✔ Best general-purpose cache
✔ High hit ratio
```


```
lfu (modern & recommended)

Evicts least frequently used keys

✔ Better than LRU for hot keys
✔ More stable under traffic spikes

```

***
***
***

# Unit test vs integration test
```
Unit Test: Tests a single function or module in isolation to ensure it works correctly.

Integration Test: Tests multiple components together to ensure they work correctly as a whole.
```


***
***
***

# what is OWASP in short for interview
```
OWASP (Open Web Application Security Project) is a global organization that provides guidelines 
and best practices for improving web application security
Prevent SQL Injection by using parameterized queries instead of raw SQL

Protect against XSS by validating and escaping user input

Use strong authentication (hashed passwords, MFA, secure sessions)

Implement proper access control so users can’t access unauthorized data

Store sensitive data securely using encryption and secure key management

Keep dependencies updated to avoid known vulnerabilities

Log and monitor security events to detect attacks early
```



***
***
***

# GRPC
```
gRPC is a high-performance way for services to talk to each other over the network.

It uses HTTP/2 (fast, supports streaming)

You define APIs using Protocol Buffers (protobuf) instead of JSON

It generates client/server code automatically

Great for microservices communication because it’s faster and strongly typed compared to REST

Example: Service A can directly call Service B’s function like a normal method call, but over the network.
```


***
***
***

# SQL execution flow

```
Parse → Optimize → Execute → Return results

Parsing (Syntax Check) => DB checks if SQL is valid => 
=> Converts query into an internal structure (parse tree) => 
Example: detects keywords like SELECT, FROM, WHERE

Query Optimization (Planner) => DB decides the best way to execute the query:  =>
Should it use an index?  => Full table scan?  => Which join strategy?

Execution Engine Runs the Plan

DB logically processes as:
FROM => WHERE => GROUP BY => HAVING => SELECT => ORDER BY => LIMIT
```




***
***
***


## Making a Project Highly Available & Scalable

### High Availability (No Downtime)
- Deploy across multiple servers (no single point of failure)
- Use Load Balancer to distribute traffic
- Run services in multiple Availability Zones / Regions
- Add Auto-healing (restart failed instances automatically)
- Use Database Replication + Failover setup
- Implement Health Checks + Monitoring

### Scalability (Handle Growth)
- Horizontal Scaling (add more servers instead of bigger ones)
- Use Auto-Scaling based on traffic/load
- Cache frequently used data with Redis/CDN
- Use Message Queues (Kafka/RabbitMQ/SQS) for async processing
- Design services as stateless for easy scaling
- Apply Database Sharding/Partitioning for large datasets

### Reliability & Performance
- Use Rate Limiting + Circuit Breakers to prevent overload
- Add Observability: logs, metrics, tracing
- Ensure backups + disaster recovery plan



***
***
***

## Monitoring Tools I Have Used

```
- Splunk
- DataDog
- CloudWatch
- Grafana + Prometheus
Prometheus is the "collector" (backend) that gathers and stores data,
 while Grafana is the "visualiser" (frontend) that turns that data into
  beautiful charts and dashboards
```


***
***
***

## How to Troubleshoot a Critical Production Incident

```
### 1. Detect & Acknowledge
- Confirm incident via alerts (Datadog, CloudWatch, Grafana)

### 2. Stabilize First (Stop the Bleeding)
- Rollback latest deployment if needed

### 3. Identify Root Cause Quickly
- Check dashboards: CPU, memory, latency, error rates
- Inspect logs and traces for failures
- Verify dependencies: DB, cache, third-party APIs

### 4. Mitigation & Recovery
- Apply hotfix or config change
- Failover to standby systems if required
- Restart unhealthy instances/services

### 5. Communication
- Update stakeholders regularly (engineering + business)
- Document timeline and actions taken

### 6. Post-Incident Review
- Perform RCA (Root Cause Analysis)
```




***
***
***

### Imagine you are creating new microservice with node or golang for high performance requirement, what primary factor you would consider for scalibility ?

```
1. Horizontal Scaling First
  Service should scale by adding more pods/instances

2. Efficient Concurrency Model
  Go: true parallelism with goroutines
  Node.js: event-loop based, best for I/O-heavy workloads
  Avoid blocking operations

3. Stateless + Externalized State
  Makes load balancing easy
  Enables failover and auto-healing

4. Database as the Bottleneck
  Add caching (Redis)
  Use read replicas
  Optimize queries and indexes

5. Async Processing
  Offload heavy tasks using Kafka/SQS/RabbitMQ
  Keeps request latency low

6. Observability & Limits
  Monitoring + tracing for bottlenecks
  Rate limiting to prevent overload
```



***
***
***

## Automating Repetitive Tasks Using AI Tools (e.g., GitHub Copilot)

```
### 1. Code Generation for Boilerplate

### 2. Faster Debugging & Fix Suggestions

### 3. Writing Unit Tests Automatically

### 4. Refactoring Support

### 5. Documentation & Comments

### 6. DevOps Automation Help
- Create CI/CD YAML templates (GitHub Actions, Jenkins pipelines)
- Generate Dockerfiles and Kubernetes manifests faster

### 7. Query and Script Automation
- Generate SQL queries, migration scripts, or data-processing utilities
```


***
***
***

# AI tools you have used

```
- Cursor
- CodeRabbit
- codeium to generate unit test cases, it also generates edge cases
```

***
***
***


Django vs fastapi

FastAPI — Choose this if you want speed + modern APIs
Microservices - lambdas
✅ High-performance async apps
✅ Backend for React/Next.js frontend
Simple projects


Django is best when you're building:

✅ Full web applications
✅ Admin panel + authentication
✅ Large scalable systems
✅ Complex database models
✅ Enterprise apps
Comes with everything built-in

ORM, auth, admin dashboard included




✅ Template sends the UI (HTML) to the user
✅ View decides which template to send and provides the data

In Django's MVT architecture, the components are defined as follows:
Model: This is the data access layer that defines the structure and behavior of your data, typically by mapping to a database table via Django's built-in Object-Relational Mapper (ORM). It is responsible for data storage, retrieval, and manipulation.
View: In Django, the "view" contains the business logic. It is a Python function or class that receives web requests, interacts with the Model to fetch or modify data, and decides which data should be presented to the user.
Template: The template is the presentation layer, typically an HTML file mixed with the Django Template Language (DTL), which describes how the data is displayed to the user. 

By default, Django uses its own built-in:

Django Template Language (DTL)

Django also supports other engines like:

Jinja2 (optional)


Simple flow:

User requests a page

View runs logic + fetches data

View renders a Template

Template generates the final HTML UI

Browser receives the response