import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';

const EditProfile = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

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
        }
      );
      setMessage('Profile updated successfully');
      console.log(response.data);
    } catch (error) {
      setMessage('Failed to update profile');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Profile Photo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
