// Koko Eating Bananas

// Koko loves to eat bananas.

// There are n piles of bananas, where the i-th pile contains piles[i] bananas.

// The guards have gone away and will return in h hours.

// Koko can decide her eating speed k (bananas per hour).

// Each hour:

// Koko chooses exactly one pile of bananas.
// She eats k bananas from that pile.
// If the pile has fewer than k bananas, she eats all remaining bananas in that pile.
// She cannot eat from multiple piles in the same hour.

// Return the minimum integer k such that Koko can eat all the bananas within h hours.

// Example 1
// Input: piles = [3,6,7,11], h = 8
// Output: 4


/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
function minEatingSpeed(piles, h) {

    // Minimum possible speed
    let left = 1;

    // Maximum possible speed
    let right = Math.max(...piles);

    // Binary Search
    while (left < right) {

        // Mid speed
        let mid = Math.floor((left + right) / 2);

        // Calculate total hours needed at speed = mid
        let totalHours = 0;

        for (let pile of piles) {

            // ceil(pile / mid)
            totalHours += Math.ceil(pile / mid);
        }

        // If Koko can finish within h hours,
        // try smaller speed
        if (totalHours <= h) {
            right = mid;
        }
        // Otherwise increase speed
        else {
            left = mid + 1;
        }
    }

    // left == right => minimum valid speed
    return left;
}

minEatingSpeed([3,6,7,11],8)
// output: 4

// 'left, fight, mid, totalHours'
// 1 11 6 6
// 'left, fight, mid, totalHours'
// 1 6 3 10
// 'left, fight, mid, totalHours'
// 4 6 5 8
// 'left, fight, mid, totalHours'
// 4 5 4 8
// 4