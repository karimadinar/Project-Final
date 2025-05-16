import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReservationBox from './ReservationBox';
import {
  FaHome, FaMapMarkerAlt, FaExpand, FaDollarSign,
  FaBed, FaCheckCircle, FaUniversity, FaRoute, FaUsers
} from 'react-icons/fa';

const HouseDetails = () => {
  const { id } = useParams();

  const [state, setState] = useState({
    house: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (id) {
      fetchHouseDetails(id);
    }
  }, [id]);

  const fetchHouseDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/houses/${id}`);
      setState({ house: response.data, error: null, loading: false });
    } catch (error) {
      console.error('Error fetching house details:', error);
      setState({ house: null, error: 'Error fetching house details', loading: false });
    }
  };

  const { house, error, loading } = state;

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-4xl mx-auto mt-8">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 lg:text-left">{house.type}</h1>
        <div className="flex justify-center items-center space-x-4 text-lg text-gray-600 lg:justify-start">
          <span>{house.city}</span>
          <span>•</span>
          <span>{house.area} sq.ft</span>
          <span>•</span>
          <span>{house.bedrooms} {house.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          {house.main_picture && (
            <div className="rounded-xl overflow-hidden shadow-lg max-h-[480px]">
              <img src={house.main_picture} alt="Main" className="w-full h-full object-cover object-center" />
            </div>
          )}

          {/* Additional Images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[house.picture1, house.picture2, house.picture3].map((pic, i) =>
              pic ? (
                <div key={i} className="rounded-lg overflow-hidden shadow-md max-h-48">
                  <img src={pic} alt={`Picture ${i + 1}`} className="w-full h-full object-cover object-center" />
                </div>
              ) : null
            )}
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <DetailItem icon={<FaHome className="text-blue-500" />} label="Type" value={house.type} />
              <DetailItem icon={<FaMapMarkerAlt className="text-green-500" />} label="City" value={house.city} />
              <DetailItem icon={<FaExpand className="text-purple-500" />} label="Area" value={`${house.area} sq.ft`} />
              <DetailItem icon={<FaDollarSign className="text-yellow-500" />} label="Price" value={`${house.price} MAD/month`} />
              <DetailItem icon={<FaBed className="text-pink-500" />} label="Bedrooms" value={house.bedrooms} />
              <DetailItem icon={<FaCheckCircle className="text-indigo-500" />} label="Amenities" value={house.amenities} />
              <DetailItem icon={<FaUniversity className="text-teal-500" />} label="Nearby Universities" value={house.nearby_universities} />
              <DetailItem icon={<FaRoute className="text-red-500" />} label="Distance to University" value={`${house.distance_to_university} km`} />
              <DetailItem icon={<FaUsers className="text-orange-500" />} label="Shared" value={house.shared ? 'Yes' : 'No'} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ReservationBox price={house.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="text-xl">{icon}</div>
    <div>
      <span className="font-semibold">{label}:</span> <span>{value || 'N/A'}</span>
    </div>
  </div>
);

export default HouseDetails;
