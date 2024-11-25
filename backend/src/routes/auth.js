const express = require('express');
const admin = require('../config/firebase');
const pool = require('../config/mysql');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password} = req.body;

  try {
    // Create user in Firebase Authentication
    const user = await admin.auth().createUser({
      email,
      password,
    });

    // Store user UID in MySQL
    const query = `
  INSERT INTO users (uid, email)
  VALUES (?, ?);
`;
await pool.query(query, [user.uid, email]);

    res.status(201).json({ message: 'User created and stored successfully', user });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
