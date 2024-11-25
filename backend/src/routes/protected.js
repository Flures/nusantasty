const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const pool = require('../config/mysql');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.get('/profile', verifyToken, (req, res) => {
  res.status(201).json({
    message: 'Welcome to the protected profile route!',
    user: req.user, // Contains user info
  });
});

router.post('/save-profile', verifyToken, upload.single('photo'), async (req, res) => {
  const {uid, name} = req.body;
  let photoUrl = req.body.photoUrl;

  try {
    // Handle photo upload if a new file is provided
    if (req.file) {
      const blob = bucket.file(`users/${uid}/${req.file.originalname}`);
      const blobStream = blob.createWriteStream();

      blobStream.on('error', (err) => {
        console.error('Error uploading file:', err);
        res.status(500).send({ error: 'Failed to upload photo' });
      });

      await new Promise((resolve, reject) => {
        blobStream.on('finish', resolve);
        blobStream.end(req.file.buffer);
      });

      photoUrl = `https://storage.googleapis.com/${bucketName}/users/${uid}/${req.file.originalname}`;
    }

    const query = `
      INSERT INTO users (uid, name, photo_url)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE name = ?, photo_url = ?;
    `;
    await pool.query(query, [uid, name, photoUrl, name, photoUrl]);
    res.status(200).json({ message: 'User profile saved successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user profile' });
  }
});

router.get('/profile/:uid', verifyToken, async (req, res) => {
  const { uid } = req.params;

  if (req.user.uid !== uid) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const query = 'SELECT name, photourl FROM users WHERE uid = ?';
    const [rows] = await pool.execute(query, [uid]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});


module.exports = router
