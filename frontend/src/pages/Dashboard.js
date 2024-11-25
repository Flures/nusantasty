import React, { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        const response = await axios.get("http://localhost:3000/protected/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      {userInfo ? (
        <div>
          <p>Welcome, {userInfo.user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
