const express = require('express');
const { fetchAllDrivers } = require('../controllers/drivers-controller');

const router = express.Router();

// Route to get all drivers
router.get('/drivers', fetchAllDrivers);

module.exports = router;

