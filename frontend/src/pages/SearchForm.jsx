import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value.trim().toLowerCase()); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    onSearch(searchValue.trim().toLowerCase());
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex justify-center items-center gap-4 mb-10 px-4 sm:px-0"
    >
      <input
        type="text"
        placeholder="Search by city..."
        value={searchValue}
        onChange={handleChange}
        className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-lg p-3 w-full max-w-md text-gray-700 shadow-sm transition duration-200"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
