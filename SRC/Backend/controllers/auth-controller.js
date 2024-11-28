const { createDispatcher, findDispatcherByPhoneNo } = require('../models/dispatcher');

// Register a new dispatcher
const register = (req, res) => {
  const { firstName, lastName, phoneNo } = req.body;

  createDispatcher([firstName, lastName, phoneNo], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Phone number already exists.' });
      }
      return res.status(500).json({ message: 'Internal server error.', error: err });
    }
    res.status(201).json({ message: 'Dispatcher account created successfully.' });
  });
};


// Login dispatcher
const login = (req, res) => {
  const { phoneNo } = req.body;

  findDispatcherByPhoneNo(phoneNo, (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).send('Invalid phone number.');
    }

    // Return dispatcher details
    const dispatcher = {
      firstName: result[0].F_Name,
      lastName: result[0].L_Name,
      phoneNo: result[0].Phone_No
    };

    res.status(200).json(dispatcher);
  });
};

module.exports = { register, login };
