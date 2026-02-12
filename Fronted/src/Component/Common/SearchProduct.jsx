import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchProduct = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/collection/all?search=${query}`);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center border rounded-md overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-3 py-2 outline-none w-48"
      />
      <button
        type="submit"
        className="bg-pink-600 text-white px-3 py-2"
      >
        <FaMagnifyingGlass />
      </button>
    </form>
  );
};

export default SearchProduct;
