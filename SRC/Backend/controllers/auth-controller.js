const { createDispatcher, findDispatcherByPhoneNo } = require('../models/dispatcher');

// Register a new dispatcher
const register = (req, res) => {
  const { firstName, lastName, phoneNo } = req.body;

  createDispatcher([firstName, lastName, phoneNo], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send('Phone number already exists.');
      }
      return res.status(500).send(err);
    }
    res.status(201).send('Dispatcher account created successfully.');
  });
};

// Login dispatcher
const login = (req, res) => {
  const { phoneNo } = req.body;

  findDispatcherByPhoneNo(phoneNo, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Dispatcher not found.');

    const dispatcher = results[0];
    res.status(200).json({
      message: 'Login successful.',
      dispatcher: {
        id: dispatcher.Dispatcher_ID,
        name: `${dispatcher.F_Name} ${dispatcher.L_Name}`
      }
    });
  });
};

module.exports = { register, login };
