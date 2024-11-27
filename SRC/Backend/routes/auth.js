const express = require('express');
const { register, login } = require('../controllers/auth-controller');

const router = express.Router();

// Register a new dispatcher
router.post('/register', register);

// Login dispatcher
router.post('/login', login);

module.exports = router;
