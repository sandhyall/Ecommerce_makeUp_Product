import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    console.log("submitted successfully", search);
    setSearch("");
  };

  return (
    <div className="flex ">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="search"
          placeholder="Search here..."
          value={search}
          onChange={handleChange}
          className=" px-4 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-pink-500 text-white px-5 py-2 rounded-md 
                     hover:bg-pink-600 transition duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
