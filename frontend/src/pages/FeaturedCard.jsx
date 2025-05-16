import React from "react"
import { FaHome, FaBuilding, FaHotel, FaCity, FaWarehouse, FaStore } from "react-icons/fa"

const featured = [
  { icon: <FaHome />, name: "Apartments", total: "120" },
  { icon: <FaBuilding />, name: "Villas", total: "80" },
  { icon: <FaHotel />, name: "Studios", total: "200" },
  { icon: <FaCity />, name: "Offices", total: "60" },
  { icon: <FaWarehouse />, name: "Warehouses", total: "45" },
  { icon: <FaStore />, name: "Warehouses", total: "45" },
]

const FeaturedCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10 m-3">
      {featured.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg shadow-md text-center p-6 hover:shadow-1xl transition duration-300  hover:scale-110 "
        >
          <div className="text-pink-500 text-2xl mb-4">{item.icon}</div>
          <h4 className="text-[15px] font-semibold mb-1">{item.name}</h4>
          <span className="text-sm text-gray-500">{item.total} Listings</span>
        </div>
      ))}
    </div>
  )
}

export default FeaturedCard
