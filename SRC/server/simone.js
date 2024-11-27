const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }));

// MySQL Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Rcgme03301!',
    database: 'bratmusic',
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to the MySQL database.");
});


app.get("/api/playlists", (req, res) => {
    const { Description, Creator } = req.query;

    if (!Description && !Creator) {
        return res.status(400).json({ error: "At least one query parameter is required" });
    }

    let query = "SELECT * FROM playlist WHERE";
    const params = [];

    if (Description) {
        query += " Description LIKE ?";
        params.push(`%${Description}%`);
    }

    if (Creator) {
        if (params.length > 0) query += " AND";
        query += " Creator LIKE ?";
        params.push(`%${Creator}%`);
    }

    console.log("Executing Query:", query, "with Params:", params);

    // Execute the query
    db.query(query, params, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Internal Server Error" }); // Ensure response is returned
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No playlists found" }); // Ensure response is returned
        }

        // If we reach here, results exist
        res.status(200).json(results); // Ensure response is returned only once
    });
});


// Endpoint to search for an artist by artistName
app.get("/api/artist", (req, res) => {
    const { artistName } = req.query;

    if (!artistName) {
        return res.status(400).json({ error: "artistName query parameter is required" });
    }

    const query = "SELECT * FROM artist WHERE artistName LIKE ?";
    db.query(query, [`%${artistName}%`], (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No artists found" });
        }

        res.status(200).json(results);
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

