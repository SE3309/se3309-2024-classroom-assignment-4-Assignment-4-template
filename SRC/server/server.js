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

app.post('/register', async (req, res) => {
  const { UserID, DisplayName, Password, SubscriptionType } = req.body;

  // Input validation
  if (!UserID || !DisplayName || !Password || !SubscriptionType) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert into the database
    const query = `INSERT INTO users (UserID, DisplayName, Password, SubscriptionType)
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [UserID, DisplayName, hashedPassword, SubscriptionType], (err, result) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database error.' });
      }
      res.status(201).json({ message: 'Account registered successfully.' });
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Server error.' });
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
