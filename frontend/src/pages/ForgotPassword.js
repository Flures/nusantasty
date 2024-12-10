import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import InputField from '../components/InputField';
import Button from '../components/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Check your inbox!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Sending...' : 'Send Reset Email'}
        </Button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
