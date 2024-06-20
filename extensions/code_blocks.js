const codeBlocksData = [
    {
        id: 1,
        title: 'Async Case',
        goal: 'Write an asynchronous function that waits for a promise to resolve and then prints the result.',
        code: 
`async function asyncFunction() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });
  
  // Await the promise and print the result
}

asyncFunction();`,
        answer: 
`async function asyncFunction() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise;
  console.log(result); // "done!"
}

asyncFunction();`
    },
    {
        id: 2,
        title: 'Arrays and loops',
        goal: `Write a function that iterates over an array of books and prints out the titles of books published after the year 1997.`,
        code: 
`const books = [
  { title: "Book1", author: "Author1", year: 2000 },
  { title: "Book2", author: "Author2", year: 2015 },
  { title: "Book3", author: "Author3", year: 1995 }
];

function printBooksAfterYear(books, year) {
  // Iterate over the books and print titles of books published after the given year
}

printBooksAfterYear(books, 1997);`,
        answer: 
`const books = [
  { title: "Book1", author: "Author1", year: 2000 },
  { title: "Book2", author: "Author2", year: 2015 },
  { title: "Book3", author: "Author3", year: 1995 }
];

function printBooksAfterYear(books, year) {
  for (let book of books) {
    if (book.year > year) {
      console.log(book.title);
    }
  }
}

printBooksAfterYear(books, 1997);`
    },
    {
        id: 3,
        title: 'Strings',
        goal: `Write a function that reverses a given string.`,
        code: 
`function reverseString(str) {
  // Reverse the string and return it
}

console.log(reverseString("hello")); // "olleh"`,
        answer: 
`function reverseString(str) {
  return str.split('').reverse().join('');
}

console.log(reverseString("hello")); // "olleh"`
    },
    {
        id: 4,
        title: 'Objects',
        goal: `Create an object representing a student and write a function that prints out the student's information.`,
        code: 
`const student = {
  name: "Alice",
  age: 20,
  grade: "A"
};

function printStudentInfo(student) {
  // Print the student's information
}

printStudentInfo(student);`,
        answer: 
`const student = {
  name: "Alice",
  age: 20,
  grade: "A"
};

function printStudentInfo(student) {
  console.log("Name:", student.name);
  console.log("Age:", student.age);
  console.log("Grade:", student.grade);
}

printStudentInfo(student);`
    }
];

module.exports = codeBlocksData;
