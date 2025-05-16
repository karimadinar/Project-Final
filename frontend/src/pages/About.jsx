import React from 'react';
import { FaHome, FaSearch, FaCheck, FaPhoneAlt } from 'react-icons/fa';

const About = () => {
  // Define the links array outside of the JSX
  const links = [
    {
      icon: <FaHome className="text-4xl mb-4 inline-block text-pink-500" />,
      title: 'Diverse Property Portfolio',
      description: 'From chic urban apartments to traditional Moroccan riads'
    },
    {
      icon: <FaSearch className="text-4xl mb-4 inline-block text-blue-500" />,
      title: 'Smart Search Tools',
      description: 'Filters that understand what really matters to you'
    },
    {
      icon: <FaCheck className="text-4xl mb-4 inline-block text-green-500" />,
      title: 'Verified Listings',
      description: 'Every property undergoes rigorous verification'
    },
    {
      icon: <FaPhoneAlt className="text-4xl mb-4 inline-block text-yellow-500" />,
      title: 'Dedicated Support',
      description: 'Local experts available 7 days a week'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 w-full mb-16 rounded-xl overflow-hidden shadow-lg">
        <img
          src="/images/about.jpg"
          alt="Modern Moroccan housing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#112848cc] flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-xl font-light text-gray-200 mb-2">Discover</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              About Rezerv
            </h1>
            <p className="mt-4 text-lg text-gray-100 max-w-2xl mx-auto">
              Your trusted partner in Moroccan real estate
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-6xl mx-auto mb-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Rezerv Stands Out</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          We've redefined rental excellence with features designed around your needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {links.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {item.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
