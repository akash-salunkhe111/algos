# ⭐ Advantages of React
## 1. Component-Based Architecture

Encourages reusable, modular UI components

Makes large applications easier to maintain

## 2. Virtual DOM → Better Performance

Efficient UI updates

Minimizes direct DOM manipulation

React updates only what’s changed, not the entire page

## 3. Unidirectional Data Flow

Predictable state flow → easier debugging

Less complex compared to two-way binding frameworks

## 4. Strong Ecosystem & Community Support

Huge library ecosystem (React Router, Redux, TanStack Query, etc.)

Excellent documentation & community resources

## 5. JSX Improves Developer Experience

Write HTML + JS together

Improves readability and maintainability

## 6. Hooks (useState, useEffect, useMemo, etc.)

Reusable logic with custom hooks

Avoids class complexity

Cleaner and less boilerplate

## 7. Supports Server-Side Rendering (Next.js)

Faster initial load

SEO-friendly

Great for large-scale apps

## 8. Strong Backing by Meta (Facebook)

Long-term support

Regular updates

# 🔻 Disadvantages of React
## 1. High Learning Curve (Compared to Vanilla JS)

Must learn JSX, hooks, state management, VDOM concepts

Complex for absolute beginners

## 2. Fast-Paced Ecosystem

Frequent breaking changes

Many ways to do the same thing:
Router? Redux? Zustand? MobX? React Query?

Can overwhelm newcomers

## 6. SEO Issues in SPA (without SSR)

Client-side rendering is not ideal for SEO

Requires Next.js or SSR setup


***
***
***

# Virtual DOM
The Virtual DOM (VDOM) is a lightweight, in-memory representation of the real DOM.
React uses it to update the UI efficiently.

When the state changes:

React creates a new Virtual DOM tree.

It compares the new tree with the previous virtual dom one using a diffing algorithm.

It updates only the changed parts in the real DOM.

This avoids unnecessary reflows and makes rendering much faster.

🧱 Before & After Update (Example)
Before Update
Virtual DOM:  <h1>Count: 0</h1>
Real DOM:     <h1>Count: 0</h1>

After Update
New Virtual DOM: <h1>Count: 1</h1>
Diff:            text changed (0 → 1)
→ React updates only that text node in the Real DOM


React does not update the real DOM after every single state change.
Instead, it:

Collects (batches) multiple updates

Applies them in memory (Virtual DOM)

Computes the minimal set of real DOM changes

Commits them all at once

This is one of React’s biggest performance advantages.

🧩 Analogy

Imagine editing a Word document.

If you press Backspace 10 times,
you don’t want the printer to print 10 times.

You first finish all edits → then print once.

React does the same:

Collect changes

Compute differences

Update the real DOM once efficiently

🔍 JavaScript vs React (Practical Example)
🧠 Plain JavaScript — Immediate DOM updates
const el = document.getElementById("counter");
let count = 0;

function increment() {
  count++;
  el.innerText = count; // direct DOM update
}


If increment() runs 10 times quickly:

DOM updates happen 10 times

Browser triggers 10 reflows + repaints

Layout & style recalculation each time (expensive)

⚛️ React — Batched Virtual DOM updates
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);
  }

  return <p>{count}</p>;
}

React will:

Queue all three setCount() calls

Batch them in the same event loop tick

Compute the final state

Re-render the Virtual DOM once

Apply one minimal DOM update

✅ Only one real DOM update, not three.


***
***
***

# ⭐ What is the Shadow DOM? (Low priority)

The Shadow DOM is a browser technology (part of Web Components) that allows you to create encapsulated, isolated components with their own:

DOM structure

CSS styles

JavaScript behavior

It ensures that your component’s styles and markup do not leak out, and external styles do not interfere with it.

## 🔍 Key Idea

The Shadow DOM creates a separate, hidden DOM tree attached to an element, isolated from the main DOM.

This means:

Styles outside cannot affect the shadow tree

Styles inside cannot affect the outer DOM

Perfect for reusable, predictable UI components

## ✔ Example (Browser Native)
<div id="my-component"></div>

<script>
  const root = document.querySelector("#my-component");
  const shadow = root.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      p { color: red; }
    </style>
    <p>Hello from Shadow DOM!</p>
  `;
</script>


Here:

<p> inside shadow DOM appears red

A <p> outside this component won’t be affected



***
***
***

# ⭐ What is JSX? Is it part of React?
## 1. What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code inside JavaScript.

Example:

const element = <h1>Hello World</h1>;


Under the hood, JSX compiles to pure JavaScript:

const element = React.createElement("h1", null, "Hello World");


So JSX is not HTML — it is syntactic sugar that makes UI code easier to write and read.

## 2. Is JSX part of React?
❌ No — JSX is not a part of React.

React does NOT require JSX.
It is an optional syntax that many people use because:

It is cleaner and more readable

It visually represents the component structure

It helps catch errors at compile time

It integrates naturally with React’s component-based architecture

JSX is usually compiled by tools like Babel, SWC, or TypeScript before running in the browser.

We can write react app without jsx like below using createElement everytime

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Title'),
    React.createElement('p', null, 'Subtitle')
  );
}


***
***
# ***
⭐ Why do we use className instead of class in React?
## 1. class is a reserved keyword in JavaScript

In JavaScript, class is used to define classes:

class Person {}


Since JSX is JavaScript with HTML-like syntax, using class in JSX would conflict with the JS keyword.

To avoid ambiguity, React uses className.

***
***
# ***
⭐ Props vs State in React
## 1. What are Props?

Props (Properties) are inputs passed from a parent component to a child component.

✔ Key Points

Read-only (immutable inside the child)

Used to configure or customize a component

Flow is unidirectional (parent → child)

Cannot be modified by the receiving component

✔ Example
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

<Welcome name="Akash" />;


name is a prop.

## 2. What is State?

State is internal data that a component manages and can change over time.

✔ Key Points

Mutable (can be updated)

Stored inside the component

Causes the component to re-render when updated

Used for dynamic data: counters, forms, toggles, API responses, etc.

✔ Example
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}


count is state, updated via setCount.


***
***
***

# ⭐ Dumb vs Smart Components in React

Although older terminology (now often called Presentational vs Container Components), interviewers still ask this question frequently.

## 🎨 1. Dumb Components (Presentational Components)
✔ What they are:

Components focused purely on UI.
They receive data via props and render it.
They do not manage state (except minor UI state).

✔ Characteristics:

No business logic

No API calls

Stateless (or minimal state)

Reusable

Easy to test

Don’t know where data comes from

Just display what they receive

✔ Example:
function UserCard({ name, age }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
    </div>
  );
}

## ⚙️ 2. Smart Components (Container Components)
✔ What they are:

Components responsible for logic + data handling.

✔ Characteristics:

Manage state

Handle API calls

Contain business logic

Provide data to Dumb components

Less reusable

Often parent components

✔ Example:
function UserContainer() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return user ? (
    <UserCard name={user.name} age={user.age} />
  ) : (
    <p>Loading...</p>
  );
}


***
***
# k***
ey in react

The key-index map is an internal structure React uses to match list items between renders.
It maps each item’s key to its previous fiber node, helping React efficiently detect changes and update only the necessary parts of the UI.
Using stable, unique keys ensures correct behavior and prevents unnecessary re-renders.

***
***
# F***
ragments in react
A Fragment in React lets you return multiple elements without adding extra DOM nodes.
It avoids unnecessary <div> wrappers, keeps HTML clean, and improves performance.
Use <></> for shorthand, and React.Fragment when you need a key.

## Can Fragments accept props?

Fragments cannot take props except one special case:

✔ key prop (when returning arrays)
const items = users.map(user => (
  <React.Fragment key={user.id}>
    <dt>{user.name}</dt>
    <dd>{user.age}</dd>
  </React.Fragment>
));

***
***
# ***
⭐ What is useState in React?

useState is a React Hook that allows functional components to store and manage state — i.e., data that changes over time and causes re-rendering.

It is one of the most commonly used hooks in React.

## 🔧 Syntax
const [state, setState] = useState(initialValue);

- state → current state value
- setState → function to update the state
- initialValue → default value (number, string, object, array, etc.)


***
***
# W***
hat is useEffect in React?

useEffect is a React Hook used to handle side effects in functional components.
Side effects are operations that happen outside the normal component render flow.

Examples of side effects:

API calls

Subscriptions

Event listeners

Timers (setTimeout, setInterval)

Updating document title

Logging

## 🔧 Syntax
useEffect(() => {
  // side effect (runs after render)
}, [dependencies]);

# 🔍 When does useEffect run?
There are 3 main behaviors based on the dependency array.
## 1️⃣ No Dependency Array → Runs after every render
useEffect(() => {
  console.log("Runs every render");
});

## 2️⃣ Empty Dependency Array → Runs once (like componentDidMount)
useEffect(() => {
  console.log("Runs only on first mount");
}, []);


Use it for:

API calls on load

Event listeners

Subscriptions

## 3️⃣ Dependency Array → Runs when dependencies change
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);


React re-runs the effect if any dependency changes.

⭐ Cleanup Function

You can return a function inside useEffect to clean up side effects.

useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(timer); // cleanup
  };
}, []);


Cleanup runs:

Before component unmounts


## Do useEffect callbacks run before or after the first render?
👉 All useEffect callbacks run after the first render.

Never before.
React always renders the UI first, then runs effects.

🔍 Why?

React follows this lifecycle for functional components:

1️⃣ Render UI (create Virtual DOM)

→ React commits the result to the real DOM

2️⃣ After paint → run useEffect

→ This ensures effects never block rendering
→ UI stays fast and responsive


*** 
***
***
