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
