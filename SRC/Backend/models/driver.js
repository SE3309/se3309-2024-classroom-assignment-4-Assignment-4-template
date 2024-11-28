const db = require('../db');

// Get count of available drivers
const getAvailableDriversCount = (callback) => {
  const query = `SELECT COUNT(*) AS availableDrivers FROM Drivers WHERE Availability = 1`;
  db.query(query, [], callback);
};

module.exports = { getAvailableDriversCount };
