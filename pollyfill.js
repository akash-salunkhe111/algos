// MAP
Array.prototype.myMap = function(callback) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
    // map callback takes 3 params, value, index and entire array
      res.push(callback(this[i], i, this));
    }
    return res;
  };
  
  // FILTER
  Array.prototype.myFilter = function(callback) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) res.push(this[i]);
    }
    return res;
  };
  
  // REDUCE
  Array.prototype.myReduce = function(callback, initialValue) {
    let acc = initialValue !== undefined ? initialValue : this[0];
    let start = initialValue !== undefined ? 0 : 1;
  
    for (let i = start; i < this.length; i++) {
      acc = callback(acc, this[i], i, this);
    }
    return acc;
  };


//   const arr = [1, 2, 3];

// console.log(arr.myMap(x => x * 2));        // [2, 4, 6]
// console.log(arr.myFilter(x => x > 1));     // [2, 3]
// console.log(arr.myReduce((a, b) => a + b)); // 6
