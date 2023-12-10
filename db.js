// const mysql = require('mysql2');
// const codeBlocks = require('./extensions/code_blocks');
// require('dotenv').config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DBNAME,
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


const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const codeBlocks = require('./extensions/code_blocks');
// require('dotenv').config();

const dbPath = path.join(__dirname, 'moveo.db'); 

const db = new sqlite3.Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS moveo (
    id INTEGER PRIMARY KEY,
    title TEXT,
    goal TEXT,
    code TEXT,
    answer TEXT
  );
`, (err) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Table created or already exists');

  // Iterate over the codeBlocksData array and insert data into SQLite
  const insertStatement = db.prepare('INSERT OR IGNORE INTO moveo (id, title, goal, code, answer) VALUES (?, ?, ?, ?, ?)');
  codeBlocks.forEach((block) => {
    const { id, title, goal, code, answer } = block;
    insertStatement.run(id, title, goal, code, answer);
  });

  insertStatement.finalize(); // Finalize the statement to close it

  console.log('Data inserted successfully');
});

module.exports = db;
