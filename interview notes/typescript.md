# What Are Generics in TypeScript?

**Generics** allow you to create **reusable, type-safe components** by using **type parameters** instead of fixed types.

They let you write code that works with **any data type**, while still preserving **type information**.


With Generics
```
function identity<T>(value: T): T {
  return value;
}
```

✔ Keeps input and output types the same

```
identity<number>(10);
identity("Hello"); // T inferred as string
```

Generic Arrays
```
function getFirst<T>(arr: T[]): T {
  return arr[0];
}
```

Generics with Interfaces
```
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

const response: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  success: true
};

```
***
***
***

# interface vs type

| Feature                     | `interface` | `type` |
| --------------------------- | ----------- | ------ |
| Object shape                | ✅           | ✅      |
| Union types                 | ❌           | ✅      |
| Intersection types          | ❌           | ✅      |
| Declaration merging         | ✅           | ❌      |
| Extend / inherit            | `extends`   | `&`    |
| Primitives                  | ❌           | ✅      |
| Tuples                      | ❌           | ✅      |
| Recommended for public APIs | ✅           | ❌      |


```
interface Age = number; // ❌ Error
interface Point = [number, number]; // ❌ Error

type Age = number; // Works

interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: string;
}

<!-- Union and intersection -->
type Status = "success" | "error";
type Admin = User & { role: string };

```
When to Use What?
```
Use interface:
- To define object structures and when you expect the object to be extended or implemented by classes.
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: string;
}

const admin: Admin = {
  name: "Bob",
  age: 30,
  role: "Administrator",
};

Type can also be used above but interface is more intutive


- When you need automatic definition merging.
interface User {
  name: string;
}

interface User {
  age: number;
}

const user: User = {
  name: "Alice",
  age: 30,
};


- When defining class contracts.
interface Moveable {
 move(): void;
 getPosition(): { x: number, y: number };
}

class Car implements Moveable {
 move() { console.log("Moving…"); }
 getPosition() { return { x: 0, y: 0 }; }
}

Can do above in type as well but interface is more intutive

- Building public APIs where consumers might need to extend the types
```


***
***
***


# interfaces

# Do We Have to Extend All Fields from Parent?

✅ **Yes, all properties are inherited automatically**  
❌ **No, you do NOT need to redefine them**

```
ts
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: string;
}
```
Admin now has:

ts
```
{
  id: number;
  name: string;
  role: string;
}
```

You cannot remove or skip parent fields.

Can We Override Parent Fields?

⚠️ Only if the type is compatible

```
interface User {
  id: number;
}

interface Admin extends User {
  id: number | string; // ❌ Error (not compatible)
}
```

Valid override:
```
interface User {
  role: string | number;
}

interface Admin extends User {
  role: string; // ✅ narrower type
}
```

If we want to use only some fields from parent then use partial

***
***
***

# What is `Partial` in TypeScript?

`Partial<T>` is a **built-in utility type** in TypeScript that makes **all properties of a type `T` optional**.

---

## Syntax
```
Partial<T>
```
Basic Example
ts
```
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
```
Resulting type:

```
{
  id?: number;
  name?: string;
  email?: string;
}
```
✔ Every field becomes optional
✔ Original type remains unchanged


***
***
***

# How to Make Fields Compulsory or Optional in TypeScript

## 1️⃣ Make a Field Optional (`?`)

Use `?` to mark a field as optional.

```
interface User {
  id: number;      // compulsory
  name?: string;   // optional
}
```



***
***
***

```
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
```

what does this type do 
This is a TypeScript utility type that makes all properties optional, recursively (deep).
```
What it means (line by line)

[P in keyof T]?
→ loop over every property of T and make it optional.

T[P] extends object ? ... : ...
→ if the property is an object, apply DeepPartial recursively.

Otherwise, keep the original type.
```

```
type User = {
  id: number;
  name: string;
  address: {
    city: string;
    pin: number;
  };
};

```

```
type PartialUser = DeepPartial<User>;
```

***
***
***

# Enums in TypeScript

- Enums define a **set of named constant values**
- Improve **readability, type safety, and maintainability**
- Useful when a variable can have **only a fixed set of values**

---

## Numeric Enum (Default)

```ts
enum Status {
  Pending,
  Success,
  Failed
}


***
***
***

##`never` in TypeScript

- `never` represents a value that **never occurs**
- Used for functions that:
  - Never return
  - Always throw an error
- Helps TypeScript with **exhaustive type checking**

---

## Example 1️⃣: Function That Never Returns

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

## Infinite loops

***
***
***

# Type Assertions in TypeScript

- Type assertions tell TypeScript **“trust me, I know the type”**
- They **do not change runtime behavior**
- Used when TypeScript cannot infer the type correctly

```
let value: unknown = "hello";
let len = (value as string).length;

```


***
***
***

# `keyof` Type Operator in TypeScript

- `keyof` produces a **union of property names** of a given type
- Used for **type-safe property access**
- Prevents invalid keys at compile time

---

## Basic Example

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type UserKeys = keyof User;
// "id" | "name" | "email"

function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = { id: 1, name: "Akash", email: "a@a.com" };

getValue(user, "name");   // ✅
getValue(user, "age");    // ❌ compile-time error

```

***
***
***

# What is awaited utility in TypeScript?

```
In TypeScript, Awaited<T> is a utility type that helps you figure out what type you get
 after await resolves a value.

 type A = Awaited<Promise<number>>;
// number
```


***
***
***

# pick and omit in ts

```
type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

Now pick only id and name:

type UserPreview = Pick<User, "id" | "name">;

op - 
type UserPreview = {
  id: number;
  name: string;
};


Omit → remove these
type UserWithoutEmail = Omit<User, "email">;
op - 
type UserWithoutEmail = {
  id: number;
  name: string;
  isAdmin: boolean;
};
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
