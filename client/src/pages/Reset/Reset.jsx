import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(password);
      const response = await axios.get(`http://localhost:3001/api/auth/reset-password/${token}`, {
        params: {
          password: password
        }
      });
      // console.log(response)
       if (response.status === 200) {
        navigate('/signin');
      } 
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;