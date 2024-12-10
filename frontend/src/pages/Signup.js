import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        email,
        password,
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full"
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing up...' : 'Signup'}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
