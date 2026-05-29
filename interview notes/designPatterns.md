# Dependency Injection
```
instead of a class/function creating dependencies itself,
dependencies are provided from outside

Bad coupling ❌

class UserService {

    constructor() {

        // tightly coupled
        this.db = new MongoClient();
    }

    getUsers() {
        return this.db.find();
    }
}

Problem:

hard to test
hard to replace DB
tightly coupled


With Dependency Injection

Dependencies are injected from outside ✅

class UserService {

    constructor(db) {

        // dependency injected
        this.db = db;
    }

    getUsers() {
        return this.db.find();
    }
}

Usage:
const service = new UserService(mongoDb);
```
