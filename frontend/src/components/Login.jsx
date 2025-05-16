import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useUserContext } from './context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useUserContext();

  useEffect(() => {
    const temp = sessionStorage.getItem("tempReservation");
    if (temp) {
      sessionStorage.removeItem("tempReservation");
      const { from } = JSON.parse(temp);
      navigate(from);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });

      loginUser(res.data);
      console.log(res.data)
      const userRole = res.data.user.role.toLowerCase();

      if (userRole === 'admin') {
        navigate('/Admin'); 

      } else {
        const redirectPath = location.state?.from || '/';
        navigate(redirectPath);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}

        <div className="mt-4 text-center">
          <p>Don't have an account?</p>
          <Link to="/SignUp" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
