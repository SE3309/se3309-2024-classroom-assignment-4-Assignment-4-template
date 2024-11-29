const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "videogamerecommender",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL as ID", connection.threadId);
});

const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.post("/register", (req, res) => {
  const { username, password, age } = req.body;
  const registrationDate = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  const countQuery = "SELECT COUNT(*) AS count FROM User";
  connection.query(countQuery, (err, results) => {
    if (err) {
      console.error("Error counting users:", err.stack);
      res.status(500).send(`Error registering user: ${err.message}`);
      return;
    }

    const userId = results[0].count + 1;

    const insertQuery =
      "INSERT INTO User (user_id, username, registration_date, age, password) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      insertQuery,
      [userId, username, registrationDate, age, password],
      (err, results) => {
        if (err) {
          console.error("Error inserting user:", err.stack);
          res.status(500).send(`Error registering user: ${err.message}`);
          return;
        }
        res.status(201).send("User registered successfully");
      }
    );
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM User";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.stack);
      res.status(500).send("Error fetching users");
      return;
    }
    res.status(200).json(results);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/videogame/:id", (req,res) => {
  const {id} = req.params;
  const query = "SELECT * FROM VideoGame WHERE game_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error while fetching the game:", err);
      res.status(500).send("Error while fetching the game");
    } else if (results.length === 0) {
      res.status(404).send("Game not found");
    } else {
      res.status(200).json(results[0]); // Return the first matching result
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
