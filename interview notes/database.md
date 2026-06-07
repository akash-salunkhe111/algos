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




***
***
***