import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        const response = await axios.get(`http://localhost:3000/protected/profile/${user.uid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <img src={profile.photo_url} alt="Profile" style={{ width: 100, height: 100 }} />
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
