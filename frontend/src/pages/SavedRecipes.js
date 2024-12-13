import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          alert('You need to be logged in to view saved recipes');
          setLoading(false);
          return;
        }
        const token = await user.getIdToken();
        const response = await axios.get(`${API_URL}/saved-recipes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Response data:', response.data); // Debugging line
        setRecipes(response.data.recipes || []);
      } catch (error) {
        alert('Failed to fetch saved recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [API_URL]);

  const handleDeleteRecipe = async (recipeId) => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You need to be logged in to delete recipes');
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      await axios.delete(`${API_URL}/delete-recipe/${recipeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(recipes.filter((recipe) => recipe.recipe_id !== recipeId));
      alert('Recipe deleted successfully!');
    } catch (error) {
      alert('Failed to delete recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar showLogout={false} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Saved Recipes</h2>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(recipes) && recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div
                  key={recipe.recipe_id}
                  className="bg-white p-6 rounded-lg shadow-md flex flex-col"
                >
                  <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <p className="mb-2">
                    <strong>Category:</strong> {recipe.category}
                  </p>
                  <p className="mb-2">
                    <strong>Description:</strong> {recipe.description}
                  </p>
                  <p className="mb-2">
                    <strong>Instructions:</strong> {recipe.instructions}
                  </p>
                  <p className="mb-2">
                    <strong>Ratings:</strong> {recipe.ratings}
                  </p>
                  <p className="mb-2">
                    <strong>Total Time:</strong>{' '}
                    {recipe['Total Time']
                      ? `${recipe['Total Time']} minutes`
                      : 'N/A'}
                  </p>
                  <p className="mb-4">
                    <strong>Yields:</strong> {recipe.yields}
                  </p>
                  <Button
                    onClick={() => handleDeleteRecipe(recipe.recipe_id)}
                    disabled={loading}
                    className="mt-auto bg-red-500 hover:bg-red-600"
                  >
                    {loading ? 'Deleting...' : 'Delete Recipe'}
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-3">
                No saved recipes found.
              </p>
            )}
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Nusantasty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SavedRecipes;
