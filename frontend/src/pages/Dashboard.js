import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const MODEL_API_URL = process.env.REACT_APP_MODEL_API_URL;
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You need to be logged in to get recommendations');
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      const response = await axios.post(
        `${MODEL_API_URL}/recommend`,
        {
          ingredients,
          userId: user.uid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setRecipes(response.data.recommendations);
      } else {
        alert('Failed to get recommendations');
      }
    } catch (error) {
      alert('Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You need to be logged in to save recipes');
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      await axios.post(
        `${API_URL}/save-recipe`,
        {
          recipe_id: recipe.recipeId,
          title: recipe.Title,
          description: recipe.Description,
          category: recipe.Category,
          image_url: recipe.Image,
          ingredients_groups: recipe['Ingredient Groups'],
          instructions: recipe.Instructions,
          ratings: recipe.Ratings,
          status: recipe.Status,
          total_time: recipe['Total Time'],
          yields: recipe.Yields,

          uid: user.uid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert('Recipe saved successfully!');
    } catch (error) {
      alert('Failed to save recipe');
    } finally {
      setLoading(false);
    }
  };

  const handleClearRecipes = () => {
    setRecipes([]);
  };

  const parseIngredients = (ingredientGroups) => {
    const regex = /IngredientGroup\(ingredients=\[(.*?)\], purpose='(.*?)'\)/g;
    const matches = [...ingredientGroups.matchAll(regex)];
    return matches.map((match) => ({
      ingredients: match[1]
        .split(',')
        .map((ingredient) => ingredient.trim().replace(/'/g, '')),
      purpose: match[2],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar showLogout={true} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Get Recipes</h2>
        <p className="mb-6 text-gray-600">
          Enter ingredients in English to generate recipes. Separate each
          ingredient with a comma.
        </p>
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <InputField
            type="text"
            placeholder="Enter ingredients Ex: chicken, rice, salt"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="flex-grow"
          />
          <Button
            onClick={handleRecommend}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600"
          >
            {loading ? 'Loading...' : 'Generate Recipes'}
          </Button>
          <Button
            onClick={handleClearRecipes}
            className="bg-gray-500 hover:bg-gray-600"
          >
            Clear Recipes
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.recipeId}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">{recipe.Title}</h3>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={recipe.Image}
                  alt={recipe.Title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <p className="mb-2">
                <strong>Category:</strong> {recipe.Category}
              </p>
              <p className="mb-2">
                <strong>Description:</strong> {recipe.Description}
              </p>
              <div className="mb-4">
                <strong>Ingredients:</strong>
                {parseIngredients(recipe['Ingredient Groups']).map(
                  (group, index) => (
                    <div key={index} className="ml-4 mt-2">
                      <p className="font-semibold">{group.purpose}:</p>
                      <ul className="list-disc list-inside">
                        {group.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
              <p className="mb-2">
                <strong>Instructions:</strong> {recipe.Instructions}
              </p>
              <p className="mb-2">
                <strong>Ratings:</strong> {recipe.Ratings}
              </p>
              <p className="mb-2">
                <strong>Total Time:</strong>{' '}
                {recipe['Total Time']
                  ? `${recipe['Total Time']} minutes`
                  : 'N/A'}
              </p>
              <p className="mb-4">
                <strong>Yields:</strong> {recipe.Yields}
              </p>
              <Button
                onClick={() => handleSaveRecipe(recipe)}
                disabled={loading}
                className="mt-auto bg-orange-500 hover:bg-orange-600"
              >
                {loading ? 'Saving...' : 'Save Recipe'}
              </Button>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Nusantasty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
