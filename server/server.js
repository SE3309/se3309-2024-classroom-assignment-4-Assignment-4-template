const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the MySQL database");
  }
});

// search flights based on departure/arrival airports, option to enter departure/arrival times
app.post("/api/search-flights", (req, res) => {
  const {
    departureAirportCode,
    arrivalAirportCode,
    startDepartureTime,
    endArrivalTime,
  } = req.body;

  const query = `
        SELECT flightID, departureAirport, arrivalAirport, departureTime, arrivalTime, price
        FROM Flight
        WHERE departureAirport = ? AND arrivalAirport = ?
        ${startDepartureTime ? "AND DATE(departureTime) >= DATE(?)" : ""}
        ${endArrivalTime ? "AND DATE(arrivalTime) <= DATE(?)" : ""}
    `;

  const params = [departureAirportCode, arrivalAirportCode];
  if (startDepartureTime) params.push(startDepartureTime);
  if (endArrivalTime) params.push(endArrivalTime);

  db.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching flights");
    }
    res.json(results);
  });
});

// set port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
