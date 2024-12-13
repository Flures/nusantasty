import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      setMessage('You need to be logged in to update your profile.');
      return;
    }

    const formData = new FormData();
    formData.append('uid', user.uid);
    formData.append('name', name);
    if (photo) {
      formData.append('photo', photo);
    }

    setLoading(true);
    try {
      const token = await user.getIdToken(); // Get Firebase token
      const response = await axios.post(`${API_URL}/save-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Profile updated successfully');
      console.log(response.data);
      navigate('/profile'); // Redirect to profile page
    } catch (error) {
      setMessage('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar showLogout={false} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Profile</h2>
        {message && (
          <p className="mb-4 text-center text-orange-600">{message}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <InputField
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Profile Photo:
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
            />
          </div>
          {photoPreview && (
            <div className="mb-4">
              <img
                src={photoPreview}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Nusantasty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default EditProfile;
