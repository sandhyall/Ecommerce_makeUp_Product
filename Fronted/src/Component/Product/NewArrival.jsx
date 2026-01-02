import React, { useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewArrival = () => {
  const scrollRef = useRef(null);

  const products = [
  {
    id: 1,
    name: "Blush",
    category: "Face",
    images: "https://picsum.photos/200?random=1",
  },
  {
    id: 2,
    name: "Bronzer",
    category: "Face",
    images: "https://picsum.photos/200?random=2",
  },
  {
    id: 3,
    name: "Eyebrow",
    category: "Eyes",
    images: "https://picsum.photos/200?random=3",
  },
  {
    id: 4,
    name: "Eyeliner",
    category: "Eyes",
    images: "https://picsum.photos/200?random=4",
  },
  {
    id: 5,
    name: "EyeShadow",
    category: "Eyes",
    images: "https://picsum.photos/200?random=5",
  },
  {
    id: 6,
    name: "Moisture",
    category: "Skincare",
    images: "https://picsum.photos/200?random=6",
  },
];


  const handleLeft = () => {
    scrollRef.current.scrollLeft -= 300;
  };

  const handleRight = () => {
    scrollRef.current.scrollLeft += 300;
  };

  return (
    <div className="max-w-9xl mx-auto px-8 py-3 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">New Arrivals</h2>

      <button
        onClick={handleLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 shadow rounded-full z-10"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={handleRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 shadow rounded-full z-10"
      >
        <FaChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
      >
        {products.map((item) => (
          <div
            key={item.id}
            
            className="bg-white min-w-[200px] flex-shrink-0 overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <Link to={`/product/${item.id}`}>
            <img
              src={item.images}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              

              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
               <h4 className=" font-semibold text-gray-800"> Category:{item.category}</h4>
            </div>
            </Link>
           
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;
