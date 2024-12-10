import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const token = await userCredential.user.getIdToken();
      alert('Login successful');
      console.log('Token:', token);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form
        onSubmit={handleLogin}
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
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      <p className="mt-4">
        Forgot your password?{' '}
        <Link to="/forgot-password" className="text-blue-500">
          Reset it here
        </Link>
      </p>
    </div>
  );
};

export default Login;
