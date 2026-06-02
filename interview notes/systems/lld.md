# Singleton Design Pattern

```
Type: Creational Design Pattern

Definition:
Singleton ensures that only one instance of a class is created throughout the application 
and provides a global access point to that instance.

Pros
Saves memory by creating only one object.
Useful for shared resources (DB connections, loggers, caches).
Centralized access to a single instance.

Cons
Acts like a global variable, increasing coupling.
Harder to unit test and mock.
Can become a bottleneck if overused.

```
## MongoDB Connection Example (Node.js)
```
const { MongoClient } = require('mongodb');

class MongoDB {
  static instance;

  static async getInstance() {
    if (!MongoDB.instance) {
      const client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
      MongoDB.instance = client.db('mydb');
    }

    return MongoDB.instance;
  }
}

module.exports = MongoDB;


const MongoDB = require('./MongoDB');

async function getUsers() {
  const db = await MongoDB.getInstance();
  return db.collection('users').find().toArray();
}
```


***
***
***

# Factory Design Pattern
```
Type: Creational Design Pattern

Definition:
Factory Pattern provides an interface for creating objects and lets the factory 
decide which object to instantiate, hiding the object creation logic from the client.

Pros
Encapsulates object creation logic.
Makes code easier to extend and maintain.
Reduces tight coupling between client and concrete classes.

Cons
Adds extra abstraction and complexity.
May require more classes/files for simple use cases.
```

## Example (Notification Factory in JavaScript)
```
class EmailNotification {
  send(msg) {
    console.log(`Email: ${msg}`);
  }
}

class SMSNotification {
  send(msg) {
    console.log(`SMS: ${msg}`);
  }
}

class NotificationFactory {
  static create(type) {
    if (type === 'email') return new EmailNotification();
    if (type === 'sms') return new SMSNotification();

    throw new Error('Invalid notification type');
  }
}

const notifier = NotificationFactory.create('email');
notifier.send('Hello User');
```

***
***
***

# Observer (Pub/Sub) Pattern

```
Type: Behavioral Design Pattern

Definition:
Observer Pattern defines a one-to-many relationship where multiple subscribers (observers) 
automatically get notified whenever the publisher (subject) changes state or emits an event.

Pros
Loose coupling between publisher and subscribers.
Easy to add or remove subscribers.
Great for event-driven systems.

Cons
Can be difficult to debug with many subscribers.
Too many notifications can impact performance.
Subscribers must be managed properly to avoid memory leaks.
```

## Example (Node.js EventEmitter)
```
const EventEmitter = require('events');

const orderEmitter = new EventEmitter();

// Subscribers
orderEmitter.on('orderCreated', (orderId) => {
  console.log(`Sending email for order ${orderId}`);
});

orderEmitter.on('orderCreated', (orderId) => {
  console.log(`Updating inventory for order ${orderId}`);
});

// Publisher
orderEmitter.emit('orderCreated', 'ORD123');


Output:
Sending email for order ORD123
Updating inventory for order ORD123

Here, orderEmitter is the Publisher (Subject), and the email and inventory handlers 
are Subscribers (Observers). When the orderCreated event is emitted, 
all subscribers are notified automatically, demonstrating the Observer (Behavioral) Pattern.
```

***
***
***

# Strategy Pattern

```
Type: Behavioral Design Pattern

Definition:
Strategy Pattern defines a family of algorithms, encapsulates each one in a separate class/function, 
and allows them to be swapped at runtime without changing the client code.

Pros
Eliminates large if-else or switch statements.
Easy to add new strategies without modifying existing code.
Promotes the Open/Closed Principle.

Cons
Increases the number of classes/functions.
Can be overkill for simple logic.
Client needs to know which strategy to choose.
```

## Example (Payment Strategy in JavaScript)
```
class CreditCardPayment {
  pay(amount) {
    console.log(`Paid ₹${amount} using Credit Card`);
  }
}

class UPIPayment {
  pay(amount) {
    console.log(`Paid ₹${amount} using UPI`);
  }
}

class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  executePayment(amount) {
    this.strategy.pay(amount);
  }
}

usage - 
const paymentMethod = new UPIPayment();

const payment = new PaymentContext(paymentMethod);
payment.executePayment(1000);

Output:
Paid ₹1000 using UPI
Here, CreditCardPayment and UPIPayment are different Strategies, 
and PaymentContext uses whichever strategy is provided at runtime. 
This demonstrates the Strategy (Behavioral) Pattern.
```

***
***
***


# State Pattern

```
Type: Behavioral Design Pattern

Definition:
State Pattern allows an object to change its behavior when its internal state changes. 
The object appears to change its class by delegating behavior to state-specific objects.

Pros
Eliminates complex if-else or switch statements based on state.
Makes state transitions explicit and easier to maintain.
Follows the Single Responsibility Principle.

Cons
Increases the number of classes/functions.
Can be overkill for simple state management.
State transition logic can become complex.
```

## Example (Order State in JavaScript)

```
class PendingState {
  handle() {
    console.log('Order is pending');
  }
}

class ShippedState {
  handle() {
    console.log('Order has been shipped');
  }
}

class Order {
  setState(state) {
    this.state = state;
  }

  showStatus() {
    this.state.handle();
  }
}

Usage:

const order = new Order();

order.setState(new PendingState());
order.showStatus();

order.setState(new ShippedState());
order.showStatus();

Output:

Order is pending
Order has been shipped

Here, PendingState and ShippedState are different States, 
and the Order object's behavior changes based on its current state. 
This demonstrates the State (Behavioral) Pattern.
```