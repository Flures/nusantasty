const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { saveRecipe, deleteRecipe, getSavedRecipes } = require('../controllers/recipeController');

router.post('/save-recipe', verifyToken, saveRecipe);
router.delete('/delete-recipe/:recipe_id', verifyToken, deleteRecipe);
router.get('/saved-recipes', verifyToken, getSavedRecipes);

module.exports = router;