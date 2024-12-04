const db = require('../db');

// Get count of available trucks
const getAvailableTrucksCount = (callback) => {
  const query = `SELECT COUNT(*) AS availableTrucks FROM Trucks WHERE Availability = 1`;
  db.query(query, [], callback);
};

module.exports = { getAvailableTrucksCount };
