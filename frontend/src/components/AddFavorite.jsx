import React, { useEffect, useState } from 'react';
import { useUserContext } from '../components/context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AddFavorite = () => {
  const { userData } = useUserContext();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData) {
      navigate('/login');
      return;
    }
    const fetchFavorites = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/favorites', {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        setFavorites(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userData, navigate]);

  if (loading) return <div className="text-center py-8">Loading favorites...</div>;
  if (error) return <div className="text-center text-red-600 py-8">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Favorite Houses</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-600">You have no favorite houses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((house) => (
            <div
              key={house._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
            >
              <img
                src={house.main_picture}
                alt={`House in ${house.city}`}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{house.city}</h3>
                <p className="text-sm text-gray-600 mb-2">From {house.price}</p>
                <Link
                  to={`/houses/${house._id}`}
                  className="inline-block mt-2 text-blue-600 hover:underline"
                >
                  Show More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddFavorite;
