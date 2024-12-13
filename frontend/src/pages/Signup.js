import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKEND_API_URL;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
      });
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <header className="bg-orange-500 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Nusantasty</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Sign Up
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <InputField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <InputField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-orange-500 hover:text-orange-600"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Nusantasty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
