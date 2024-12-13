const recipeModel = require('../models/recipeModel');
const errorResponse = require('../utils/errorResponse');


/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: Recipe management endpoints
 */

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

exports.saveRecipe = async (req, res) => {
  const recipe = req.body;

  try {
    await recipeModel.saveRecipe(recipe);
    res.status(201).json({ message: 'Recipe saved successfully' });
  } catch (error) {
    console.error('Error saving recipe:', error);
    errorResponse(res, 500, 'Failed to save recipe');
  }
};

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

exports.deleteRecipe = async (req, res) => {
  const { recipe_id } = req.params;

  try {
    await recipeModel.deleteRecipe(recipe_id);
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    errorResponse(res, 500, 'Failed to delete recipe');
  }
};

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

exports.getSavedRecipes = async (req, res) => {
    const { uid } = req.user;
  
    try {
      const recipes = await recipeModel.getSavedRecipes(uid);
      res.status(200).json({ success: true, recipes });
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
      errorResponse(res, 500, 'Failed to fetch saved recipes');
    }
  };