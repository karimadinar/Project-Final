import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/users/register', {
        name,
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.user.name);
      localStorage.setItem('userEmail', res.data.user.email);

       console.log(res.data)
      setSuccessMessage("Account created successfully!");
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || "Error during registration");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>

        {/* Messages */}
        {successMessage && (
          <div className="text-green-500 text-center mt-4">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="text-red-500 text-lg text-center mt-4">{errorMessage}</div>
        )}

        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <Link to="/Login" className="text-blue-500 text-lg hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
