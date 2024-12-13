const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');
const upload = multer();
const { getProfile, saveProfile } = require('../controllers/profileController');


/**
 * @swagger
 * /profile/{uid}:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Failed to fetch profile
 */


router.get('/profile/:uid', verifyToken, getProfile);

/**
 * @swagger
 * /save-profile:
 *   post:
 *     summary: Save user profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User profile saved successfully
 *       500:
 *         description: Failed to save user profile
 */

router.post('/save-profile', verifyToken, upload.single('photo'), saveProfile);

module.exports = router;