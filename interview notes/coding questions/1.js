// Sorting JSON string by marks descending, then by name ascending 

const students = [
    { name: "Rahul", marks: 85 },
    { name: "Aditi", marks: 92 },
    { name: "Karan", marks: 92 },
    { name: "Bella", marks: 85 },
  ];

  students.sort((a, b) => {
    // 1. Sort by marks (descending)
    if (b.marks !== a.marks) {
      return b.marks - a.marks;
    }
  
    // 2. Sort by name (ascending)
    return a.name.localeCompare(b.name);   // Note spelling of localeCompare, it has e in it
  });