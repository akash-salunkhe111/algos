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

type Status = "success" | "error";
type Admin = User & { role: string };

```
When to Use What?
Use interface when:

Defining object shapes

Working with classes

Designing public APIs

You want extensibility

Use type when:

You need unions or intersections

Defining complex types

Working with function types or primitives


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




***
***
***