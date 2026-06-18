```
Medical PDFs

    |

Ingestion Service
(extract text (PDF OCR), metadata(date, source))

    |

Chunking Service
(
    embedding model wil chunk here
    we might use context aware chunking
)
```




# more explanation
```
Chunking can be context aware
A. Structure-Based Chunking (Recommended)
Medical documents already contain structure:

Title
Abstract
Introduction
Methods
Results
Conclusion
References

Chunk by sections first.

{
  "section": "Results",
  "text": "..."
}


D. Parent-Child Retrieval (Best for Medical)

Store:

Parent:
Whole section (~5000 tokens)

Child:
500 token chunks

Example:

Parent:
Treatment of Resistant Hypertension

Children:
ACE inhibitors
Beta blockers
Clinical trials
Side effects

Search happens on child chunks.

After retrieval:

top child found
      ↓
load parent section
      ↓
send parent to LLM

This dramatically improves context.




2. Can Qdrant Handle Millions of Docs?
You need a cluster.
We Need Sharding
Qdrant supports:

Collection
  ├── Shard 1
  ├── Shard 2
  ├── Shard 3
  └── Shard N

Each shard lives on different nodes.

Example

10 nodes:

Node 1 → Shard 1
Node 2 → Shard 2
Node 3 → Shard 3

Query:

search hypertension

Coordinator:

fan-out query

All shards searched.

Results merged.

We can also do Specialty-Based sharding
different speciality docs lives on different clusters.
or we can shard based on some filter like speciality

Replication

Never run single copy.

Shard 1
   ├─ Primary
   └─ Replica

Shard 2
   ├─ Primary
   └─ Replica

If node dies:

Replica becomes active





To improve we can do schemantic caching
Yes. Semantic caching is actually very useful in a Medical 
RAG system because many users ask the same question in slightly different ways.
is similar query is in cache with relevance score > 95 then we can retrive same response

```