# ❓ What is Next.js and why is it used?

Next.js is a React framework that provides server-side rendering, static site generation, API routes, and optimized performance out of the box.
It helps build fast, SEO-friendly, production-ready React applications with minimal setup.

🚀 Why is Next.js used?
🔹 1. Server-Side Rendering (SSR)

Renders pages on the server before sending HTML to the browser, improving:

SEO

initial page load

performance

🔹 2. Static Site Generation (SSG)

Generates static HTML at build time.
Great for:

blogs

marketing pages

documentation

Fast, cheap, and CDN-friendly 💨

🔹 3. File-based Routing

No need to manually configure routes.
Every file in pages/ or app/ = a route automatically.

```
pages/index.js → /
pages/about.js → /about
```

🔹 4. SEO Optimization

Because pages are pre-rendered (SSR+SSG), search engines can index them easily, boosting visibility.

🔹 5. Performance Optimizations

Next.js provides:

Image optimization

Script optimization

Automatic code splitting

Server components (in App Router)

Built-in caching & asset optimization

🎯 One-line Interview Answer

Next.js is a React framework used to build fast, SEO-friendly apps using SSR, SSG, file-based routing, and built-in performance optimizations.


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

Marketing pages with rarely-changing content

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
The user sees the content immediately (fast First Contentful Paint).

Browser Side: The browser downloads the JavaScript bundle.

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
```
How It Works: The "Dehydration" Pattern
The most common way to use React Query on the server is through Hydration. 
This process ensures the user doesn't see a loading spinner the moment the page loads.

Prefetching: On the server (inside getStaticProps or a Server Component), 
you create a QueryClient and fetch the data.

Dehydration: You "dehydrate" the cache. This turns the fetched data into a serialized JSON object.

Sending to Client: This JSON is sent to the browser along with the HTML.

Hydration: On the client side, React Query reads that JSON and "rehydrates" its internal cache. 
The application now has the data ready without making a second API call.

Why use React Query on the Server at all?
You might wonder: "If I'm already on the server, why not just use fetch and pass props?"

Caching Synergy: Once the page loads, React Query takes over. I
f the user navigates away and back, it uses the cached data instead of hitting the server again.

Background Updates: React Query can immediately trigger a "background refetch" 
once the page loads to ensure the server-provided data isn't stale.

Consistent API: You use the same hooks (useQuery) regardless of whether the data 
was fetched on the server or the client.
```

### so if we store state on server side and cache it , dosent it conflict with other 
users since server is same for all users
```
When you use React Query on the server (like in Next.js), you don't create one global QueryClient that stays alive forever. 
Instead, you create a brand new QueryClient for every single incoming request.

Request 1 (User A): A new QueryClient is born, fetches User A's profile, dehydrates it into the HTML, 
and then the client instance is destroyed after the HTML is sent.

Request 2 (User B): A totally separate QueryClient is born in a different slice of memory. 
It has no idea User A ever existed.

2. Where the "Real" Caching Happens
The confusion usually comes from the word "Cache." In React Query:

Server-Side Cache: This is just a temporary "bucket" used to hold data during the few milliseconds 
it takes to render the page. It is not shared between users.

Browser-Side Cache: This is where the long-term caching happens. This lives in User A's browser memory or localStorage. 
It is physically impossible for User B to see this.

This is called singleton pattern
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