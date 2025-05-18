import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HouseForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: '',
    area: '',
    type: '',
    price: '',
    bedrooms: '',
    amenities: '',
    nearby_universities: '',
    distance_to_university: '',
    shared: false,
    main_picture: null,
    picture1: null,
    picture2: null,
    picture3: null,
  });

  const fields = [
    { label: 'City', name: 'city', type: 'text' },
    { label: 'Area', name: 'area', type: 'text' },
    { label: 'Type', name: 'type', type: 'text' },
    { label: 'Price', name: 'price', type: 'text' },
    { label: 'Bedrooms', name: 'bedrooms', type: 'number' },
    { label: 'Amenities (comma separated)', name: 'amenities', type: 'text' },
    { label: 'Nearby Universities', name: 'nearby_universities', type: 'text' },
    { label: 'Distance to University (in km)', name: 'distance_to_university', type: 'text' },
    { label: 'Main Picture', name: 'main_picture', type: 'file' },
    { label: 'Picture 1', name: 'picture1', type: 'file' },
    { label: 'Picture 2', name: 'picture2', type: 'file' },
    { label: 'Picture 3', name: 'picture3', type: 'file' },
  ];

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dev_preset"); // Remplace par ton preset si besoin

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dame2c0yb/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mainPicUrl = formData.main_picture ? await uploadImageToCloudinary(formData.main_picture) : null;
    const pic1Url = formData.picture1 ? await uploadImageToCloudinary(formData.picture1) : null;
    const pic2Url = formData.picture2 ? await uploadImageToCloudinary(formData.picture2) : null;
    const pic3Url = formData.picture3 ? await uploadImageToCloudinary(formData.picture3) : null;

    const newHouse = {
      city: formData.city,
      area: formData.area,
      type: formData.type,
      price: formData.price,
      bedrooms: formData.bedrooms,
      amenities: formData.amenities.split(',').map((a) => a.trim()),
      nearby_universities: formData.nearby_universities,
      distance_to_university: formData.distance_to_university,
      shared: formData.shared,
      main_picture: mainPicUrl,
      picture1: pic1Url,
      picture2: pic2Url,
      picture3: pic3Url,
    };

    try {
      await axios.post('http://localhost:3000/api/houses', newHouse);
      navigate('/HousesAdmin');
    } catch (error) {
      console.error('Error adding house:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add New House</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ label, name, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={type === 'file' ? undefined : formData[name]}
              onChange={handleChange}
              required={!['picture1', 'picture2', 'picture3'].includes(name)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="shared"
            id="shared"
            checked={formData.shared}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="shared" className="text-sm text-gray-600">Shared</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default HouseForm;
