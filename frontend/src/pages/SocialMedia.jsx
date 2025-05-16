import React from 'react';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const SocialMedia = () => {
  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      url: "https://wa.me/0656624997",
      color: "text-green-500 hover:text-green-400",
      label: "WhatsApp"
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/yourusername",
      color: "text-pink-500 hover:text-pink-400",
      label: "Instagram"
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/karima-dinar-05b963356/",
      color: "text-blue-500 hover:text-blue-400",
      label: "LinkedIn"
    },
    {
      icon: <FaEnvelope />,
      url: "mailto:dinarkarima@gmail.com",
      color: "text-red-500 hover:text-red-400",
      label: "Email"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Connect With Us
      </h2>
      
      <div className="flex justify-center gap-6">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-3xl ${social.color} transition-colors duration-300`}
            aria-label={social.label}
          >
            {social.icon}
          </a>
        ))}
      </div>

      <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
        We're available 24/7 to answer your questions
      </p>
    </div>
  );
};

export default SocialMedia;
