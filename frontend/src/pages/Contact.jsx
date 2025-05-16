import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import SocialMedia from './SocialMedia';
import CityForm from '../components/HouseForm';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      alert("Message envoyé avec succès!");
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      alert("Erreur lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative h-[30vh] mb-8">
        <img
          src="/images/immi.jpg"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[#112848a1] -z-10"></div>
        <div className="container text-white pt-20 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold">Contact us</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 mb-12 max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Your message</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <textarea
                id="message"
                name="message"
                placeholder="your message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border-b border-gray-300 focus:border-pink-500 focus:outline-none"
                rows="2"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm ${isSubmitting ? 'opacity-70' : ''}`}
            >
             Send
            </button>
          </form>
        </div>

        {/* Infos contact compactes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center justify-center space-x-2">
            <FaPhone className="text-pink-600" />
            <span className="text-sm">+212 6 56 62 49 97</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaEnvelope className="text-pink-600" />
            <span className="text-sm">contact@rezerv.ma</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaMapMarkerAlt className="text-pink-600" />
            <span className="text-sm">Casablanca</span>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="text-center">
          <SocialMedia />
        </div>
      </div>
    </>
  );
};

export default Contact;