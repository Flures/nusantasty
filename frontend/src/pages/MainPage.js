import { Link } from 'react-router-dom';
import Button from '../components/Button';
import React from 'react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-orange-500 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nusantasty</h1>
          <nav>
            <Link to="/login" className="text-white hover:text-orange-200 mr-4">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-orange-200">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Delicious Recipes
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Find the perfect recipe based on the ingredients you have!
          </p>
          <Button
            asChild={true}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              Personalized Recommendations
            </h3>
            <p>
              Get recipe suggestions tailored to your available ingredients.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Save Your Favorites</h3>
            <p>
              Keep track of your favorite recipes for quick and easy access.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Explore New Cuisines</h3>
            <p>
              Discover exciting dishes from various cuisines around the world.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Nusantasty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
