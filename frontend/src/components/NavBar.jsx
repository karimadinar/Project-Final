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
    { id: 1, to: '/Dashbord', label: 'Dashbord' },
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
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
        <h1 className="flex items-center text-3xl font-bold text-[#4c5159] cursor-pointer">
          <FaHome className="text-3xl mr-2" />
          Rezerv
        </h1>

        <ul className="hidden md:flex gap-6 text-lg">
          {Links.map(({ id, to, label }) => (
            <li key={id}>
              <Link to={to} className="hover:text-pink-500 transition">{label}</Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {userData ? (
            <>
              <span className="text-[#4c5159] font-medium">
                Welcome, {userData.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-[#4c5159] text-white px-5 py-2 rounded-full"
            >
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-3xl text-pink-500">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-inner">
          <ul className="flex flex-col items-center gap-4 py-4 text-lg">
            {Links.map(({ id, to, label }) => (
              <li key={id}>
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-gray-500"
                >
                  {label}
                </Link>
              </li>
            ))}
            {userData ? (
              <>
                <li className="text-[#4c5159] font-medium">Welcome, {userData.name}</li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#4c5159] hover:bg-pink-600 text-white px-6 py-2 rounded-full"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
