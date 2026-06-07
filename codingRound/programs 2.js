const obj = {
    user: {
      name: "ABCD",
      address: {
        city: "Jaipur",
        pin: 302012
      }
    },
    skills: ["JS", "Node"]
  };


  


//   {
//     "user.name": "ABCD",
//     "user.address.city": "Jaipur",
//     "user.address.pin": 302012,
//     "skills.0": "JS",
//     "skills.1": "Node"
//   }




const employees = [
  { name: "Yumin", role: "DevLead", Joined: "2021" },
  { name: "Shihang", role: "DevLead", Joined: "2020" },
  { name: "Dilip", role: "Senior Software Engineer", Joined: "2021" },
  { name: "Priya", role: "QA Engineer", Joined: "2022" },
  { name: "Rahul", role: "UI/UX Designer", Joined: "2020" }
];
 

// Expected output:
 
// [
//   {
//     Joined: "2021",
//     child: [
//       { name: "Yumin", role: "DevLead", Joined: "2021" },
//       { name: "Dilip", role: "Senior Software Engineer", Joined: "2021" }
//     ]
//   },
//   {
//     Joined: "2020",
//     child: [
//       { name: "Shihang", role: "DevLead", Joined: "2020" },
//       { name: "Rahul", role: "UI/UX Designer", Joined: "2020" }
//     ]
//   },
//   {
//     Joined: "2022",
//     child: [
//       { name: "Priya", role: "QA Engineer", Joined: "2022" }
//     ]
//   }
// ]

const result = employees.reduce((acc, emp) => {
  const yearJoined = emp.Joined;
  if(acc[yearJoined]) {
    acc[yearJoined].child.push(emp);
  } else {
    acc[yearJoined] = {}
    acc[yearJoined].Joined = yearJoined;
    acc[yearJoined].child = []
    acc[yearJoined].child.push(emp);
  }
  return acc ; // remember to return the accumulator
}, {})

const processedResult = Object.values(result) // remember to convert the object to array

console.log(processedResult);









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
    return a.name.localeCompare(b.name);   
    // Note spelling of localeCompare, it has e in it
  });



  // Simple test case
  const add = require('./add');

describe('add function', () => {
  test('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('should add negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test('should add positive and negative numbers', () => {
    expect(add(5, -2)).toBe(3);
  });

  test('should add zeros', () => {
    expect(add(0, 0)).toBe(0);
  });
});