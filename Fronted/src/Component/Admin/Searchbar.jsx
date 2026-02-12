import React, { useState } from "react";

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-6 flex justify-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder=" Search by ID, Name, or Address..."
        className="
          w-full max-w-md
          px-5 py-3
          rounded-full
          bg-gradient-to-r from-purple-100 
          border-2 border-transparent
          
        
          placeholder:text-gray-500
          text-gray-700
          font-semibold
          transition-all
         
          hover:shadow-xl
        "
      />
    </div>
  );
};

export default Searchbar;
