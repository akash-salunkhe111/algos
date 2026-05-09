# INNER JOIN

Returns only matching rows from both tables.

## users

| id | name  |
|----|-------|
| 1  | Akash |
| 2  | Rahul |
| 3  | Neha  |

## orders

| id | user_id | product  |
|----|----------|----------|
| 1  | 1        | Laptop   |
| 2  | 1        | Mouse    |
| 3  | 2        | Keyboard |

## Query

```sql
SELECT users.name, orders.product
FROM users
INNER JOIN orders
ON users.id = orders.user_id;
```

## Result

| name  | product  |
|--------|----------|
| Akash | Laptop   |
| Akash | Mouse    |
| Rahul | Keyboard |

👉 Only matching users + orders are returned.

---

# LEFT JOIN

Returns all rows from left table, even if no match exists.

## Query

```sql
SELECT users.name, orders.product
FROM users
LEFT JOIN orders
ON users.id = orders.user_id;
```

## Result

| name  | product  |
|--------|----------|
| Akash | Laptop   |
| Akash | Mouse    |
| Rahul | Keyboard |
| Neha  | NULL     |

👉 Neha appears even though she has no orders.

---

# RIGHT JOIN

Returns all rows from right table, even if no match exists.

Suppose orders table has one invalid user:

## orders

| id | user_id | product |
|----|----------|---------|
| 1  | 1        | Laptop  |
| 2  | 5        | Camera  |

## Query

```sql
SELECT users.name, orders.product
FROM users
RIGHT JOIN orders
ON users.id = orders.user_id;
```

## Result

| name  | product |
|--------|---------|
| Akash | Laptop  |
| NULL  | Camera  |

👉 Camera order appears even though user does not exist.

---

# SELF JOIN

A table joins with itself.

Example: Employees and their managers.

## employees

| id | name  | manager_id |
|----|-------|-------------|
| 1  | Akash | NULL        |
| 2  | Rahul | 1           |
| 3  | Neha  | 1           |

## Query

```sql
SELECT 
    e.name AS employee,
    m.name AS manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.id;
```

## Result

| employee | manager |
|-----------|---------|
| Akash    | NULL    |
| Rahul    | Akash   |
| Neha     | Akash   |

👉 Same table used twice:

- `e` = employee
- `m` = manager

---

# Quick Memory Trick

- INNER → only matches
- LEFT → everything from left table
- RIGHT → everything from right table
- SELF → same table joins itself