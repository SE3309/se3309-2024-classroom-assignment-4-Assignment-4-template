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


//functionality to add a review
app.post("/api/add-review", (req, res) => {
  const { userID, airlineID, hotelID, rating, reviewComment } = req.body;

  if (!userID || !rating || !reviewComment) {
    return res.status(400).json({ error: "userID, rating, and reviewComment are required" });
  }

  if (!airlineID && !hotelID) {
    return res.status(400).json({ error: "At least one of airlineID and hotelID are required" });
  }

  if (airlineID && hotelID) {
    return res.status(400).json({ error: "Only one of airline or hotel can be chosen" });
  }


  const query = `
    INSERT INTO Review (userID, airlineID, hotelID, rating, reviewComment, dateCreated)
    VALUES (?, ?, ?, ?, ?, CAST(NOW() AS DATE))
  `;

  const params = [userID, airlineID || null, hotelID || null, rating, reviewComment,];


  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error adding review" , details: err.message});
    }
    res.status(201).json({ message: "Review added successfully", reviewID: results.insertId });
  });
});

//Functionality to view the average rating for a hotel or airline
app.post("/api/view-rating", (req, res) => {
  const { airlineID, hotelID } = req.body;

  if (!airlineID && !hotelID) {
    return res.status(400).json({ error: "Provide either an airlineID or hotelID" });
  }

  if (airlineID && hotelID) {
    return res.status(400).json({ error: "Provide just 1 of an airlineID or hotelID" });
  }

  const query = `
    SELECT AVG(rating) AS averageRating
    FROM Review
    WHERE ${airlineID ? "airlineID = ?" : "hotelID = ?"}
  `;

  const param = airlineID || hotelID;

  db.query(query, [param], (err, results) => {
    if (err) {
      console.error("Error fetching average rating:", err);
      return res.status(500).json({ error: "Error fetching average rating" });
    }

    if (results.length === 0 || results[0].averageRating === null) {
      return res.status(404).json({ error: "No reviews found for the given ID" });
    }

    res.status(200).json({ averageRating: results[0].averageRating });
  });
});



// set port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
