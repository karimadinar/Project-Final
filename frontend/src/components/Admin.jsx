import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Admin = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHouses = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:3000/api/Houses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHouses(response.data);
      } catch (err) {
        setError('Failed to load houses.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchHouses();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this house?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/Houses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHouses(houses.filter((house) => house._id !== id));
    } catch (err) {
      alert('Failed to delete house.');
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Admin Dashboard</h1>

      <div className="flex justify-end mb-4">
        <Link to="/houseForm">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300">
            Add New House
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center">Loading houses...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          {houses.length === 0 ? (
            <p className="text-center text-gray-600">No houses found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
                <thead>
                  <tr className="bg-gray-500 text-white">
                    <th className="px-4 py-3 text-left">City</th>
                    <th className="px-4 py-3 text-left">Area</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Bedrooms</th>
                    <th className="px-4 py-3 text-left">Shared</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {houses.map((house) => (
                    <tr key={house._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-4">{house.city}</td>
                      <td className="px-4 py-4">{house.area}</td>
                      <td className="px-4 py-4">{house.type}</td>
                      <td className="px-4 py-4">{house.price}</td>
                      <td className="px-4 py-4">{house.bedrooms}</td>
                      <td className="px-4 py-4">{house.shared ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-4 space-x-2 flex items-center">
                        <button
                          onClick={() => handleDelete(house._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete House"
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
