// Import the mysql2 package
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '', // e.g., 'localhost' or your EC2 public IP address
  user: '', // e.g., 'root'
  password: '',
  database: '', // e.g., 'mydatabase'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as id ' + connection.threadId);
});


/*
const createTableQuery = `
SELECT * FROM List;
`;

// Example query
connection.query(createTableQuery, (err, results, fields) => {
  if (err) {
    console.error('Query error: ', err);
    return;
  }
  console.log('Results: ', results);
});*/

// Close the connection
connection.end();
