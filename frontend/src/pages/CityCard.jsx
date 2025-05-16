import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CityCard = () => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const { data, loading, error } = state;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/cities.json");
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching cities:", error);
        setState({
          data: [],
          loading: false,
          error: "Failed to load cities.",
        });
      }
    };

    fetchCities();
  }, []);

  if (loading) return <p className="text-center py-8">Loading cities...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <div className="py-12 px-4 md:px-12 bg-white">
      {/* <h2 className="text-3xl font-bold text-center mb-8">
        Browse by <span className="text-blue-900">City</span>
      </h2> */}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((city) => (
          <div
            key={city.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={city.image}
              alt={city.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {city.name}
              </h3>
              <Link
                to={`/houses?city=${city.name}`}
                className="inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
              >
                View Houses
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityCard;
