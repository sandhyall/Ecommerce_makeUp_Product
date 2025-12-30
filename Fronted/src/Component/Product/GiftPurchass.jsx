import React, { useRef } from 'react'
import Women from '../../assets/women.jpg'
import Gift from '../../assets/gift.jpg'
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const GiftPurchass = () => {
  const scrollRef = useRef(null);

  const handleLeft = () => {
    scrollRef.current.scrollLeft -= 400;
  };

  const handleRight = () => {
    scrollRef.current.scrollLeft += 400;
  };

  return (
    <section className="relative w-full overflow-hidden">

    
      <button
        onClick={handleLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow z-10"
      >
        <FaChevronLeft />
      </button>

    
      <button
        onClick={handleRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow z-10"
      >
        <FaChevronRight />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-hidden scroll-smooth"
      >
      
        <img
          src={Women}
          className="min-w-full h-[400px] object-cover"
          alt="Women"
        />
        <img
          src={Gift}
          className="min-w-full h-[400px] object-cover"
          alt="Gift"
        />
      </div>

    </section>
  )
}

export default GiftPurchass;
