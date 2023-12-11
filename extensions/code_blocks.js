const codeBLocksData = [
	{
		id: 1,
		title: 'Async Case',
		goal: 'Write an asynchronous function that retrieves the result of a promise and then prints it.',
		code: 
`function f() {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => resolve("done!"), 1000);
  	});
  	let result = 0; // fix this line and catch the promise result here
  	// Print the result
}`,
		answer: `async function f() {

			let promise = new Promise((resolve, reject) => {
			  setTimeout(() => resolve("done!"), 1000)
			});
		  
			let result = await promise; 
			console.log(result);
		  }
		  `
	},	  
	{
		id: 2,
		title: 'Arrays and loops',
		goal: `You have an array of objects representing books with relevant properties.
		Write a function that prints out the titles of all books published after the year 1997.`,
		code: 
`const books = [
	{ title: "Book1", author: "Author1", year: 2000 },
	{ title: "Book2", author: "Author2", year: 2015 },
	{ title: "Book3", author: "Author3", year: 1995 }
];
		  
function printBooksAfterYear(bookArray, targetYear) {
	// Iterate over the books array and print only the books that satisfy the condition
}
		  
// Call the function`,
		answer: `function printBooksAfterYear(bookArray, targetYear) {
			for (let i = 0; i < bookArray.length; i++) {
			  if (bookArray[i].year > targetYear) {
				console.log(bookArray[i].title);
			  }
			}
		  }
		  
		  printBooksAfterYear(books, 1997);`
	},
	{
		id: 3,
		title: 'Strings',
		goal: `Write a function that reverses a string and returns the result.`,
		code: 
`reverseString() {  // Fix the function declaration
	let reversedString = "";
		  
	// Iterate over the string and save the reversed version in reversedString
		  
	return reversedString;
}
		  
const originalString = "hello";
// Invoke the function and print the reversed string`,
		answer: `function reverseString(inputString) {
		let reversedString = "";
	  
		for (let i = inputString.length - 1; i >= 0; i--) {
		  reversedString += inputString[i];
		}
	  
		return reversedString;
	  }
	  
	  const originalString = "hello";
	  console.log(reverseString(originalString));`
	},
	{
		id: 4,
		title: 'Objects',
		goal: `Create an object representing a student with properties such as name, age, and grade. 
		Write a function that prints out the student's information.`,
		code: 
`const student = {};

function printStudentInfo(student) {
	console.log();
}

printStudentInfo(student); // Output: Name: Alice, Age: 20, Grade: A`,
		answer: `const student = {
			name: "Alice",
			age: 20,
			grade: "A"
		  };
		  
		  function printStudentInfo(student) {
			console.log("Name: ", student.name, "Age: ", student.age, "Grade: ", student.grade);
		  }`
	},
];

module.exports = codeBLocksData;