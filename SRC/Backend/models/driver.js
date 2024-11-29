const db = require('../db');

// Get count of available drivers
const getAvailableDriversCount = (callback) => {
  const query = `SELECT COUNT(*) AS availableDrivers FROM Drivers WHERE Availability = 1`;
  db.query(query, [], callback);
};

// Get all drivers
const getAllDrivers = (callback) => {
  const query = 'SELECT * FROM Drivers';
  db.query(query, callback);
};

// Export both 'getAvailableDriversCount' and 'getAllDrivers' functions
module.exports = {
  getAvailableDriversCount,
  getAllDrivers,
};
