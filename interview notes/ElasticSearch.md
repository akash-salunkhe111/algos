# Elastic search

```
It has different clusters.

Master Nodes - 
- Index creation/deletion
- Shard allocation
- Node joins/leaves

Data Nodes - 
Storing shards
Executing search queries
Indexing documents

🔄 Ingest Nodes - 
Preprocessing documents before indexing, add metadata
Then pass it to data node


Data is stored in json + metadata like _index, _source

_index is similar to table, we used catalague blue and green

What is shard ?
Index split into smaller parts
To scale horizontally
To store large datasets
To run queries in parallel
Similar to sharding in db

In Elasticsearch, you **decide the number of primary shards when creating an index**
Primary shards cannot be changed later

Replicas can be changed anytime

Indexing flow -
1. Client sends document
2. Coordinating node receives request
3. Hash function selects primary shard
4. Document written to primary shard
5. Replicated to replica shard
6. Ack returned to client


Searching flow - 
1. Client sends search request
2. Coordinating node finds all shards
3. Query sent to each shard in parallel
4. Each shard returns top-K results
5. Coordinating node merges results
6. Final response sent

```

## how it works internally

```
It uses inverted index

Doc1: { "name": "Safety Glasses" }
Doc2: { "name": "Industrial Safety Helmet" }
Doc3: { "name": "Protective Glasses" }
Doc4: { "name": "Glass Cleaner" }


Pre process -
Tokenization
Lowercasing
Stop-word removal (optional)


Inverted Index creation

safety     → [Doc1, Doc2]
glasses    → [Doc1, Doc3]
industrial → [Doc2]
helmet     → [Doc2]
protective → [Doc3]
glass      → [Doc4]
cleaner    → [Doc4]


Search Query: "safety glasses"

Preprocess query
"safety glasses" → ["safety", "glasses"]

Lookup from index
"safety"  → [Doc1, Doc2]
"glasses" → [Doc1, Doc3]

then scoring
BM25 considers:
Term Frequency (TF) – how often term appears
Inverse Document Frequency (IDF) – how rare the term is
Field Length – shorter fields score higher
Boosts – field or query boosts
```