const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { saveRecipe, deleteRecipe, getSavedRecipes } = require('../controllers/recipeController');

/**
 * @swagger
 * /save-recipe:
 *   post:
 *     summary: Save a recipe
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipe_id:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               image_url:
 *                 type: string
 *               ingredient_groups:
 *                 type: string
 *               instructions:
 *                 type: string
 *               ratings:
 *                 type: number
 *               status:
 *                 type: string
 *               total_time:
 *                 type: string
 *               yields:
 *                 type: string
 *               uid:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe saved successfully
 *       500:
 *         description: Failed to save recipe
 */

router.post('/save-recipe', verifyToken, saveRecipe);

/**
 * @swagger
 * /delete-recipe/{recipe_id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Recipe ID
 *     responses:
 *       200:
 *         description: Recipe deleted successfully
 *       500:
 *         description: Failed to delete recipe
 */

router.delete('/delete-recipe/:recipe_id', verifyToken, deleteRecipe);

/**
 * @swagger
 * /saved-recipes:
 *   get:
 *     summary: Get saved recipes
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: List of saved recipes
 *       500:
 *         description: Failed to fetch saved recipes
 */

router.get('/saved-recipes', verifyToken, getSavedRecipes);

module.exports = router;