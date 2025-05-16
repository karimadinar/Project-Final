import React from "react"
import FeaturedCard from "./FeaturedCard"
const Services = () => {
  return (
    <>
      <div className="relative h-[40vh]">
        <img
          src="/images/services.jpg"
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-[#112848a1] -z-10"></div>
        <div className="container text-white py-32 text-center">
          <span className="text-lg font-bold">Our Offerings</span>
          <h1 className="text-4xl font-medium mt-5">Services - All Services</h1>
          <p className="mt-4 text-lg font-light">Explore our wide range of property offerings.</p>
        </div>
      </div>

      <FeaturedCard />
    </>
  )
}

export default Services
