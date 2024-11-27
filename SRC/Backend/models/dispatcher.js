const db = require('../db');

// Create a new dispatcher
const createDispatcher = (data, callback) => {
  const query = `
    INSERT INTO Dispatcher (F_Name, L_Name, Phone_No)
    VALUES (?, ?, ?)
  `;
  db.query(query, data, callback);
};

// Find dispatcher by Phone_No (password)
const findDispatcherByPhoneNo = (phoneNo, callback) => {
  const query = `SELECT * FROM Dispatcher WHERE Phone_No = ?`;
  db.query(query, [phoneNo], callback);
};

module.exports = { createDispatcher, findDispatcherByPhoneNo };
