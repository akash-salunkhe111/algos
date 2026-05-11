# ❓ What is Next.js and why is it used?

Next.js is a React framework that provides server-side rendering, static site generation, API routes, and optimized performance out of the box.
It helps build fast, SEO-friendly, production-ready React applications with minimal setup.


***
***
***




# Difference between SSR, SSG, ISR, and CSR in Next.js

Next.js supports multiple rendering strategies depending on performance and SEO needs.

### ⚡ Server-Side Rendering (SSR)
Rendered:

On every request by the server

When used:

Data that changes often

Personalized data

SEO pages needing fresh data

Next.js function:

```
export async function getServerSideProps() {}
```

### ⚡ Static Site Generation (SSG)
Rendered:

At build time only

When used:

Blogs

Docs

Next.js function:
```
export async function getStaticProps() {}
```

### ⚡ Incremental Static Regeneration (ISR)
Rendered:

Initially static at build time

Regenerated after a configured interval

When:

Mostly static content but needs periodic updates

Example:
```
export async function getStaticProps() {
  return {
    props: { ... },
    revalidate: 60, // seconds
  }
}
```

This means:

Serve old page instantly

Behind the scenes re-generate

Next request gets the fresh page

### ⚡ Client-Side Rendering (CSR)
Done:

Entirely in the browser

React takes control

Data fetched using hooks like useEffect

When:

Auth dashboards

User-specific data

Real-time UI



***
***
***



# App Router vs Page router

### App Router (new, /app, introduced in Next.js 13)

| Feature       | Pages Router             | App Router                          |
| ------------- | ------------------------ | ----------------------------------- |
| Folder        | `/pages`                 | `/app`                              |
| Components    | Client only              | Server by default                   |
| Data Fetching | `getServerSideProps` etc | async server components + `fetch()` |
| Layouts       | Limited                  | Nested layouts                      |
| Streaming     | ❌                        | ✔                                   |
| SEO           | Good                     | Better                              |
| Performance   | Good                     | Excellent                           |



***
***
***

# ⚛️ What are React Server Components in Next.js?

✔ Run only on server

They never execute in the browser runtime.

✔ Zero JS sent to client

Since they are server-side rendered and streamed, no JS bundle is generated for them.

✔ No hydration needed

Only Client Components hydrate.

✔ Can access backend securely

database

server files

environment variables

secrets

✔ Data fetching directly in the component
```
export default async function Page() {
  const data = await fetch("https://api.example.com/posts").then(r => r.json());
  return <pre>{JSON.stringify(data)}</pre>;
}
```

***
***
***

# When do we need "use client"?

Use "use client" when you need:

✔ React hooks that rely on the browser

useState

useEffect

useRef

useLayoutEffect

✔ Event handlers

onClick

onChange

onSubmit

etc.

✔ Browser APIs

window

localStorage

document

cookies (client-side)

✔ Client-side state & interaction

toggling UI

modal open/close

animations

inputs/forms

dropdown menus

***
***
***

# Difference between Layout, Page, Template in App router?
🧠 Simple explanation

Page → the actual route content

Layout → persistent wrapper (doesn’t rerender)

Template → like layout but rerenders (used for transitions/animations)

🎯 One-liner for interview

Layout persists across routes, Template recreates UI on navigation, Page is the actual route’s content.

### 🧠 Why do we need Template?

Suppose you want:

page transition animation

reset state on every navigation

re-fetch something each time

start animation from scratch

***
***
***

# What does getServerSideProps do in Next.js?

getServerSideProps tells Next.js to render a page on the server for every incoming request instead of pre-building it at build time.

In simple words

It fetches data on the server at request time and injects it into the page before sending HTML to the browser.

How it works (step-by-step)

```
User requests a page (/dashboard)

Next.js runs getServerSideProps on the server

Data is fetched (DB, API, auth, cookies)

Page HTML is generated with that data

Fully rendered HTML is sent to the browser

📌 This happens on every request
```


## Then how do I run first request on server and next ones on client?

### This is a hybrid pattern, and yes — it’s very common.

✅ Pattern: SSR → Client-side fetching
```
Step 1: Use getServerSideProps only for initial load
export async function getServerSideProps() {
  const initialData = await fetch("https://api.example.com/data").then(res => res.json());

  return {
    props: { initialData }
  };
}
```

Step 2: Fetch client-side for next updates
```
import { useEffect, useState } from "react";

export default function Page({ initialData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    fetch("/api/data")
      .then(res => res.json())
      .then(setData);
  }, []);

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

➡️ First request = SSR
➡️ Subsequent updates = Client-side

***
***
***

# Hydration in next js

### How the Hydration Flow Works
```
Server Side: Next.js renders your component into a plain HTML string and sends it to the browser. 
(This happens first when user enters url and page loads)

The user sees the content immediately (fast First Contentful Paint).
(browser then uses html to paint immediately)

Browser Side: The browser downloads the JavaScript bundle.
(once it see <script src > reference, it downloads corresponding js file)

Hydration: React runs through the components in the browser, matches them with the existing HTML, 
and attaches event listeners (like onClick).
```

```
Request
  ↓
Server fetches data
  ↓
Server renders HTML
  ↓
Send HTML + JS + data
  ↓
Browser paints HTML
  ↓
React hydrates (JS attaches events to dom)
```

### The Methods Responsible for Hydration - hydrateRoot

## Common Interview Trap: Hydration Mismatch

A "Hydration Error" occurs when the server-rendered HTML doesn't match what the client expects.

Example of what causes an error:

```
export default function TimeComponent() {
  // This will be different on the server vs. the client!
  const time = new Date().toLocaleTimeString(); 
  
  return <div>Current time: {time}</div>;
}
```
Because the server time (e.g., 10:00:01) is slightly different from the client time (e.g., 10:00:02) when the JS executes, React will throw a Hydration Mismatch error because the "dry" HTML doesn't match the "wet" React state.

### How to fix Mismatch?
Use useEffect to ensure the dynamic data only loads on the client:

***
***
***

# 'use client'

In the Next.js App Router, 'use client' is a directive used to declare a boundary between Server Components and Client Components.

By default, every file in the app directory is a Server Component. You only add 'use client' at the very top of a file (before any imports) when you need browser-specific features.

***
***
***

# How do you handle state in react/next js without redux 

```
1 - URL as State (Underrated & Powerful)
For filters, sorting, pagination — use URL.

2 - Local Component State (UI-only) using useState

3 - Shared Client State → Context

4 - Async Client State → React Query

5 - Use server components to fetch user info from cookies, db etc 
```


***
***
***

# React query vs redux

```
Client State: Data that lives only in the browser (e.g., "Is this sidebar open?", "Dark mode on/off").

Server State: Data that lives on a server and you are just "borrowing" it to show the user
 (e.g., User profiles, list of products, notifications).
```

### Why React Query Wins for Server State
```
Redux is a "blank slate" tool. If you use Redux for API data, you have to manually write code for:

Loading spinners (isLoading: true)

Error handling (error: "Failed to fetch")

Caching (preventing the app from fetching the same data twice)

Invalidation (refreshing the data when something changes)

Also redux have lot of boilerplate, where each state needs state-reducer-actions files
```

React query server side working

Flow
```
How It Works: The "Dehydration" Pattern

Initial SSR request
Browser requests page
↓
Server fetches users
↓
Server dehydrates cache 
(React Query converts its in-memory cache into a plain JSON object that can be sent from server → browser.)
↓
Browser hydrates cache

Now browser React Query cache contains:

['users'] -> cached data
Then user navigates around SPA-style

When using Next.js client routing:

Page A -> Page B -> Back to Page A

the browser app is still alive.

So React Query client cache still exists in browser memory.

Now:

useQuery(['users'])

does NOT fetch again immediately.

Because CLIENT cache already knows data.
```

***
***
***






***
***
***





***
***
***






***
***
***