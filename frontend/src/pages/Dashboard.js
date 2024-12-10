import React, { useState } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      alert('Logged out successfully!');
    } catch (error) {
      alert('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

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
        'http://localhost:5000/recommend',
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
        'http://localhost:3000/save-recipe',
        {
          recipe,
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
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <Link to="/saved-recipes" className="text-blue-500">
            Saved Recipes
          </Link>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <Button onClick={handleLogout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </nav>
      <div className="mb-4">
        <InputField
          type="text"
          placeholder="Enter ingredients (comma separated value) ex: tomato, onion, garlic"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mb-4 w-full"
        />
        <Button onClick={handleRecommend} disabled={loading} className="w-full">
          {loading ? 'Loading...' : 'Generate Recipes'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.recipeId} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-2">{recipe.Title}</h3>
            <img
              src={recipe.Image}
              alt={recipe.Title}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <p>
              <strong>Category:</strong> {recipe.Category}
            </p>
            <p>
              <strong>Description:</strong> {recipe.Description}
            </p>
            <div className="mb-2">
              <strong>Ingredients:</strong>
              {parseIngredients(recipe['Ingredient Groups']).map(
                (group, index) => (
                  <div key={index} className="mb-2">
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
            <p>
              <strong>Instructions:</strong> {recipe.Instructions}
            </p>
            <p>
              <strong>Ratings:</strong> {recipe.Ratings}
            </p>
            <p>
              <strong>Total Time:</strong> {recipe.TotalTime} minutes
            </p>
            <p>
              <strong>Yields:</strong> {recipe.Yields}
            </p>
            <Button
              onClick={() => handleSaveRecipe(recipe)}
              disabled={loading}
              className="mt-2 w-full"
            >
              {loading ? 'Saving...' : 'Save Recipe'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
