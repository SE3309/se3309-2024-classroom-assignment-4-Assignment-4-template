const { getAllDrivers } = require('../models/driver');

// Controller to fetch all drivers
const fetchAllDrivers = (req, res) => {
  getAllDrivers((err, results) => {
    if (err) {
      console.error('Error fetching drivers:', err);
      return res.status(500).json({ error: 'Failed to fetch drivers' });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  fetchAllDrivers,
};
