import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const HousesAdmin = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

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

  // Function to show confirmation modal
  const confirmDelete = (id) => {
    setToDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/Houses/${toDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHouses(houses.filter((house) => house._id !== toDeleteId));
    } catch (err) {
      alert('Failed to delete house.');
      console.error(err);
    } finally {
      setShowConfirm(false);
      setToDeleteId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
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
      ) : houses.length === 0 ? (
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
                      onClick={() => confirmDelete(house._id)}
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

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white border-2 p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700"> Delete</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this house?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HousesAdmin;
