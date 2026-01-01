// Example 1:

// Input: prices = [7,1,5,3,6,4]
// Output: 7
// Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
// Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
// Total profit is 4 + 3 = 7.


var bestTimeToBuyAndSellStock2 = function(prices) {
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        const currentPrice = prices[i];
        const previousPrice = prices[i-1];

        if (previousPrice < currentPrice) {
            maxProfit = maxProfit + (currentPrice - previousPrice);
        }

    }
    return maxProfit
};


console.log(bestTimeToBuyAndSellStock2([7,1,5,3,6,4]));
// just add difference if previous price is less than current price
// start loop with 1 as we need to check previous price