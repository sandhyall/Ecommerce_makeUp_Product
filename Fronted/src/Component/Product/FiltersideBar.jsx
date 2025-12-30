import React from "react";
import { useSearchParams } from "react-router-dom";

const FiltersideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

 
  const handleFilterChange = (e, type) => {
    const { value, checked } = e.target;
    const params = new URLSearchParams(searchParams);

    if (checked) {
      params.set(type, value);   
    } else {
      params.delete(type);       
    }

    setSearchParams(params);
  };

  return (
    <div className="w-full md:w-64 bg-white p-5 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">
        Filter Product
      </h3>

    
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Category</h4>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="lips"
            checked={searchParams.get("category") === "lips"}
            onChange={(e) => handleFilterChange(e, "category")}
          />
          Lips
        </label>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="face"
            checked={searchParams.get("category") === "face"}
            onChange={(e) => handleFilterChange(e, "category")}
          />
          Face
        </label>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="eyes"
            checked={searchParams.get("category") === "eyes"}
            onChange={(e) => handleFilterChange(e, "category")}
          />
          Eyes
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="skincare"
            checked={searchParams.get("category") === "skincare"}
            onChange={(e) => handleFilterChange(e, "category")}
          />
          Skincare
        </label>
      </div>

      
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Brand</h4>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="Maybelline"
            checked={searchParams.get("brand") === "Maybelline"}
            onChange={(e) => handleFilterChange(e, "brand")}
          />
          Maybelline
        </label>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="Lakme"
            checked={searchParams.get("brand") === "Lakme"}
            onChange={(e) => handleFilterChange(e, "brand")}
          />
          Lakme
        </label>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="LOreal"
            checked={searchParams.get("brand") === "LOreal"}
            onChange={(e) => handleFilterChange(e, "brand")}
          />
          L’Oreal
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="Nykaa"
            checked={searchParams.get("brand") === "Nykaa"}
            onChange={(e) => handleFilterChange(e, "brand")}
          />
          Nykaa
        </label>
      </div>

     
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Color</h4>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="Red"
            checked={searchParams.get("color") === "Red"}
            onChange={(e) => handleFilterChange(e, "color")}
          />
          Red
        </label>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            value="Pink"
            checked={searchParams.get("color") === "Pink"}
            onChange={(e) => handleFilterChange(e, "color")}
          />
          Pink
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value="Nude"
            checked={searchParams.get("color") === "Nude"}
            onChange={(e) => handleFilterChange(e, "color")}
          />
          Nude
        </label>
      </div>
    </div>
  );
};

export default FiltersideBar;
