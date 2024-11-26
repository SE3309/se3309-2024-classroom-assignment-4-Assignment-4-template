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

// get airport codes for flight search dropdowns
app.get("/api/airports", (req, res) => {
  const query = `SELECT DISTINCT airportCode
                FROM Airport`;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`Error fetching airport codes: ${err}`);
    }
    res.json(results);
  });
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
  SELECT 
    f.flightID, 
    f.departureTime, 
    f.arrivalTime, 
    f.price,
    f.departureAirport,
    a1.airportName AS departureAirportName,
    f.arrivalAirport, 
    a2.airportName AS arrivalAirportName, 
    al.name AS airlineName
    FROM Flight f
    JOIN Airport a1 ON f.departureAirport = a1.airportCode
    JOIN Airport a2 ON f.arrivalAirport = a2.airportCode
    JOIN Airline al ON f.airlineID = al.airlineID
    WHERE f.departureAirport = ? AND f.arrivalAirport = ?
    ${startDepartureTime ? "AND DATE(f.departureTime) >= DATE(?)" : ""}
    ${endArrivalTime ? "AND DATE(f.arrivalTime) <= DATE(?)" : ""}
    `;

  const params = [departureAirportCode, arrivalAirportCode];
  if (startDepartureTime) params.push(startDepartureTime);
  if (endArrivalTime) params.push(endArrivalTime);

  db.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`Error fetching flights: ${err}`);
    }
    res.json(results);
  });
});

// set port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
