# What is race condition in react
A race condition in React happens when multiple async operations finish in an unexpected order, causing stale or incorrect data to update the UI.

React doesn't cancel previous async calls automatically.
So if two requests are triggered back-to-back, the slower request might finish last, overwriting the newer data.

🧩 Example of a Race Condition

Suppose a component fetches data whenever userId changes:
```
useEffect(() => {
  fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .then((data) => setUser(data));
}, [userId]);
```

If userId changes rapidly:

Request A → /user/1

Request B → /user/2

Request B should update the UI

But Request A (slower) returns last

UI incorrectly shows user 1 instead of user 2

That is a race condition.

🔍 Why It Happens in React

React does not cancel ongoing async operations by default

Effects may run multiple times (especially under Strict Mode)

Old async operations may complete later and overwrite state

🛠️ How to Prevent Race Conditions
```
1. AbortController (Best for fetch)
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/user/${userId}`, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setUser(data))
    .catch((err) => {
      if (err.name !== "AbortError") throw err;
    });

  return () => controller.abort(); // cancel previous request
}, [userId]);
```

Use libraries that handle this internally

React Query

***
***
***

# What can be done for React optimization

1) Reduce unnecessary renders

Use React.memo for function components that receive stable props.

Use PureComponent / shouldComponentUpdate for class components.

Keep props stable (avoid creating new objects/arrays/functions inside render).


2) Memoize expensive work

useMemo for heavy calculations used during render.

useCallback for stable function references passed to children.


3) Code-splitting & lazy loading

Use React.lazy + Suspense (or dynamic import()) to split routes and large components.

Load non-critical bundles only when needed (route-level splitting, admin pages, feature flags).

Preload/prefetch critical future chunks when appropriate.

4) Virtualize long lists

Use react-window or react-virtualized to render only visible list items.

Avoid rendering thousands of DOM nodes at once.

5) Network & data fetching

Cache API results (React Query, SWR) to avoid duplicate fetches.

Use pagination / infinite scroll to avoid loading huge payloads.

Debounce user-driven requests (search, autocomplete).

6) Server-side rendering / pre-rendering

Use SSR or SSG for first-load performance and SEO (Next.js, Remix, etc.).

Hydration: minimize serialized state, avoid heavy client-only initialization.

7) Static assets & bundle

Tree-shake unused code, remove dead deps.

Analyze bundle (webpack bundle-analyzer, Vite report) and split large libs.

Serve assets via CDN, enable long-term caching, gzip/brotli compression.

Optimize images (responsive sizes, lazy-load, WebP/AVIF).


8) Profiling & measurement (do this first!)

Use React DevTools Profiler to find actual bottlenecks.

Use Lighthouse / WebPageTest for real user metrics (LCP, TTFB, CLS).

Instrument slow renders with Profiler and measure times.

***
***
***

# Concurrent Rendering in React (18/19) vs. Legacy Synchronous Rendering
Concurrent Rendering, introduced in React 18 and a foundation of React 19, is a fundamental shift in how React processes updates. It allows React to work on multiple state updates and rendering tasks simultaneously (concurrently) without blocking the main browser thread.

### What is Concurrent Rendering?
Concurrent Rendering is an opt-in mechanism that enables the following key capabilities:

Interruptible Rendering: React can pause an ongoing rendering task to handle a more urgent update (like a user typing or clicking) and then resume the paused work later. This is the core difference from the legacy model.

Priority-Based Scheduling: Updates are assigned different priorities.

Urgent: Direct user interactions (typing, clicking) get the highest priority.

Transitions (Non-Urgent): UI updates that are visually less critical (like fetching data or filtering a list after a search) can be interrupted.

Time Slicing: React breaks large rendering operations into smaller chunks of work. It periodically yields control back to the browser's main thread (e.g., every ~5ms) so the browser can handle high-priority tasks, like responding to user input or painting the screen.

Automatic Batching: It automatically groups multiple state updates (even those outside of React events like in promises or setTimeout) into a single re-render, reducing unnecessary rendering cycles.

Key Features that leverage Concurrency:

useTransition / startTransition: Marks state updates as non-urgent transitions, allowing the UI to remain responsive while a potentially slow update is calculating.

useDeferredValue: Allows a value to "lag behind" its source, deferring a less important part of the UI update (like a large list filter) to a lower priority.

Suspense: Works seamlessly to manage asynchronous loading states (data fetching, lazy-loading) by displaying a fallback UI while rendering is paused.

Note: To fully enable these features, you must use the new ReactDOM.createRoot() API.


***
***
***