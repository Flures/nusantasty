const recipeModel = require('../models/recipeModel');
const errorResponse = require('../utils/errorResponse');

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