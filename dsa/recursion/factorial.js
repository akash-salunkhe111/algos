function factorialIterative(n) {
    // Handle base cases for 0 and 1, as their factorial is 1.
    if(n === 0 || n === 1) {
        return 1
    }
  
    // Handle negative numbers, as factorial is not defined for them.
    if (n < 0) {
        return "Factorial not defined"
    }
  
    let result = 1;
    // Loop from 2 up to n (inclusive) to calculate the product.
    for (let i = 2; i <= n; i++) {
        result = result * i;
    }
    return result;
  }

  function factorialRecursive(n) {
    // base case
    if (n === 0 || n === 1) {
        return 1
    }
    return n * factorialRecursive(n - 1)
  }
  
  
  // Example usage:
  console.log(factorialRecursive(5)); // Output: 120
  console.log(factorialRecursive(0)); // Output: 1
  console.log(factorialRecursive(1)); // Output: 1
  