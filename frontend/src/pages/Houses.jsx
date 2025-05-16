import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import SearchForm from './SearchForm';
import { useUserContext } from '../components/context/UserContext';

const Houses = () => {
  const navigate = useNavigate();
  const { userData } = useUserContext();

  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/houses');
        setHouses(res.data);
        setFilteredHouses(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchCity) => {
    if (searchCity === '') {
      setFilteredHouses(houses);
    } else {
      const filtered = houses.filter((house) =>
        house.city.toLowerCase().includes(searchCity.toLowerCase())
      );
      setFilteredHouses(filtered);
    }
  };

  const handleFavoriteClick = async (houseId) => {
    if (!userData) {
      navigate('/login', { state: { from: '/AddFavorite' } });
    } else {
      try {
        await axios.post(`http://localhost:3000/api/favorites/${houseId}`, {}, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        navigate('/AddFavorite');
      } catch (error) {
        console.error('Error adding to favorites:', error);
        alert('Failed to add to favorites');
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-8">Error: {error}</div>;

  return (
    <>
      <div className="flex justify-between items-center mb-8 px-6">
        <h1 className="text-3xl font-bold text-gray-800">Houses</h1>
        {userData && (
          <button
            onClick={() => navigate('/AddFavorite')}
            className="px-4 py-1 bg-pink-600 text-white rounded hover:bg-blue-700 transition text-sm"
          >
            Go to Favorites
          </button>
        )}
      </div>

      <SearchForm onSearch={handleSearch} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 py-6">
        {filteredHouses.length > 0 ? (
          filteredHouses.map((e) => (
            <div
              key={e._id}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200"
            >
              <button
                onClick={() => handleFavoriteClick(e._id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition duration-200"
                aria-label="Add to favorites"
              >
                <FaHeart className="text-white text-xl hover:text-red-500 transition" />
              </button>

              <img
                className="w-full h-56 object-cover rounded-t-2xl"
                src={e.main_picture}
                alt={`House in ${e.city}`}
              />

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{e.city}</h3>
                <p className="text-sm text-gray-600 mb-2">From {e.price}</p>
              </div>

              <Link
                to={`/houses/${e._id}`}
                className="block w-full text-center bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 rounded-b-2xl transition"
              >
                Show More
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">Houses not found</p>
        )}
      </div>
    </>
  );
};

export default Houses;
