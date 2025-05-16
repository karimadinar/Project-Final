import React from 'react';
import { Link } from 'react-router-dom';
import SocialMedia from '../pages/SocialMedia';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 text-center md:text-left">
          {/* Logo */}
          <div className="mb-2 md:mb-0">
            <Link to="/" className="text-xl font-bold text-pink-500">
              Rezerv
            </Link>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-300">
            <Link to="/About" className="hover:text-white">About</Link>
            <Link to="/Houses" className="hover:text-white">Properties</Link>
            <Link to="/Services" className="hover:text-white">Services</Link>
            <Link to="/Contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-start mb-2">
          <SocialMedia />
        </div>

        <div className="text-center text-gray-500 text-xs">
          © {new Date().getFullYear()} Rezerv. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
