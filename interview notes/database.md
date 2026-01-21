# 🔥 Key Differences (Interview Table)
Feature	SQL	NoSQL
Data Model	Tables & rows	Document / Key-Value / Graph / Column
Schema	Fixed	Flexible
Scaling	Vertical	Horizontal
Consistency	Strong (ACID)	Often eventual
Querying	SQL	DB-specific APIs
Relationships	Strong joins	Limited joins (denormalization)
Performance	Best for structured queries	Best for large-scale distributed data
# 🎯 When to Use Which?
## 🟦 Use SQL When:

Your data is structured

You need transactions (bank payments, orders)

You need consistency first

Relationships between data matter (joins)

The schema does not change often

Example Use Cases:

Finance apps

Billing systems

HR management systems

ERP, CRM

Inventory + Order Management

## 🟩 Use NoSQL When:

Your data is unstructured or semi-structured

Schema changes often (flexible)

You expect huge amounts of data

You need high availability + horizontal scaling

You want fast reads/writes with simple queries

You need document/graph storage

Example Use Cases:

IoT data

Chat apps, messaging

Real-time analytics

Recommendation engines

Logging systems

Content management

Social networks (graph DB)











### MongoDB Data Types & Validation

Data Types:

MongoDB supports String, Number, Boolean, Array, Document, ObjectId, Date, Null, Binary, Regex, Timestamp.

Validation:

MongoDB supports JSON-Schema validation using bsonType, required, pattern, minimum, etc.

Why validation?

Even though MongoDB is schema-flexible, validation ensures data quality, consistency, and performance.



### What is _id and its use
# 🧠 Quick Interview Summary

_id is the primary key of every MongoDB document

Unique and indexed by default

Usually an ObjectId, but can be any type

Essential for lookups, updates, sharding, and scaling

Helps avoid duplicates and ensures fast retrieval





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




