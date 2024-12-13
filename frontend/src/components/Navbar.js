import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import axios from 'axios';
import logo from './logo.png';

const Navbar = ({ showLogout }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        const response = await axios.get(`${API_URL}/profile/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      }
    };

    fetchProfile();
  }, [API_URL]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      alert('Failed to log out');
    }
  };

  return (
    <header className="bg-orange-500 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-16 h-16 mr-2" />
          <Link to="/dashboard" className="text-2xl font-bold hover:underline">
            Nusantasty
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link
            to="/saved-recipes"
            className="text-white hover:text-orange-200"
          >
            Saved Recipes
          </Link>
          {profile && (
            <Link to="/profile">
              <img
                src={
                  profile.photo_url ||
                  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          )}
          {showLogout && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-orange-200 focus:outline-none  bg-orange-500 hover:bg-orange-600"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
