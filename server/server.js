const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
require("dotenv").config();
const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// passport setup
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const query = `
      SELECT * FROM User
      WHERE userID = ?;
    `;

    const params = [jwt_payload.userID];

    db.query(query, params, (err, results) => {
      if (err) {
        console.error(err);
        return done(err, false);
      }

      if (results.length === 0) {
        return done(null, false, { message: "User not found" });
      }
      const user = results[0];
      return done(null, user);
    });
  })
);

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

// registration route
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkQuery = `
  SELECT * FROM User
  WHERE email = ?
  `;

  const checkParams = [email];

  db.query(checkQuery, checkParams, async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send(`Error: ${err}`);
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
    INSERT INTO User (name, email, password)
    VALUES (?,?,?);
    `;

    const insertParams = [name, email, hashedPassword];

    db.query(insertQuery, insertParams, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send(`Error: ${err}`);
      }

      return res.status(201).json({ message: "User Registered successfully." });
    });
  });
});

// login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = `
  SELECT * FROM User
  WHERE email = ?
  `;
  const params = [email];

  db.query(query, params, async (err, results) => {
    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "Login unsuccessful: Email not found." });
    }

    const user = results[0];

    const match = await bcrypt.compare(password, user.password);

    // if the password matches, generate and return a token
    if (match) {
      // generate token
      const token = jwt.sign({ userID: user.userID }, process.env.SECRET, {
        expiresIn: "1d",
      });
      return res.status(200).json({ message: "Login successful!", token });
    }

    return res
      .status(400)
      .json({ message: "Login unsuccessful: Incorrect password." });
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

// get airport codes for flight search dropdowns
app.get(
  "/api/airports",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const query = `SELECT DISTINCT airportCode
                FROM Airport`;

    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send(`Error fetching airport codes: ${err}`);
      }
      res.json(results);
    });
  }
);
// search flights based on departure/arrival airports, option to enter departure/arrival times
app.post(
  "/api/search-flights",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// fetch hotels
app.get(
  "/api/hotels",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const query = `SELECT hotelName
                FROM Hotel`;

    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send(`Error fetching hotels: ${err}`);
      }
      res.json(results);
    });
  }
);

// hotel booking
app.post(
  "/api/book-hotel",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { hotelName, roomType, checkInDate, checkOutDate } = req.body;
    const { userID } = req.user;

    const availabilityQuery = `
    SELECT hr.hotelID, hr.availabilityStatus, hr.pricePerNight 
    FROM HotelRoom hr
    JOIN Hotel h ON hr.hotelID = h.hotelID
    WHERE h.hotelName = ? AND hr.roomType = ?;
  `;

    const availabilityParams = [hotelName, roomType];

    db.beginTransaction((transactionErr) => {
      if (transactionErr) {
        console.error(transactionErr);
        return res
          .status(500)
          .send(`Error starting transaction: ${transactionErr}`);
      }

      // get hotel availability
      db.query(availabilityQuery, availabilityParams, (err, results) => {
        if (err) {
          db.rollback(() => {
            console.error(err);
            return res
              .status(500)
              .send(`Error getting hotel availability: ${err}`);
          });
        }

        const { hotelID, availabilityStatus, pricePerNight } = results[0];

        if (!availabilityStatus) {
          return db.rollback(() => {
            res.status(400).json({
              message: `Sorry, the ${roomType} room at ${hotelName} is not available.`,
            });
          });
        }

        // calculate total cost for booking
        const nights = Math.ceil(
          (new Date(checkOutDate) - new Date(checkInDate)) /
            (1000 * 60 * 60 * 24)
        );
        const cost = pricePerNight * nights;

        const bookingQuery = `
        INSERT INTO Booking (userID, cost, bookingStatus, bookingDate) 
        VALUES (?, ?, 'confirmed', CURDATE());
      `;

        const bookingParams = [userID, cost];

        // insert booking into db
        db.query(bookingQuery, bookingParams, (err, bookingResults) => {
          if (err) {
            return db.rollback(() => {
              console.error(err);
              res.status(500).send(`Error creating booking: ${err}`);
            });
          }

          const bookingID = bookingResults.insertId;

          const hotelBookingQuery = `
            INSERT INTO HotelBooking (hotelID, bookingID, checkInDate, checkOutDate, roomType) 
            VALUES (?, ?, ?, ?, ?);
          `;

          const hotelBookingParams = [
            hotelID,
            bookingID,
            checkInDate,
            checkOutDate,
            roomType,
          ];

          db.query(hotelBookingQuery, hotelBookingParams, (err) => {
            if (err) {
              return db.rollback(() => {
                console.error(err);
                res.status(500).send(`Error linking booking to hotel: ${err}`);
              });
            }

            // Commit transaction
            db.commit((commitErr) => {
              if (commitErr) {
                return db.rollback(() => {
                  console.error(commitErr);
                  res
                    .status(500)
                    .send(`Error committing transaction: ${commitErr}`);
                });
              }

              res.status(200).json({
                message: `Successfully booked the ${roomType} room at ${hotelName}.`,
                bookingID,
                cost,
              });
            });
          });
        });
      });
    });
  }
);

// get bookings for a user
app.get(
  "/api/bookings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { userID } = req.user;

    const query = `
    SELECT b.bookingID, cost, bookingStatus, b.bookingDate, h.hotelName, 
    h.city, hb.checkInDate, hb.checkOutDate, hb.roomType 
    FROM Booking b, HotelBooking hb, Hotel h
    WHERE b.bookingID = hb.bookingID
    AND hb.hotelID = h.hotelID
    AND b.userID = ? 
    ORDER BY b.bookingID DESC
    `;
    const params = [userID];

    db.query(query, params, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send(`Error fetching bookings: ${err}`);
      }
      res.json(results);
    });
  }
);

// set port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
