## In React, if parent comp changes, does child will also rerender even though no data is passed throug props ? 

```
Yes
In React, when a parent component re-renders, React also re-runs its child 
component functions to check if UI needs updating.

to prevent it, use React.memo
const Child = React.memo(
  function Child(props) {
    return <h2>Hello</h2>;
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
  }
);

Note it doesent take dependency array but a function to check areEqual
```

***
***
***

## if we use nexjs router, and if user goes to about page from home page, do we resend index.html from server or just send js for new page or html for new page

```
In Next.js, when you navigate using <Link>, it does NOT resend index.html again.
What causes to send resent index.html ?
Page Refresh, Direct URL open, <a href> navigation
```

***
***
***

```
In financial RAG, accuracy isn’t nice-to-have, it’s everything.

You’re building RAG for financial PDFs. Missing a single number from search can cost millions. What is the best search method?

Answer:
- Use hybrid search, it’s the baseline for high-stakes data.
- Combine BM25 (keyword) + semantic search → exact numbers + contextual meaning
- Merge results using RRF (Reciprocal Rank Fusion)
- Add a reranker (e.g., Cohere Rerank) to push the most relevant chunk to the top
- Use layout-aware chunking (tables intact) and metadata filtering (company, quarter, doc type)
- Always cite sources for every number

In finance, retrieval is risk management—hybrid search + reranking is the minimum bar.

```

***
***
***

# can we pass function as prop from react server to client

```
No, you cannot pass a standard, ordinary JavaScript function as a prop from a React Server Component 
to a Client Component. This is because any data crossing the network boundary from the server to 
the client must be serializable

But you can pass server action

// ServerComponent.tsx (Server Component by default)
import { ClientButton } from './ClientButton';

export default function ServerComponent() {
  // This is a Server Action
  async function handleServerUpdate(id: string) {
    'use server';
    // This executes strictly on your server (e.g., database mutation)
    console.log(`Updating record ${id} on the server`);
  }

  return (
    <div>
      <h1>Server Parent</h1>
      {/* You can safely pass this as a prop */}
      <ClientButton onUpdate={handleServerUpdate} />
    </div>
  );
}


// ClientButton.tsx
'use client'; // This directive defines the network boundary

interface ClientButtonProps {
  onUpdate: (id: string) => Promise<void>;
}

export function ClientButton({ onUpdate }: ClientButtonProps) {
  return (
    // Triggering the function sends a POST request to the server
    <button onClick={() => onUpdate('42')}>
      Trigger Server Function
    </button>
  );
}


Here when we click button on client, it will make post reqeust to server
```


***
***
***

# Suppose you forsee that large nos of users are going to signup, you have to optimize such that system does not fail under pressure

```
1 - Use stored procedures - 
Without a stored procedure

Suppose you need to insert 10,000 records.

App -> INSERT row 1
App -> INSERT row 2
App -> INSERT row 3
...
App -> INSERT row 10000

With a stored procedure

The application sends the data once:

CALL insert_orders(order_data);
The procedure loops inside the database:

FOR rec IN ...
LOOP
   INSERT INTO orders (...);
END LOOP;

2 - Queue the signup data in Message queue and then bulk insert it.

3 - Use proper Indexes which can help while inserting
```


***
***
***

## you are using sql and microservices, your queries are getting slow orders collections, lot of records and getting slow due to joins etc. how will you first debug and then fixes which you can do to optimize it

```
1. Diagnose First
For SQL:

EXPLAIN ANALYZE
SELECT ...

Mongodb alternative
db.orders.find({
  customer_id: 123
}).explain("executionStats")

Look for:
Full table scans
Nested loop joins on large tables
Missing indexes
High row counts scanned
Sorting operations (ORDER BY)
Temporary tables



B. Measure query latency

Check:

p50
p95
p99

Questions:

Is every query slow?
Only reporting queries?
Only joins?
Only during peak traffic?


C. Find N+1 queries

Microservices often do:

for (const order of orders) {
  await getCustomer(order.customerId);
}

100 orders = 100 DB calls.

Very common performance issue.
```


***
***
***