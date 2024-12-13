const pool = require('../config/mysql');

exports.createUser = async (uid, email) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const query = 'INSERT INTO users (uid, email) VALUES (?, ?)';
    await connection.query(query, [uid, email]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.getUserProfile = async (uid) => {
  const query = 'SELECT name, photo_url FROM users WHERE uid = ?';
  const [rows] = await pool.execute(query, [uid]);
  return rows[0];
};

exports.saveUserProfile = async (uid, name, photoUrl) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const query = `
      UPDATE users
      SET name = ?, photo_url = ?
      WHERE uid = ?;
    `;
    await connection.query(query, [name, photoUrl, uid]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};