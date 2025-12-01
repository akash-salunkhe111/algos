# 🧱 SOLID Principles (Short Notes for JavaScript Interview)

SOLID is a set of 5 object-oriented design principles that help you write clean, maintainable, scalable code.

## 1️⃣ S — Single Responsibility Principle (SRP)

A class/module/function should have only one reason to change.

✔ One piece = One job

Example
```javascript
// ❌ Wrong: One class doing multiple things
class UserService {
  createUser(user) { /* DB logic */ }
  sendEmail(user) { /* Email logic */ }
}
```

// ✅ Correct: Split responsibilities
```javascript
class UserRepository {
  createUser(user) {}
}

class EmailService {
  sendEmail(user) {}
}
```

## 2️⃣ O — Open/Closed Principle (OCP)

Open for extension, closed for modification.

✔ Add new features WITHOUT touching existing code

Example
```javascript
// Base logger
class Logger {
  log(message) {
    console.log("LOG:", message);
  }
}

// Extend without modifying original logger
class FileLogger extends Logger {
  log(message) {
    // write to file instead
  }
}
```

## 3️⃣ L — Liskov Substitution Principle (LSP)

Child classes should work perfectly when used in place of parent classes.

✔ Subclasses must not break parent behavior.

Example
```javascript
class Bird {
  fly() {
    return "Flying";
  }
}

class Sparrow extends Bird {} // OK
class Ostrich extends Bird {  // ❌ Violates LSP
  fly() {
    throw new Error("Ostrich cannot fly");
  }
}
```

# 4️⃣ I — Interface Segregation Principle (ISP)

Don’t force a class to implement methods it does not need.
Different types of workers have different capabilities.

❌ Bad Example (Violates ISP)

Here, all workers must implement eat, work, and sleep — even if some workers do NOT need them (e.g., robots don’t sleep or eat).

```javascript
class Worker {
  eat() { }
  work() { }
  sleep() { }
}

class HumanWorker extends Worker {
  eat() { console.log("Human eating"); }
  work() { console.log("Human working"); }
  sleep() { console.log("Human sleeping"); }
}

class RobotWorker extends Worker {
  eat() { throw new Error("Robots do not eat"); }  // ❌ Violates LSP + ISP
  sleep() { throw new Error("Robots do not sleep"); } // ❌
  work() { console.log("Robot working"); }
}
```

✅ Good Example (Follows ISP)

We split responsibilities into small interfaces (capabilities):

Workable

Sleepable

Eatable

Now each worker implements ONLY what they need.

Interfaces (represented in JS using classes or objects)
```javascript
class Workable {
  work() {}
}

class Eatable {
  eat() {}
}

class Sleepable {
  sleep() {}
}
```

Human: can work, eat, sleep
```javascript
class HumanWorker {
  work() { console.log("Human working"); }
  eat() { console.log("Human eating"); }
  sleep() { console.log("Human sleeping"); }
}
```

Robot: can only work
```javascript
class RobotWorker {
  work() { console.log("Robot working"); }
}
```

## 5️⃣ D — Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules.
Both should depend on abstractions.

✔ Use dependency injection
✔ Pass behavior instead of creating it inside

Example
```javascript
// ❌ Wrong: Hard dependency
class AuthService {
  constructor() {
    this.db = new MySQLDatabase(); // tightly coupled
  }
}
```

// ✅ Correct: Inject dependency
```javascript
class AuthService {
  constructor(database) {
    this.db = database;   // abstracted
  }
}

const db = new MySQLDatabase();
const auth = new AuthService(db);
```



# How to identify if the server stops working in production
1 - health check endpoints and add alerts
2 - use load balancer to check health check endpoints time to time
3 - infrastructure level we can check in aws
4 - logs
5 - Datadog
6 - if stopped, we can restart using pm2, if it fails more than 5 times, then we can add alerts