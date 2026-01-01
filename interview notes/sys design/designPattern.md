# Dependency Injection / Inversion of Control (IoC)
Uses the gift-box IoC container for dependency management.

Dependency Injection (DI) provides dependencies from outside rather than creating them inside a class.

Implementation in this repository
1. IoC container setup
The repository uses gift-box as the IoC container:

Advantages
Loose coupling: classes depend on abstractions, not concrete implementations
Testability: easy to mock dependencies
Maintainability: change implementations without modifying dependent classes
Single Responsibility: classes focus on their core logic


2. Dependency registration
Dependencies are registered in ioc-definitions.js files. Example from the users service:
```
module.exports = function (container) {
  container.addSingleton('IUsersProvider', function (deps) {
    return new UserProvider(
      deps.IPasswordEncoder,
      null,
      deps.ILoyaltyDiscountProvider,
      deps.IConfig,
      deps.IOtpProvider,
      deps.INotificationProvider
    );
  }, ['IPasswordEncoder', 'ILoyaltyDiscountProvider', 'IConfig', 'IOtpProvider', 'INotificationProvider']);
  ```


  How it works:
container.addSingleton(key, factory, dependencies) registers a service
The factory function receives deps with resolved dependencies
The dependencies array lists required keys
The container resolves dependencies automatically

Classes receive dependencies via constructors:

```
class UserProvider {
  constructor (passwordEncoder, notesRepository, loyaltyDiscountProvider, config, otpProvider, notificationProvider) {
    this._passwordEncoder = passwordEncoder;
    this._notesRepository = notesRepository;
    this._loyaltyDiscountProvider = loyaltyDiscountProvider;
    this._config = config;
    this.otpProvider = otpProvider;
    this.notificationProvider = notificationProvider;
  }

```


# Layered Architecture Pattern
Concept
Layered Architecture organizes code into horizontal layers, each with a specific responsibility. Requests flow through layers, and each layer only communicates with adjacent layers.

Layer 1: Pipeline (Presentation/API)
Responsibility: HTTP request/response handling, validation, data transformation

Pipeline responsibilities:
Extract data from HTTP requests
Validate input
Transform request data
Handle HTTP errors (Boom)
Call the Handler layer
Return HTTP responses


Layer 2: Handler (Business Logic)
Responsibility: Orchestrate business logic, coordinate between providers, handle business rules

Handler responsibilities:
Orchestrate business logic
Coordinate multiple providers
Apply business rules
Transform data between layers
Handle business-level errors



Layer 3: Provider/Repository (Data Access)
Responsibility: Data access, external service calls, database operations


Provider responsibilities:
Make external API calls
Query databases
Transform data from external sources
Handle data access errors
Cache data when appropriate