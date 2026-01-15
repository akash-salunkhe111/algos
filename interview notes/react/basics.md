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
```javascript
const el = document.getElementById("counter");
let count = 0;

function increment() {
  count++;
  el.innerText = count; // direct DOM update
}
```


If increment() runs 10 times quickly:

DOM updates happen 10 times

Browser triggers 10 reflows + repaints

Layout & style recalculation each time (expensive)

⚛️ React — Batched Virtual DOM updates
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);
  }

  return <p>{count}</p>;
}
```

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
```html
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
```


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

```jsx
const element = <h1>Hello World</h1>;
```


Under the hood, JSX compiles to pure JavaScript:

```javascript
const element = React.createElement("h1", null, "Hello World");
```


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

```javascript
function App() {
  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'Title'),
    React.createElement('p', null, 'Subtitle')
  );
}
```


***
***
***


# ⭐ Why do we use className instead of class in React?
## 1. class is a reserved keyword in JavaScript

In JavaScript, class is used to define classes:

```javascript
class Person {}
```


Since JSX is JavaScript with HTML-like syntax, using class in JSX would conflict with the JS keyword.

To avoid ambiguity, React uses className.

***
***
***


# ⭐ Props vs State in React
## 1. What are Props?

Props (Properties) are inputs passed from a parent component to a child component.

✔ Key Points

Read-only (immutable inside the child)

Used to configure or customize a component

Flow is unidirectional (parent → child)

Cannot be modified by the receiving component

✔ Example
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

<Welcome name="Akash" />;
```


name is a prop.

## 2. What is State?

State is internal data that a component manages and can change over time.

✔ Key Points

Mutable (can be updated)

Stored inside the component

Causes the component to re-render when updated

Used for dynamic data: counters, forms, toggles, API responses, etc.

✔ Example
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```


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
***


# key in react

The key-index map is an internal structure React uses to match list items between renders.
It maps each item’s key to its previous fiber node, helping React efficiently detect changes and update only the necessary parts of the UI.
Using stable, unique keys ensures correct behavior and prevents unnecessary re-renders.

***
***
***


# Fragments in react
A Fragment in React lets you return multiple elements without adding extra DOM nodes.
It avoids unnecessary <div> wrappers, keeps HTML clean, and improves performance.
Use <></> for shorthand, and React.Fragment when you need a key.

## Can Fragments accept props?

Fragments cannot take props except one special case:

✔ key prop (when returning arrays)
```jsx
const items = users.map(user => (
  <React.Fragment key={user.id}>
    <dt>{user.name}</dt>
    <dd>{user.age}</dd>
  </React.Fragment>
));
```

***
***
***


# ⭐ What is useState in React?

useState is a React Hook that allows functional components to store and manage state — i.e., data that changes over time and causes re-rendering.

It is one of the most commonly used hooks in React.

## 🔧 Syntax
```javascript
const [state, setState] = useState(initialValue);
```

- state → current state value
- setState → function to update the state
- initialValue → default value (number, string, object, array, etc.)


***
***
***


# What is useEffect in React?

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
```javascript
useEffect(() => {
  // side effect (runs after render)
}, [dependencies]);
```

# 🔍 When does useEffect run?
There are 3 main behaviors based on the dependency array.
## 1️⃣ No Dependency Array → Runs after every render
```javascript
useEffect(() => {
  console.log("Runs every render");
});
```

## 2️⃣ Empty Dependency Array → Runs once (like componentDidMount)
```javascript
useEffect(() => {
  console.log("Runs only on first mount");
}, []);
```


Use it for:

API calls on load

Event listeners

Subscriptions

## 3️⃣ Dependency Array → Runs when dependencies change
```javascript
useEffect(() => {
  console.log("Runs when count changes");
}, [count]);
```


React re-runs the effect if any dependency changes.

⭐ Cleanup Function

You can return a function inside useEffect to clean up side effects.

```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(timer); // cleanup
  };
}, []);
```


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
 
# ⭐ What is useReducer in React?

useReducer is a React Hook used to manage complex state logic in functional components.
It is an alternative to useState and is especially useful when:

The state has multiple sub-values

State updates depend on previous state

Multiple actions modify the same state

You want centralized state logic (like Redux inside a component)

## 🔧 Syntax
const [state, dispatch] = useReducer(reducer, initialState);

- state → current state
- dispatch(action) → function to send actions
- reducer(state, action) → function that returns the new state
# 🔍 How useReducer Works

1️⃣ You define a reducer function
2️⃣ You define an initial state
3️⃣ You call dispatch() with an action
4️⃣ React calls the reducer → returns new state
5️⃣ Component re-renders with updated state

## ✔ Example: Counter using useReducer
Reducer function
```
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}
```
Component using the reducer
```
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}
```

***
***
***

# ⭐ What is useContext in React?

useContext is a React Hook that allows you to share data across the component tree without passing props down manually at every level (a.k.a prop drilling).

It provides a way to access values from React Context, which acts like a global state container for a part of the app.

## Why do we need useContext?

Without useContext, data has to be passed like this:

App → Parent → Child → GrandChild → ComponentNeedingData


This is called prop drilling and becomes messy.

useContext allows any component to directly consume the value.

## 🔧 Syntax
const value = useContext(MyContext);

# ✔ Example: Theme Context (Dark / Light)
1️⃣ Create Context
```
const ThemeContext = React.createContext();
```
2️⃣ Provide the value (at a high level)
```
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Home />
    </ThemeContext.Provider>
  );
}
```
3️⃣ Consume the value using useContext
```
function Home() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <h2>Current Theme: {theme}</h2>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </>
  );
}
```

⭐ What happens here?

ThemeContext.Provider defines a shared state

All components inside the provider can access the value with useContext

No need to pass theme or setTheme as props through multiple components

***
***
***

# ⭐ What is useRef in React?

useRef is a React Hook that allows you to:

Access DOM elements directly

 Measure width/height of an element
 ```
function Box() {
  const boxRef = useRef();

  useEffect(() => {
    console.log("Width:", boxRef.current.offsetWidth);
    console.log("Height:", boxRef.current.offsetHeight);
  }, []);

  return (
    <div
      ref={boxRef}
      style={{ width: "200px", height: "100px", background: "lightblue" }}
    />
  );
}
```
***
***
***


useMemo & useCallback in React (Interview Explanation)

Both hooks are used for performance optimization, but they solve different problems.

# 🚀 1. useMemo — Memoize Values

useMemo caches the result of a computation so it does NOT re-run on every render.

✔ Use it when:

You have expensive calculations

You want to avoid recalculating derived data unnecessarily

🔧 Syntax

```
const memoizedValue = useMemo(() => computeSomething(a, b), [a, b]);

✔ Example: Expensive Calculation
function ExpensiveComponent({ num }) {
  const expensiveValue = useMemo(() => {
    console.log("Running heavy calculation...");
    return num * 1000; 
  }, [num]);

  return <h2>Value: {expensiveValue}</h2>;
}
```

Without useMemo

The heavy calculation runs on every render.

With useMemo

It only runs when num changes.

# 🚀 2. useCallback — Memoize Functions

useCallback returns a memoized version of a function, so it is not recreated on every render.

✔ Use it when:

Passing a function to a child component (prevents unnecessary re-renders)

You have dependencies that rarely change

You want stable function references

🔧 Syntax
```
const memoizedFn = useCallback(() => {
  doSomething(value);
}, [value]);

✔ Example: Prevent Child Re-render

Parent Component:

function Parent() {
  const [count, setCount] = React.useState(0);

  const handleClick = useCallback(() => {
    console.log("Clicked!");
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

Child Component:
```
const Child = React.memo(function Child({ onClick }) {
  console.log("Child re-rendered");
  return <button onClick={onClick}>Child Button</button>;
});
```
Without useCallback

The parent creates a new function every render

Child re-renders every time

With useCallback

Function reference stays the same

Child does not re-render unnecessarily

🎯 useMemo vs useCallback (Simple Table)
| Hook            | Memoizes | Use case                                                          |
| --------------- | -------- | ----------------------------------------------------------------- |
| **useMemo**     | Value    | Avoid expensive recalculations                                    |
| **useCallback** | Function | Prevent unnecessary re-renders due to changing function reference |


***
***
***

# What are React Portals?

A React Portal allows you to render a component outside its normal parent DOM hierarchy, while still keeping it inside the same React component tree.

You create a portal using:
```
ReactDOM.createPortal(child, container)
```

Example:

```
return ReactDOM.createPortal(
  <div className="modal">Hello</div>,
  document.getElementById("modal-root")
);
```
⭐ Why are Portals Needed?

Normally, components render inside the DOM element where your React app is mounted.

But some UI elements need to break out of this structure, for example:

✔ Modals
✔ Dialogs / Popups
✔ Tooltips
✔ Dropdowns

***
***
***

React.lazy and React.Suspense (Interview Explanation)

Together, React.lazy and React.Suspense enable code splitting and lazy loading of components in React.

This improves performance by loading components only when needed, instead of bundling everything into a large initial JavaScript file.

# 🚀 React.lazy — Lazy-load Components

React.lazy allows you to load a component dynamically using import().
The component is only loaded when it is first rendered.

🔧 Syntax
```
const MyComponent = React.lazy(() => import('./MyComponent'));
```

This tells React:

“Do not include MyComponent in the main bundle. Load it only when needed.”

✔ Example: Lazy Loading a Component
```
const About = React.lazy(() => import("./About"));

function App() {
  return (
    <div>
      <h1>Home Page</h1>
      <About />   {/* Loaded only when rendered */}
    </div>
  );
}
```

# 🎟 React.Suspense — Fallback While Loading

Since React.lazy loads components asynchronously, React needs a way to show something while loading.

React.Suspense wraps lazy components and shows a fallback UI.

🔧 Syntax
```
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```
✔ Example: Lazy Component with Suspense
```
const About = React.lazy(() => import("./About"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <About />
    </Suspense>
  );
}
```

When About is loading, React shows:

Loading...

# ⭐ Why use React.lazy + Suspense?
✔ Reduce initial bundle size

Large components (charts, editors, pages) load on demand.

✔ Faster initial load time

User sees the UI sooner.

✔ Great for routing

You can lazy-load individual pages.

✔ Works well with code splitting tools (Webpack, Vite)


***
***
***

# The Real Reason: Detect Unsafe or Buggy Code

React tries to catch problems where your component logic is not pure.

A component should be a pure function, meaning:

Rendering should NOT cause side effects

Rendering should NOT change data

Rendering should NOT mutate props or state

Rendering should NOT cause subscriptions or timers without cleanup

To detect these issues early, React re-renders the component.

## 🔍 What exactly happens?

In React 18 and newer:

✔ React mounts the component
✔ Then unmounts it
✔ Then mounts it again

This reveals hidden bugs like:

Double API calls

Double state initialization

Missing cleanup functions

Effects that mutate data

Timers or intervals that weren’t cleaned up

Database listeners not being detached

***
***
***

# Can we force component to rerender without state or props change

React class components include a built-in method:

## 🔥 this.forceUpdate()

***
***
***

# React fiber

React Fiber is the internal reconciliation engine introduced in React 16.
It completely rewrote how React updates the UI.

Fiber is not a feature you use directly — it is the algorithm and architecture inside React that makes rendering faster, interruptible, and smarter.

⭐ Why did React need Fiber?

Before Fiber (React 15):

Rendering was synchronous

Slow components blocked the UI

Browser events could lag or freeze

Large trees caused jank

React needed a new system that could:

Pause work

Split work into small pieces

Reuse work

Prioritize urgent updates (e.g., typing)

Abort low-priority updates

***
***
***

# Virtual DOM (Interview Explanation)

The Virtual DOM is a lightweight in-memory representation of the real DOM that React uses to efficiently update the UI.
When the state changes, React:

Creates a new Virtual DOM tree

Compares it with the previous one (diffing algorithm)

Updates only the changed parts of the real DOM

This makes rendering faster and avoids unnecessary reflows.

🔄 Before & After Update
Before Update:
```
Virtual DOM:  <h1>Count: 0</h1>
Real DOM:     <h1>Count: 0</h1>
```
After Update:
```
New Virtual DOM: <h1>Count: 1</h1>
Diff:            text changed (0 → 1)
→ Update only that text node in Real DOM
```

React doesn’t update the real DOM after every small change.
It batches multiple state updates, processes them in memory using the Virtual DOM, calculates the minimal set of DOM changes, and then commits them all at once.

This batching is one of React’s biggest performance advantages.

🧩 Analogy

Imagine editing a Word document.
If you press backspace 10 times, you don’t want the printer to reprint 10 times.
You finish editing → then print once.

React works the same way:

Collect changes → Compute differences → Update the real DOM once efficiently

🔍 Example Comparison
🧠 Plain JavaScript (Immediate DOM Updates)
```
const el = document.getElementById("counter");
let count = 0;

function increment() {
  count++;
  el.innerText = count; // direct DOM update
}
```

If increment() is called 10 times quickly:

DOM updates → 10 times

10 reflows + 10 repaints

Browser recalculates layout each time → expensive

⚛️ React (Batched Virtual DOM Updates)
```
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);
  }

  return <p>{count}</p>;
}
```

React will:

Queue multiple setCount() calls

Batch them in the same event loop tick

Compute the final state

Re-render the Virtual DOM once

Apply one efficient real DOM update

✔️ Only one real DOM write (instead of 3).

***
***
***

React recoincialion/diffing algo

Excellent 👏 — this is one of those questions that separate React users from React engineers.
Let’s explain React’s diffing (reconciliation) algorithm in a clear, short, and interview-ready way 👇

⚛️ Goal of the Diffing Algorithm
React’s diffing algorithm (aka reconciliation) determines:
“What changed in the Virtual DOM, and what’s the minimal set of updates needed in the Real DOM?”
Because re-rendering the entire DOM is expensive, React efficiently figures out which parts actually changed — then updates only those.

🧩 The Core Idea
When state/props change:
React creates a new Virtual DOM tree (based on new render).


It compares the new VDOM with the previous VDOM (stored in memory).


It finds differences (diffing).


It updates only the changed nodes in the real DOM (commit phase).



🧠 The Diffing Process in a Nutshell
React’s diffing algorithm uses 3 key heuristics (rules of thumb) to make diffing fast — O(n) instead of O(n³).
Let’s go through them 👇

🧩 1️⃣ Element type comparison
If the type of an element is different → React destroys and recreates that node.
```
// before
<div>Hello</div>
// after
<span>Hello</span>
```

➡️ React removes <div> and creates <span> — no attempt to reuse.
If the type is same, React keeps the existing DOM node and updates attributes/props.
```
<div className="a"></div>
<div className="b"></div>
```

➡️ React just updates the class — reuses the same <div>.

```
🧩 2️⃣ Text node comparison
If the content of a text node changes:
<p>Hello</p>
<p>Hi</p>
```

➡️ React updates only the text content, not the whole element.

🧩 3️⃣ List diffing with key
When elements are in a list (map()), React uses the key prop to identify which items changed, were added, or removed.
Example:
```
<ul>
  <li key="A">A</li>
  <li key="B">B</li>
  <li key="C">C</li>
</ul>
```
If next render gives:
```
<ul>
  <li key="B">B</li>
  <li key="A">A</li>
  <li key="C">C</li>
</ul>
```

With proper keys (A, B, C), React reorders nodes efficiently.


Without keys (or using array indexes), React can recreate all items — slower and causes bugs.


✅ Keys let React match elements between renders.

🧮 Complexity Optimization
Naive diffing between two trees = O(n³).
 React’s heuristic-based approach = O(n), which is practical for UIs.

🧠 Visual Example
```
Old Virtual DOM:         New Virtual DOM:
<div>                    <div>
  <h1>Hello</h1>           <h1>Hello</h1>
  <p>World</p>             <p>React</p>
</div>                   </div>
```

Diff result:
- <h1> same → no change
- <p> text changed → update only innerText

➡️ Only the <p>’s text is updated in the real DOM.
 Everything else is reused.


***
***
***

# Custom Hooks in React

Custom Hooks are reusable JavaScript functions in React that use built-in hooks (like useState, useEffect, etc.) to extract component logic into a separate function.

They help you reuse logic, avoid duplicating code, and keep components clean.

### Rules of Custom Hooks

Must start with the word use
(e.g., useFetch, useCounter)

Must follow all rules of hooks, same as built-in hooks

Call hooks only at the top level

Not inside loops

Not inside conditions

Not inside nested functions

Call hooks only inside React functions

Inside React components ✔️

Inside custom hooks ✔️

Not in regular JS functions ❌

Not in class components ❌

Custom hooks can call other hooks
(They are just functions that reuse hook logic)

***
***
***
# What are controlled and uncontrolled components in react
Controlled vs Uncontrolled Components in React
✅ Controlled Components

A controlled component is a form element (like <input>, <textarea>, <select>) whose value is fully controlled by React state.

React controls the input value, and updates happen via setState / setValue.

🔹 Key Points

React state is the single source of truth

The input value changes only when React updates state

Easier to validate, transform, and track form values

🔹 Example (Controlled Input)
```
function Form() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

✅ Uncontrolled Components

An uncontrolled component is a form element where the DOM itself controls the value, not React.

You read values using a ref instead of state.

🔹 Key Points

Browser DOM is the source of truth

Useful for quick forms or when you don’t need to track every keystroke

Minimal React involvement

🔹 Example (Uncontrolled Input)
```
function Form() {
  const inputRef = useRef();

  const handleSubmit = () => {
    alert(inputRef.current.value);
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```
useRef itself is neither controlled nor uncontrolled. But when you use useRef to manage form inputs, it creates an uncontrolled component.

***
***
***

# difference between useMemo and react.memo

### Difference between `useMemo` and `React.memo`

- **`useMemo`:** Memoizes a **value or computation** inside a component to avoid expensive recalculations on re-renders.
- **`React.memo`:** Memoizes an **entire component**, preventing re-render if its props have not changed.

**In short:**  
`useMemo` optimizes **calculations**, while `React.memo` optimizes **component re-renders**.

### Example: When `React.memo` is needed

Use `React.memo` when a **child component receives the same props repeatedly** but still re-renders because the parent updates.

```jsx
const ProductCard = React.memo(({ product }) => {
  console.log("ProductCard rendered");
  return <div>{product.name}</div>;
});

function ProductList({ products }) {
  const [count, setCount] = React.useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </>
  );
}
```

Why React.memo helps
Clicking Increment updates count

Parent re-renders

Without React.memo, all ProductCards re-render

With React.memo, ProductCard re-renders only if product changes


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