const pool = require('../config/mysql');

exports.createUser = async (uid, email) => {
  const query = 'INSERT INTO users (uid, email) VALUES (?, ?);';
  await pool.query(query, [uid, email]);
};

exports.getUserProfile = async (uid) => {
  const query = 'SELECT name, photo_url FROM users WHERE uid = ?';
  const [rows] = await pool.execute(query, [uid]);
  return rows[0];
};

exports.saveUserProfile = async (uid, name, photoUrl) => {
  const query = `
    INSERT INTO users (uid, name, photo_url)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE name = ?, photo_url = ?;
  `;
  await pool.query(query, [uid, name, photoUrl, name, photoUrl]);
};