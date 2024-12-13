import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

const Profile = () => {
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

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar showLogout={false} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Profile</h2>
        {profile ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <div className="flex flex-col items-center mb-6">
              <img
                src={profile.photo_url}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <p className="text-2xl font-semibold text-gray-800">
                {profile.name}
              </p>
            </div>
            <Button
              asChild
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              <Link to="/editprofile">Edit Profile</Link>
            </Button>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading profile...</p>
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

export default Profile;
