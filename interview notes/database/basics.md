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

# Steps for Sharding in MongoDB

### Select key for sharding
### Then deploy config server with mappings for server and range
### Then Start shards as replica sets as if shard fail we have replica for that data
### Create index on shard key (this is needed as when sharding starts, mongodb can easily find data to move across shards)
### Start the sharding





***
***
***



***
***
***


***
***
***