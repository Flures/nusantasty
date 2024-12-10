import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';
import InputField from '../components/InputField';
import Button from '../components/Button';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post(
        'http://localhost:3000/save-profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage('Profile updated successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {message && <p className="mb-4">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label className="block mb-2">
            Name:
            <InputField
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Profile Photo:
            <InputField
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
            />
          </label>
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Profile Preview"
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
          )}
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
