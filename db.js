require('dotenv').config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DBNAME:', process.env.DB_DBNAME);

const mysql = require('mysql2');
const codeBlocks = require('./extensions/code_blocks');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    port: '3306',
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  
    // Create the table if it doesn't exist
    connection.query(`
      CREATE TABLE IF NOT EXISTS moveo (
        id INT PRIMARY KEY,
        title VARCHAR(255),
        goal TEXT,
        code TEXT,
        answer TEXT
      );
    `, (err, results) => {
      if (err) {
        console.error('Error creating table:', err);
        return;
      }
      console.log('Table created or already exists');
  
      // Iterate over the codeBlocks array and insert data into MySQL
      codeBlocks.forEach((block) => {
        const { id, title, goal, code, answer } = block
        const insertQuery = `INSERT INTO moveo (id, title, goal, code, answer) VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE code = VALUES(code)`;
        connection.query( insertQuery, [id, title, goal, code, answer], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return;
            }
        });
      });
      console.log('Data inserted successfully');
    });
  });

module.exports = connection;
