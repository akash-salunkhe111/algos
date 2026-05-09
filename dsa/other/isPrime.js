var isPrime = function(num) {
    if (num < 2) {
        return false;
    };
    
    for (let i = 2; i <= Math.sqrt(num); i++){
        if(num % i === 0) return false      
    }

    return true;
};

console.log(isPrime(22))

// Check square root optimization


// why this square root optimization works?
// example: 101 square root is 10.04987562112089, so we can check if 101 is prime by checking if it has any factors less than or equal to 10.04987562112089.
// if it does, then 101 is not prime.
// if it does not, then 101 is prime.
// so we can check if the number is prime by checking if it has any factors less than or equal to the square root of the number.
// if it does, then the number is not prime.
// if it does not, then the number is prime.

// 1