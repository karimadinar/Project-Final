import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaHome } from 'react-icons/fa';
import { useUserContext } from './context/UserContext';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, logoutUser } = useUserContext();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const guestLinks = [
    { id: 1, to: '/', label: 'Home' },
    { id: 2, to: '/about', label: 'About' },
    { id: 3, to: '/houses', label: 'Houses' },
    { id: 4, to: '/services', label: 'Services' },
    { id: 5, to: '/contact', label: 'Contact' },
  ];

  const userLinks = [
    { id: 1, to: '/', label: 'Home' },
    { id: 2, to: '/about', label: 'About' },
    { id: 3, to: '/houses', label: 'Houses' },
    { id: 4, to: '/services', label: 'Services' },
    { id: 5, to: '/contact', label: 'Contact' },
  ];

  const adminLinks = [
    { id: 1, to: '/Admin', label: 'Dashboard' },
  ];

  let Links = guestLinks;

  if (userData) {
    if (userData.role.toLowerCase() === 'admin') {
      Links = adminLinks;
    } else {
      Links = userLinks;
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FaHome className="text-2xl text-gray-800" />
          <span className="text-xl font-semibold text-gray-800">Rezerv</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {Links.map(({ id, to, label }) => (
              <li key={id}>
                <Link 
                  to={to} 
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {userData ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-medium">{userData.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-white hover:bg-gray-600 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gray-800 text-white hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="px-4 py-3 space-y-2">
            {Links.map(({ id, to, label }) => (
              <li key={id}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-gray-200">
            {userData ? (
              <div className="flex flex-col space-y-3">
                <div className="text-sm text-gray-600 px-3 py-2">
                  Welcome, <span className="font-medium">{userData.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;