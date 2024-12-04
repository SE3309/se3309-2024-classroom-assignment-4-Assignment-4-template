const { getAvailableTrucksCount } = require('../models/truck');
const { getAvailableDriversCount } = require('../models/driver');

// Get combined dashboard data
const getDashboardData = (callback) => {
  let data = {};
  getAvailableTrucksCount((err, truckResults) => {
    if (err) return callback(err);

    data.availableTrucks = truckResults[0].availableTrucks;

    getAvailableDriversCount((err, driverResults) => {
      if (err) return callback(err);

      data.availableDrivers = driverResults[0].availableDrivers;

      callback(null, data);
    });
  });
};

module.exports = { getDashboardData };
