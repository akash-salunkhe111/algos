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


