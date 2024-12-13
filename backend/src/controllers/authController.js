const admin = require('../config/firebase');
const userModel = require('../models/userModel');
const errorResponse = require('../utils/errorResponse');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Error during signup
 */

exports.signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().createUser({ email, password });
    await userModel.createUser(user.uid, email);

    res.status(201).json({ message: 'User created and stored successfully', user });
  } catch (error) {
    console.error('Error during signup:', error);
    errorResponse(res, 400, error.message);
  }
};