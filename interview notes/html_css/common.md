🆕 Some new HTML tags (HTML5 / modern spec)

HTML5 introduced many semantic, interactive, and media elements. Here are commonly asked ones:

🎯 Semantic tags (structure + accessibility)
Tag	Purpose
<header>	Intro / top section of page or section
<footer>	Bottom section / copyright / links
<nav>	Navigation links
<section>	Thematic grouping of content
<article>	Independent content (blog, news)
<aside>	Sidebar or complementary content
<main>	Primary content of the page
<figure>	Image + caption wrapper
<figcaption>	Caption for images/video/etc

***
***
***

# What is the CSS Box Model?

The CSS Box Model describes how every HTML element is treated as a rectangular box, and how its size and space are calculated.

Each element is made up of 4 layers (from inside → outside):

+------------------------------+
|          content             |
+------------------------------+
|          padding             |
+------------------------------+
|          border              |
+------------------------------+
|          margin              |
+------------------------------+


🔹 Parts of the box model
1️⃣ Content

The actual data inside the element
(text, images, etc.)

2️⃣ Padding

Space inside the element, around the content

3️⃣ Border

The visible border around the padding

4️⃣ Margin

Space outside the element — pushes elements away from each other


🔧 Important property: box-sizing

By default, CSS adds padding + border on top of width, but you can change that:
```
div {
  box-sizing: border-box;
}
```
***
***
***

# Difference between inline, block, and inline-block in CSS

🟥 display: block

Element starts on a new line

Takes full width of its parent by default

Width/height work

Margin/padding work normally in all directions


🟦 display: inline

Element does not start on a new line

Only takes up as much width as its content

Cannot set width or height manually

Margins/padding work horizontally, but vertical spacing is tricky


🟩 display: inline-block

Does NOT start a new line (like inline)

Width/height can be set (like block)

Sits inline but behaves like a block visually


***
***
***

# What are Semantic HTML Tags?

Semantic HTML tags are tags that clearly describe their meaning and purpose to both browsers and humans.
Instead of using generic <div> everywhere, semantic tags make the page structure meaningful.

👍 Why do we use Semantic HTML?

Better readability

Better SEO

Better accessibility (screen readers)

Makes structure more clear (headers, sections, nav, etc.)

Helps search engines understand content type

🏷 Examples of Semantic Tags
Page structure

<header>

<main>

<footer>

<nav>

<section>

<article>

<aside>



***
***
***

# CSS position values: static, relative, absolute, fixed, sticky

### position: static
What it does: This is the default. The element sits in the normal document flow and ignores top, right, bottom, left, and z-index.​

When to use: Use when you don’t need any special positioning; most elements on a page are static by default.

### relative
The element is positioned relative to its normal position, so "left:20px" adds 20 pixels to the element's LEFT position, z-index also works

### absolute
What it does: Removes the element from normal flow. It is positioned relative to the nearest ancestor that is not static (i.e., has relative, absolute, fixed, or sticky); if none exists, it’s positioned relative to the viewport’s initial containing block (the page)

For overlays, tooltips, badges, popovers, etc.

When you need precise control inside a specific container (set the container to position: relative, child to absolute).​


### fixed

What it does: Removes the element from normal flow and positions it relative to the viewport, not any parent. It stays in the same place even when the page scrolls.​

When to use:

Sticky navigation bars that always stay visible.

Floating buttons (e.g., “Back to top”, chat widgets) pinned to a corner of the screen.​

# sticky
What it does: Acts like relative until a scroll threshold is reached, then behaves like fixed and “sticks” to a position in the scroll container. Requires at least one of top, right, bottom, or left.​

When to use:

Headers that scroll with content but stick to the top once you reach them.

Sticky table headers or sidebars that stay visible within a section while scrolling.​

# inherit	
Inherits this property from its parent element.



***
***
***


# How does CSS specificity work?

CSS specificity determines which CSS rule wins when multiple rules apply to the same element.
Higher-specificity selectors override lower ones.

```
Inline styles > IDs > Classes/Attributes/Pseudo-classes > Elements/Pseudo-elements
```

📌 Specificity order (highest → lowest)

1️⃣ Inline styles

```
<div style="color:red">
```

2️⃣ IDs

```
#title { }
```

3️⃣ Classes, attributes, pseudo-classes

```
.title { }
[data-type="info"] { }
:hover { }
```

4️⃣ Elements & pseudo-elements
```
h1 {``` }
p { }
::before { }
```

🧠 Universal selectors and inheritance

Some selectors don’t add specificity:
```
*
```

⚠️ !important (overrides specificity)
p { color: blue !important }


!important beats normal specificity, but inline + important > all:

Example	Stronger
inline	high
inline + !important	highest

***
***
***

# what are pseudo-classes and pseudo-elements

Pseudo-classes target an element when it is in a particular state (hovered, focused, active, etc.).

👉 They do not create new elements—they apply styles based on state of an existing element.

Examples
```
button:hover { background: blue; }
input:focus { border-color: green; }
a:visited { color: purple; }
li:first-child { font-weight: bold; }
```

🔹 Pseudo-elements

Pseudo-elements create or style a part of an element that isn’t explicitly in the HTML DOM—such as the first letter, or before/after content.

Examples
```
p::first-line { font-weight: bold; }
p::first-letter { font-size: 2em; }

button::before {
  content: "👉 ";
}
```

***
***
***

# What is z-index?

z-index controls stacking order (which element appears on top) when elements overlap.

Higher z-index = appears above elements with lower values.

.box {
  position: relative;  /* or absolute, fixed, sticky */
  z-index: 10;
}


⚠️ z-index only works on positioned elements
(position: relative / absolute / fixed / sticky)

🧠 Common confusion
“Why is my element with z-index: 9999 still behind something??”

Because it’s inside a stacking context that’s below another stacking context.

z-index only compares inside the same context, not globally.

```
🧩 Visual mental model
Stacking Context A
  - z-index applies here only

Stacking Context B
  - separate stacking world
```

🔥 When does a new stacking context get created?

A new stacking context is created when an element has:

position + z-index (non-auto)

opacity < 1

transform

***
***
***

# Ways to include CSS in HTML (and pros/cons)

There are 4 common ways to use CSS in HTML:

```
1️⃣ Inline CSS
<p style="color: red;">Hello</p>
```
✔ Pros

Quick styling for a single element

Useful for dynamic styles (JS)

❌ Cons

Hard to maintain

Breaks separation of concerns

No reuse

Lowest reusability

```
2️⃣ Internal CSS (inside <style> tag)
<head>
  <style>
    p { color: blue; }
  </style>
</head>
```
✔ Pros

Good for small pages

No extra file needed

❌ Cons

Styles don’t apply across multiple pages

Not scalable

Larger HTML file

```
3️⃣ External CSS (recommended)
<link rel="stylesheet" href="styles.css" />
```

✔ Pros

Best practice / industry standard

Maintainable

Reusable across pages

Cached by browser (faster loading)

Clean separation

❌ Cons

Extra HTTP request (tiny performance cost)

Requires network to load (unless cached)


***
***
***



| Feature                       | Flexbox                         | CSS Grid                            |
| ----------------------------- | ------------------------------- | ----------------------------------- |
| Layout dimension              | **1D** (row **or** column)      | **2D** (rows **and** columns)       |
| Axis                          | Single main axis                | Both horizontal & vertical          |
| Content-first or layout-first | **Content-first**               | **Layout-first**                    |
| Good for                      | Small components                | Page-level layouts                  |
| Item alignment                | Excellent single-axis alignment | Powerful both-axis alignment        |
| Nesting                       | Often needed                    | Less nesting needed                 |
| Responsiveness                | Easy for 1D                     | Extremely powerful for full layouts |


***
***
***


⭐ 1. Centering with Flexbox (Easiest + Most Common)

```
.container {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  height: 100vh;           /* or any height */
}
```

⭐ 2. Centering with CSS Grid

```
.container {
  display: grid;
  justify-content: center;
  align-items: center;
}
```


***
***
***

🟦 What Are Media Queries?

Media queries are CSS rules that apply styles only when certain conditions are met, such as:

screen width

device orientation

They allow CSS to adapt layouts to different screen sizes, enabling responsive design.

Syntax example:

```
/* This rule applies only when the screen is 600px wide or smaller. */
@media (max-width: 600px) {
  .container {
    padding: 10px;
  }
}
```


```
/* apply new styles on screens wider than 600px */
@media (min-width: 600px) {
  .box { padding: 20px; }
}
```

***
***
***


# What is the difference between justify-content, align-items, and align-self?

Answer (expected):

justify-content → Aligns items along the main axis (row or column)

align-items → Aligns items along the cross axis for all items

align-self → Overrides align-items for a single flex item



***
***
***

# What is `flex-grow`?

`flex-grow` is a Flexbox property that defines **how much a flex item should grow** relative to other items when there is **extra space available** in the flex container.

- Default value: `0`
- A higher value means the item will take **more available space**.

### Example:
```
css
.item1 { flex-grow: 1; }
.item2 { flex-grow: 2; }
```

Common shorthand values:

flex: 1 → 1 1 0 (items grow equally, ignore initial size)

flex: auto → 1 1 auto (items grow and respect content size)

flex: none → 0 0 auto (items neither grow nor shrink)


***
***
***

# What is CSS Grid?

**CSS Grid** is a **two-dimensional layout system** that allows you to control both:
- **Rows**
- **Columns**


```

html
<div class="container">
  <header class="header">Header</header>
  <main class="content1">Content 1</main>
  <main class="content2">Content 2</main>
  <main class="content3">Content 3</main>
  <footer class="footer">Footer</footer>
</div>

.container {
  display: grid;

  /* 3 rows: header, content, footer */
  grid-template-rows: auto 1fr auto;

  /* 3 columns for content row */
  grid-template-columns: repeat(3, 1fr);

  /* Define layout areas */
  grid-template-areas:
    "header header header"
    "c1     c2     c3"
    "footer footer footer";

  height: 100vh;
}

.header {
  grid-area: header;
}

.content1 {
  grid-area: c1;
}

.content2 {
  grid-area: c2;
}

.content3 {
  grid-area: c3;
}

.footer {
  grid-area: footer;
}


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