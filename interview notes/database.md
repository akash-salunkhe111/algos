# 🔥 Key Differences (Interview Table)
```
use slq if you need
fixed schema
complex joins
strong consistency and ACID properties
and fixed / strong constraints

use nosql if
flexible schema
very high write throughput
Base properties
high availability
```

***
***
***




### MongoDB Data Types & Validation

Data Types:

MongoDB supports String, Number, Boolean, Array, Document, ObjectId, Date, Null, Binary, Regex, Timestamp.

Validation:

MongoDB supports JSON-Schema validation using bsonType, required, pattern, minimum, etc.

Why validation?

Even though MongoDB is schema-flexible, validation ensures data quality, consistency, and performance.

***
***
***


### What is _id and its use
# 🧠 Quick Interview Summary

_id is the primary key of every MongoDB document

Unique and indexed by default

Usually an ObjectId, but can be any type

Essential for lookups, updates, sharding, and scaling

Helps avoid duplicates and ensures fast retrieval


***
***
***


## ⭐ Summary: ObjectId vs UUID
| Feature                | ObjectId     | UUID             |
| ---------------------- | ------------ | ---------------- |
| Size                   | **12 bytes** | 16 bytes         |
| Sortable by time       | **Yes**      | No               |
| Insert order optimized | **Yes**      | No (random)      |
| Index locality         | High         | Low              |
| Faster generation      | Yes          | No               |
| Storage overhead       | Less         | More             |
| Sharding               | Better       | Less predictable |

***
***
***



# How Data is Stored in MongoDB
- A **document** is a single record, stored in **BSON (Binary JSON)** format.
- BSON is a **binary-encoded serialization of JSON**, which allows MongoDB to efficiently store and access data.
- Each document is **self-contained** and can have nested fields and arrays.
- Every document has a unique `_id` field.



***
***
***

# MongoDB Streams Without Change Streams

In MongoDB, you can create a “stream” by using **cursor streams** for query results, like `find().stream()` in Node.js.  

### Behavior of Regular Cursor Streams:
1. **Cursor streams are based on a query snapshot.**
   - When you create a stream with something like:
   ```
   js
   const cursor = db.collection('orders').find({ status: 'pending' }).stream();
the cursor represents the documents matching the query at the time the cursor is opened.
```

2. They are not real-time.
The cursor iterates over this fixed snapshot.
Any new documents inserted after the cursor is created will NOT be included.

The stream only iterates over documents that exist when the query was executed.

Use case:

Efficiently processing large result sets without loading everything into memory at once.

Streaming large collections for ETL or batch processing.

Example:
js
Copy code
const stream = db.collection('orders').find({ status: 'pending' }).stream();

stream.on('data', (doc) => {
  console.log('Processing doc:', doc);
});

stream.on('end', () => {
  console.log('Stream finished.');
});
If a new orders document is inserted after the stream started, it will not be picked up.

🔑 Key Points:
Aspect	Regular Cursor Stream	Change Stream
Captures existing data	✅	❌ (only new changes)
Captures new inserts	❌	✅
Use case	Batch processing	Real-time updates

```

***
***
***


# Can we delete data from cassandra, and what is tombstone in cassandra

Yes, but Cassandra handles deletes differently from traditional databases.

When you delete a row or column, Cassandra writes a special marker called a tombstone.
Instead of physically removing the data immediately,  it writes a tombstone marker 
that indicates the data has been deleted.

Why use Tombstones?

Because Cassandra is a distributed database.

Suppose:

Node A  -> receives DELETE
Node B  -> temporarily down
Node C  -> receives DELETE

If Cassandra physically removed the data immediately:

A -> deleted
C -> deleted
B -> still has old data

When B comes back, it could replicate the old data and resurrect the deleted row.

Tombstones prevent this.

The tombstone is replicated across the cluster so every node eventually learns:

"This row is deleted."

Too many tombstones can hurt performance.

Common ways tombstones are created
1. DELETE statements
2. TTL (Time To Live)
***
***
***


# How do you handle transaction in document based db

```
1. The First Rule: Atomic Document Operations
In MongoDB, any write operation on a single document is atomic by default. 
This means if you update 10 fields inside one document, it either all succeeds or all fails.

2. Multi-Document Transactions (ACID)
In MongoDB, Multi-Document Transactions allow you to group multiple read/write operations together. 
They are atomic.

const session = client.startSession();

try {
  session.startTransaction();

  await accounts.updateOne(..., { session });
  await accounts.updateOne(..., { session });

  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
} finally {
  await session.endSession();
}

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
When creating collection db.createCollection("users", {...
MongoDB has built-in JSON Schema Validation. This is a set of rules stored inside the database itself.

How it works: You tell the collection: "Every document must have a username (string) and an age (minimum 18)."
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

# Stored procedures
```
A stored procedure is a set of SQL statements saved in the database and executed as a unit.

CREATE OR REPLACE PROCEDURE increase_salary(
    emp_id INT,
    increment_amount NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees
    SET salary = salary + increment_amount
    WHERE id = emp_id;
END;
$$;


SQL
CALL increase_salary(1, 5000);

Stored procedures and functions are written and stored inside the database itself, 
not in your application code.
When you execute this once, PostgreSQL stores it in its system catalog.

For stored procedure - 
1 - Can modify data in database and supports Commit and rollback like transactions
2 -  Returning value is optional
3 - Can use all DML operations like INSERT, UPDATE, DELETE, SELECT
```

# Stored Functions

```
A stored function is similar to a procedure, but it must return a value (or a table).

CREATE OR REPLACE FUNCTION get_salary(emp_id INT)
RETURNS NUMERIC
LANGUAGE plpgsql
AS $$
DECLARE
    emp_salary NUMERIC;
BEGIN
    SELECT salary
    INTO emp_salary
    FROM employees
    WHERE id = emp_id;

    RETURN emp_salary;
END;
$$;

SELECT get_salary(1);


For stored functions - 
1 - Cannot modify data in database and supports Commit and rollback like transactions
2 -  Must return value
3 - Can use SELECT

Why use stored functions ?
when you need repeated calculations on some values directly to be used with SELECT statement
```

***
***
***

# Row Level Security (RLS) in PostgreSQL

```
Row Level Security (RLS) allows PostgreSQL to control access at the **row level**, 
so users can only see or modify rows they are permitted to access.
In multi-tenant applications, each customer should only access their own data.

Without RLS:

sql
SELECT * FROM orders;


A developer must remember to add:

sql
WHERE tenant_id = ?
to every query.

With RLS enabled, PostgreSQL automatically applies the filter, 
reducing the risk of data leaks.

How it works
Enable RLS on a table:

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_policy
ON orders
USING (tenant_id = current_setting('app.tenant_id')::INT);

  SELECT *
  FROM orders
  WHERE tenant_id = $1

```

***
***
***