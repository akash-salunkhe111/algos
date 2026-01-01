function countVowels(str) {
    let count = 0;
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
  
    for (let ch of str) {
      if (vowels.has(ch)) count++;
    }
  
    return count;
  }
  
  console.log(countVowels("hello world")); // 3