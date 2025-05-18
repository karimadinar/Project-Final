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
    if (id) fetchHouseDetails(id);
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
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 lg:text-left">{house?.type || 'N/A'}</h1>
        <div className="flex justify-center items-center space-x-4 text-lg text-gray-600 lg:justify-start">
          <span>{house?.city || 'N/A'}</span>
          <span>•</span>
          <span>{house?.area ? `${house.area} sq.ft` : 'N/A'}</span>
          <span>•</span>
          <span>{house?.bedrooms != null ? `${house.bedrooms} ${house.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}` : 'N/A'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {house?.main_picture && (
            <div className="rounded-xl overflow-hidden shadow-lg max-h-[380px]">
              <img src={house.main_picture} alt="Main" className="w-full h-full object-cover object-center" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[house?.picture1, house?.picture2, house?.picture3].map((pic, i) =>
              pic && (
                <div key={i} className="rounded-lg overflow-hidden shadow-md max-h-48">
                  <img src={pic} alt={`Picture ${i + 1}`} className="w-full h-full object-cover object-center" />
                </div>
              )
            )}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <DetailItem icon={<FaHome />} label="Type" value={house?.type || 'N/A'} />
              <DetailItem icon={<FaMapMarkerAlt />} label="City" value={house?.city || 'N/A'} />
              <DetailItem icon={<FaExpand />} label="Area" value={house?.area ? `${house.area} sq.ft` : 'N/A'} />
              <DetailItem icon={<FaDollarSign />} label="Price" value={house?.price ? `${house.price} MAD/month` : 'N/A'} />
              <DetailItem icon={<FaBed />} label="Bedrooms" value={house?.bedrooms != null ? house.bedrooms : 'N/A'} />
              <DetailItem icon={<FaCheckCircle />} label="Amenities" value={Array.isArray(house?.amenities) ? house.amenities.join(', ') : 'N/A'} />
              <DetailItem icon={<FaUniversity />} label="Nearby Universities" value={house?.nearby_universities || 'N/A'} />
              <DetailItem icon={<FaRoute />} label="Distance to University" value={house?.distance_to_university ? `${house.distance_to_university} km` : 'N/A'} />
              <DetailItem icon={<FaUsers />} label="Shared" value={house?.shared === true ? 'Yes' : house?.shared === false ? 'No' : 'N/A'} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            {house?._id && house?.price ? (
              <ReservationBox houseId={house._id} price={Number(house.price)} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="text-xl text-blue-500">{icon}</div>
    <div>
      <div className="font-medium text-gray-800">{label}</div>
      <div className="text-gray-600">{value}</div>
    </div>
  </div>
);

export default HouseDetails;
