
import { Link } from 'react-router-dom'
import FeaturedHouses from './FeaturedHouses'
import FeaturedCard from './FeaturedCard'
import Team from './Team'
import CityCard from './CityCard'
const Home = () => {
  return (
    <>

       <div
      className="relative h-[100vh] w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/images/home.png')" }}
    >
      <div className="absolute inset-0 bg-[#00000066]"></div>

      <div className="relative text-center w-full md:w-[50%] z-10">
        <h1 className="text-white text-[50px] md:text-6xl font-semibold capitalize mb-6">
          Welcome to Rezerv
        </h1>
        <p className="text-white text-lg md:text-xl opacity-90 mb-6">
          Find your dream house today with ease and confidence.
        </p>

        {/* Link to Houses */}
        <Link
          to="/houses"
          className="inline-block bg-white text-[#112848] font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-300"
        >
          found Houses
        </Link>
      </div>
    </div>
      <CityCard/>
       <FeaturedHouses />
        <Team /> 
      <FeaturedCard />
    </>
    
  )
}

export default Home
