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





***
***
***




***
***
***

