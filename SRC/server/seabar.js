// Import required modules
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken'); // JWT for token generation

// Create an Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// JWT secret key
const JWT_SECRET = 'your-secret-key'; // Replace with a strong secret key

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Omar824?',
  database: 'BRATmusic',
  port: '3306'
});

// Check database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  } else {
    console.log('Database connected successfully!');
  }
});

// Generate and log a JWT token at startup
const sampleUser = {
  UserID: 'aaliyah@bratmusic.com',
  DisplayName: 'Aaliyah'
};
const token = jwt.sign(sampleUser, JWT_SECRET); // Generate token
console.log('Sample JWT Token:', token); // Log token to terminal

// Login API with JWT
// Login API using GET (not recommended)
app.get('/login', (req, res) => {
    const { UserID, Password } = req.query; // Use query parameters for GET requests
  
    // Input validation
    if (!UserID || !Password) {
      return res.status(400).json({ error: 'UserID and Password are required.' });
    }
  
    // Query to find user by UserID
    const query = `SELECT * FROM user WHERE UserID = ?`;
    db.query(query, [UserID], (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ error: 'Database error.' });
      }
  
      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid UserID or Password.' });
      }
  
      const user = results[0];
  
      // Directly compare the passwords
      if (Password !== user.Password) {
        return res.status(401).json({ error: 'Invalid UserID or Password.' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { UserID: user.UserID, DisplayName: user.DisplayName },
        JWT_SECRET
      );
  
      // Log the token in the terminal
      console.log('Generated JWT Token:', token);
  
      // Send the token back to the client
      res.status(200).json({
        message: 'Login successful.',
        token: token,
        user: { UserID: user.UserID, DisplayName: user.DisplayName }
      });
    });
  });
  

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
