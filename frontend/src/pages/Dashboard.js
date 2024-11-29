import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Dashboard = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
