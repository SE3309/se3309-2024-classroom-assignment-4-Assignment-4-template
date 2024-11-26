console.log("Starting the server...");

const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yourpassword',
  database: 'yourdatabase'
});

// Check database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit if the database connection fails
  } else {
    console.log('Database connected successfully!');
  }
});

// Start server on port 3001
try {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
} catch (error) {
  console.error('Failed to start server:', error);
}
