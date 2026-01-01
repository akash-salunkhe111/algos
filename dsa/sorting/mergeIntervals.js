var merge = function(intervals) {
    const sortedIntervals = intervals.sort((a,b) => a[0] - b[0]);

    let currInterval = sortedIntervals[0];
    const output = [currInterval];

    for (let i = 1; i < sortedIntervals.length; i++) {
        const nextInterval = sortedIntervals[i];

        if (currInterval[1] >= nextInterval[0]) {
            // merge intervals, currentIterval is already pushed on line 4 so no need to push again
            currInterval[1] = Math.max(currInterval[1], nextInterval[1]);
        } else {
            output.push(nextInterval);
        }        
    }

    return output;
};



console.log(merge([[1,3],[2,6],[8,10],[15,18]]));


// Copy
// first sort the array based on first element
// then store the first element in op
// create currInterval and point it to first element as we will need it for next time to mutate same var