import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FeaturedHouses() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios.get("/Data.json")
      .then((res) => {
        setHouses(res.data.slice(0, 4));
      })
      .catch((err) => {
        console.error("Error fetching houses:", err);
      });
  }, []);

  return (
    <div className="py-12 px-4 md:px-12 bg-white">
      {/* <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Featured <span className="text-blue-900">Houses</span>
      </h2> */}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {houses.map((house) => (
          <div
            key={house.id}
            className="bg-gray-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={house.images.main_image}
              alt={house.city}
              className="w-full h-40 object-cover" // تعديل الحجم
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
                to="/Houses"
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
