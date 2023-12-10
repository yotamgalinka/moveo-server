// const mysql = require('mysql2');
// const codeBlocks = require('./extensions/code_blocks');
// require('dotenv').config();

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: process.env.DB_PASSWORD,
//     database: "moveo",
//     port: '3306',
//     protocol: 'tcp'
// });

// connection.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//     console.log('Connected to MySQL database');
  
//     // Create the table if it doesn't exist
//     connection.query(`
//       CREATE TABLE IF NOT EXISTS moveo (
//         id INT PRIMARY KEY,
//         title VARCHAR(255),
//         goal TEXT,
//         code TEXT,
//         answer TEXT
//       );
//     `, (err, results) => {
//       if (err) {
//         console.error('Error creating table:', err);
//         return;
//       }
//       console.log('Table created or already exists');
  
//       // Iterate over the codeBLocksData array and insert data into MySQL
//       codeBlocks.forEach((block) => {
//         const { id, title, goal, code, answer } = block
//         const insertQuery = 'INSERT IGNORE INTO moveo (id, title, goal, code, answer) VALUES (?, ?, ?, ?, ?)'
//         connection.query( insertQuery, [id, title, goal, code, answer], (err, results) => {
//             if (err) {
//                 console.error('Error inserting data:', err);
//                 return;
//             }
//         });
//       });
//       console.log('Data inserted successfully');
//     });
//   });

// module.exports = connection;


const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
  id: {
    type: "INT",
    required: true,
  },
  title: {
    type: "string",
    required: true,
  },
  goal: {
    type: "string",
    required: true,
  },
  code: {
    type: "string",
    required: true,
  },
  answer: {
    type: "string",
    required: true,
  },
});

module.exports = mongoose.model("CodeBlock", blockSchema);

