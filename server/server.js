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


// booking history fetch
app.get(`/api/booking-history`, passport.authenticate("jwt", { session: false }), (req, res) => {
  const { userID } = req.user;
  const sql = "SELECT b.cost, b.bookingID, b.bookingStatus, b.bookingDate, f.flightID, f.departureAirport, f.arrivalAirport, a.name, h.hotelID, h.hotelName, p.amount AS paymentAmount "+
              "FROM Booking b "+
              "LEFT JOIN FlightBooking fb "+
              "ON b.bookingID = fb.bookingID "+
              "LEFT JOIN Flight f "+
              "ON fb.flightID = f.flightID "+
              "LEFT JOIN HotelBooking hb "+
              "ON b.bookingID = hb.bookingID "+
              "LEFT JOIN Hotel h "+
              "ON hb.hotelID = h.hotelID "+
              "LEFT JOIN Airline a "+
              "ON f.airlineID = a.airlineID "+
              "LEFT JOIN Payment p "+
              "ON b.bookingID = p.bookingID WHERE b.userID = ?";
  db.query(sql, [userID], (error, results) => {
    if (error) return res.status(500).json({message: "Database error retrieving booking history."});
    res.status(200).json(results)
  })

})

// Update points
app.put('/api/points', passport.authenticate("jwt", { session: false }), (req, res) => {
  const { userID } = req.user;
  const { points } = req.body;
  
  if (isNaN(points)) return res.status(400).json({message: "Points must be a number."});

  const sql = "UPDATE User SET points = points + ? WHERE userID = ?";

  db.query(sql, [points, userID], err => {
    if (err) return res.status(500).json({message: "Database error updating points."})

    res.status(200).json({message: "Points updated successfully.", success: true});
  })
} )

// get points
app.get('/api/points', passport.authenticate("jwt", {session: false}), (req, res) => {
  const { userID } = req.user;
  const sql = "SELECT points FROM User WHERE userID = ?";
  db.query(sql, [userID], (err, result) => {
    if (err) return res.status(500).json({message: "Database error fetching user points."});
    res.status(200).json(result)
  })
})

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
app.post("/api/add-review",passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
    const { airlineName, hotelName, rating, reviewComment } = req.body;
    const { userID } = req.user;

    // Validate required fields
    if (!userID || !rating || !reviewComment) {
      return res
        .status(400)
        .json({ error: "userID, rating, and reviewComment are required" });
    }

    //ensure at least one
    if (!airlineName && !hotelName) {
      return res
        .status(400)
        .json({ error: "Enter either an Airline Name or Hotel Name" });
    }

    //ensure only one
    if (airlineName && hotelName) {
      return res
        .status(400)
        .json({ error: "Only one of airline or hotel can be chosen" });
    }

    
      let airlineID = null;
      let hotelID = null;

      // Fetch airlineID if airlineName is provided
      if (airlineName) {
        const airlineQuery = "SELECT airlineID FROM Airline WHERE name = ?";
        const [airlineResults] = await db.promise().query(airlineQuery, [
          airlineName,
        ]);
        if (airlineResults.length === 0) {
          return res.status(404).json({ error: "Airline not found" });
        }
        airlineID = airlineResults[0].airlineID;
      } 
      
      if (hotelName) {
        const hotelQuery = "SELECT hotelID FROM Hotel WHERE hotelName = ?";
        const [hotelResults] = await db.promise().query(hotelQuery, [
          hotelName,
        ]);
        if (hotelResults.length === 0) {
          return res.status(404).json({ error: "Hotel not found" });
        }
        hotelID = hotelResults[0].hotelID;
      }

      if (!hotelID && !airlineID){
        return res.status(40).json({ error: "Both hotelID & airlineID returned null" });
      }
      if (!hotelID && !airlineID){
        return res.status(400).json({ error: "Both hotelID & airlineID returned values" });
      }

      // Insert the review
      const insertQuery = `
        INSERT INTO Review (userID, airlineID, hotelID, rating, reviewComment, dateCreated)
        VALUES (?, ?, ?, ?, ?, CAST(NOW() AS DATE))
      `;
      const insertParams = [
        userID,
        airlineID,
        hotelID,
        rating,
        reviewComment,
      ];

      const [insertResults] = await db.promise().query(insertQuery, insertParams);

      res.status(201).json({
        message: "Review added successfully",
        reviewID: insertResults.insertId,
      });
    } catch (err) {
      console.error("Error adding review:", err.message);
      res.status(500).json({ error: "Error adding review", details: err.message });
    }
  }
);


//to view reviews
app.get("/api/reviews", passport.authenticate("jwt", { session: false }), (req, res) => {
    const { userID } = req.user;

    const query = `
      SELECT 
        r.reviewID, 
        r.rating, 
        r.reviewComment, 
        r.dateCreated, 
        a.name AS airlineName, 
        h.hotelName
      FROM Review r
      LEFT JOIN Airline a ON r.airlineID = a.airlineID
      LEFT JOIN Hotel h ON r.hotelID = h.hotelID
      WHERE r.userID = ?
      ORDER BY r.dateCreated DESC;
    `;

    db.query(query, [userID], (err, results) => {
      if (err) {
        console.error("Error fetching user reviews:", err);
        return res.status(500).json({ message: "Error fetching user reviews." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "No reviews found for this user." });
      }

      res.status(200).json(results);
    });
  });


//Functionality to view the average rating for a hotel or airline
app.post("/api/view-rating", async (req, res) => {
  const { airlineName, hotelName } = req.body;

   //ensure at least one
   if (!airlineName && !hotelName) {
    return res
      .status(400)
      .json({ error: "Enter either an Airline Name or Hotel Name" });
  }

  //ensure only one
  if (airlineName && hotelName) {
    return res
      .status(400)
      .json({ error: "Only one of airline or hotel can be chosen" });
  }

  try {
    let airlineID = null;
    let hotelID = null;

    // Fetch airlineID if airlineName is provided
    if (airlineName) {
      const airlineQuery = "SELECT airlineID FROM Airline WHERE name = ?";
      const [airlineResults] = await db.promise().query(airlineQuery, [
        airlineName,
      ]);
      if (airlineResults.length === 0) {
        return res.status(404).json({ error: "Airline not found" });
      }
      airlineID = airlineResults[0].airlineID;
    } 
    
    if (hotelName) {
      const hotelQuery = "SELECT hotelID FROM Hotel WHERE hotelName = ?";
      const [hotelResults] = await db.promise().query(hotelQuery, [
        hotelName,
      ]);
      if (hotelResults.length === 0) {
        return res.status(404).json({ error: "Hotel not found" });
      }
      hotelID = hotelResults[0].hotelID;
    }

    if (!hotelID && !airlineID){
      return res.status(40).json({ error: "Both hotelID & airlineID returned null" });
    }
    if (!hotelID && !airlineID){
      return res.status(400).json({ error: "Both hotelID & airlineID returned values" });
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
      return res
        .status(404)
        .json({ error: "No reviews found for the given ID" });
    }

    res.status(200).json({ averageRating: results[0].averageRating });
  });

} catch (err) {
  console.error("Error getting average:", err.message);
  res.status(500).json({ error: "Error getting average", details: err.message });
}
});

// get airport codes for flight search dropdowns
app.get("/api/airports",
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
    const query = `SELECT DISTINCT hotelName
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
// fetch airlines
app.get(
  "/api/airlines",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const query = `SELECT DISTINCT name
                FROM airline`;

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
//cancel bookings for a user
app.post(
  "/api/cancel-booking",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { bookingID } = req.body;
    const { userID } = req.user;

    if (!bookingID) {
      return res
        .status(400)
        .json({ success: false, message: "Booking ID is required" });
    }

    const checkBookingQuery = `
      SELECT * FROM Booking
      WHERE bookingID = ? AND userID = ?;
    `;

    db.query(checkBookingQuery, [bookingID, userID], (err, results) => {
      if (err) {
        console.error("Error finding booking:", err);
        return res
          .status(500)
          .json({ success: false, message: "Error finding booking" });
      }

      if (results.length === 0) {
        return res.status(403).json({
          success: false,
          message:
            "Booking not found or you are not authorized to cancel this booking",
        });
      }

      const cancelBookingQuery = `
        UPDATE Booking
        SET bookingStatus = 'canceled'
        WHERE bookingID = ?;
      `;

      db.query(cancelBookingQuery, [bookingID], (err, results) => {
        if (err) {
          console.error("Error canceling booking:", err);
          return res.status(500).json({
            success: false,
            message: "Error canceling booking.",
          });
        }

        res.status(200).json({
          success: true,
          message: "Your booking was successfully canceled!",
        });
      });
    });
  }
);

//Check Available Flights For User
app.post(
  "/api/check-available-flights",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { airline, startDate, endDate } = req.body;

    if (!airline || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = `
      SELECT 
        f.flightID, 
        al.name AS airlineName, 
        f.departureTime, 
        f.arrivalTime, 
        f.price
      FROM Flight f
      JOIN Airline al ON f.airlineID = al.airlineID
      WHERE al.name = ? 
        AND DATE(f.departureTime) >= DATE(?) 
        AND DATE(f.arrivalTime) <= DATE(?)
      ORDER BY ABS(TIMESTAMPDIFF(SECOND, DATE(f.departureTime), DATE(?)));
    `;

    const params = [airline, startDate, endDate, startDate];

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Error fetching flights:", err);
        return res.status(500).json({ error: "Error fetching flights" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "No flights available for the selected dates." });
      }

      res.status(200).json(results);
    });
  }
);

// route to fetch airline names
app.get(
  "/api/airlines",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const query = `
      SELECT DISTINCT name 
      FROM Airline;
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching airlines:", err);
        return res.status(500).json({ error: "Error fetching airlines" });
      }

      res.status(200).json(results);
    });
  }
);

// set port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
