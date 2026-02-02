```
for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
console.log('Loop finished');
```

op - 
```
Loop finished
4
4
4
```

```
var Scoping and Closures: When var is used, the variable i is function-scoped 
(or globally scoped in this case), not block-scoped. There is only one single 
instance of i for the entire loop. By the time the setTimeout callbacks execute 
(after the loop has finished), the value of that single i variable has reached 
its final value, which is 4 (because the loop terminates when i becomes 4).
 All three callbacks close over this same reference to i, so they all log 4. 
```




***
***
***

// Sorting JSON string by marks descending, then by name ascending 

```
const students = [
    { name: "Rahul", marks: 85 },
    { name: "Aditi", marks: 92 },
    { name: "Karan", marks: 92 },
    { name: "Bella", marks: 85 },
  ];

  students.sort((a, b) => {
    // 1. Sort by marks (descending)
    if (b.marks !== a.marks) {
      return b.marks - a.marks;
    }
  
    // 2. Sort by name (ascending)
    return a.name.localeCompare(b.name);   
    // Note spelling of localeCompare, it has e in it
  });
```


***
***
***

# mostRepeatedNumber

```
function mostRepeatedNumber(arr) {
  const freq = {};
  let maxCount = 0;
  let result = null;

  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;

    if (freq[num] > maxCount) {
      maxCount = freq[num];
      result = num;
    }
  }

  return result;
}

// Example
const arr = [1, 3, 2, 3, 4, 3, 2, 2, 2];
console.log(mostRepeatedNumber(arr)); // 2
```


***
***
***

# Event emitter basic code
```
const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('greet', name => {
  console.log(`Hello, ${name}`);
});

emitter.emit('greet', 'Akash');
That’s it ✅
```



***
***
***

# Find highest salary in table

```
CREATE TABLE employees (
  id INT,
  name VARCHAR(50),
  salary INT
);

```

### Solutions

### Only MAX salary op
```
SELECT MAX(salary)
FROM employees;

Note: This query returns only the highest salary amount itself. 
It does not return other employee details like name or ID. 
```

### ✅ Method 2: Using ORDER BY

```
SELECT salary
FROM employees
ORDER BY salary DESC
LIMIT 1;
```

✅ Method 3: Get Employee(s) with Highest Salary

```
SELECT *
FROM employees
WHERE salary = (
  SELECT MAX(salary) FROM employees
);
```

## Uisng join if data is in 2 diff table
```
SELECT e.emp_name, s.salary
FROM employees e
JOIN salaries s ON e.emp_id = s.emp_id
WHERE s.salary = (
  SELECT MAX(salary) FROM salaries
);

```


## For second highest salary

```
SELECT MAX(salary)
FROM employees
WHERE salary < (
  SELECT MAX(salary) FROM employees
);

This method will give only one result as we are using MAX
```

### To get multiple second highest if for eg multiple users has same salary in 2nd place

```
SELECT salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM employees
) t
WHERE rnk = 2;


🔍 How it works

ORDER BY salary DESC
→ Highest salary first

DENSE_RANK() assigns ranks:

70000 → rank 1
70000 → rank 1
65000 → rank 2
50000 → rank 3


WHERE rnk = 2
→ Picks all rows with second highest salary
```


***
***
***


# Write sql and mongodb query to find duplicate aadhar in table with username and aadhar

```
SQL Table
users (
  username VARCHAR(50),
  aadhar   VARCHAR(12)
)


SELECT username, aadhar
FROM users
WHERE aadhar IN (
  SELECT aadhar
  FROM users
  GROUP BY aadhar
  HAVING COUNT(*) > 1
)
ORDER BY aadhar;


// Order by aadhar is optional but it is helpful for debugging
eg - without orderBy
akash   1111
rohan   2222
rahul   1111
neha    2222

```



```
Mongodb
{
  username: "akash",
  aadhar: "123412341234"
}

db.users.aggregate([
  {
    $group: {
      _id: "$aadhar",
      count: { $sum: 1 }
    }
  },
  {
    $match: { count: { $gt: 1 } }
  }
])
```

***
***
***


# Write sql query between customers and orders with a join

```
CREATE TABLE Customers (
  customer_id INT PRIMARY KEY,
  first_name  VARCHAR(50),
  age         INT
);

CREATE TABLE Orders (
  order_id    INT PRIMARY KEY,
  customer_id INT,
  item        VARCHAR(50),
  FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);


SELECT c.first_name, c.age, o.item
FROM Customers c
INNER JOIN Orders o
  ON c.customer_id = o.customer_id;


op - 
Amit  30  Laptop
Amit  30  Mouse
Riya  25  Phone

```





***
***
***

# Design a banking system bd(which database would you choose) and design it in SQL


***
***
***

# SQL execution flow

```
F W G H S D O L

From → Where → Group → Having → Select → Distinct → Order → Limit
```