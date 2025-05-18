import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FeaturedHouses() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/houses") 
      .then((res) => {
        if (Array.isArray(res.data)) {
          setHouses(res.data.slice(0, 4)); // Only get 4
        } else {
          console.error("Data is not an array:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching houses:", err);
      });
  }, []);

  return (
    <div className="py-12 px-4 md:px-12 bg-white">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {houses.map((house) => (
          <div
            key={house._id}
            className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={house.main_picture}
              alt={house.city}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {house.city}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {house.area}
              </p>
              <span className="text-gray-600 font-bold block mb-4">
                {house.price}
              </span>
              <Link
                to={`/houses/${house._id}`}
                className="inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
