import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Team = () => {
  const [teamState, setTeamState] = useState({
    data: [],
    loading: true,
    error: null,
  });
    const {  data, loading, error } = teamState;

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get('/Team.json');
        setTeamState({
          data: response.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching team data:', error);
        setTeamState({
          data: [],
          loading: false,
          error: 'Failed to load team data.',
        });
      }
    };

    fetchTeam();
  }, []);



  if (loading) return <p className="text-center py-8">Loading team...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <div className="container py-10">
      <h2 className="text-center text-3xl font-bold mb-8">Our Team</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300"
          >
            <img
              className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
              src={member.image}
              alt={member.name}
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-500">{member.designation}</p>
            <div className="flex justify-center gap-4 mt-4 text-lg">
              {member.socialLinks.whatsapp && (
                <a
                  href={member.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-700"
                >
                  <FaWhatsapp />
                </a>
              )}
              {member.socialLinks.instagram && (
                <a
                  href={member.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-700"
                >
                  <FaInstagram />
                </a>
              )}
              {member.socialLinks.linkedin && (
                <a
                  href={member.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
