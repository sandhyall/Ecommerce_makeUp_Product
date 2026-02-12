import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Women from "../../assets/women.jpg";
import Gift from "../../assets/gift.jpg";


const COLLECTIONS = [
  {
    id: 1,
    title: "Women Sustainable Collection",
    description: "Ethical fashion made with care and consciousness.",
    image: Women,
    cta: "Explore Now",
    link: "/collection/all",
  },
  {
    id: 2,
    title: "Perfect Ethical Gifts",
    description: "Thoughtful gifts that care for people and the planet.",
    image: Gift,
    cta: "Shop Gifts",
    link: "/",
  },
];

const GiftPurchase = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      const newIndex =
        direction === "left"
          ? currentIndex === 0
            ? COLLECTIONS.length - 1
            : currentIndex - 1
          : currentIndex === COLLECTIONS.length - 1
            ? 0
            : currentIndex + 1;

      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleScroll("right");
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleDotClick = (index) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.clientWidth * (index - currentIndex);
      current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto my-12 md:my-20 px-4 md:px-10">
      <header className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
          Limited Edition Drop
        </h2>
        <p className="text-gray-500 mt-4 text-sm md:text-lg max-w-2xl mx-auto">
          Crafted sustainably. Designed to make a statement.
        </p>
      </header>

      <div className="relative group">
        <ScrollButton
          direction="left"
          onClick={() => handleScroll("left")}
          icon={<FaChevronLeft />}
        />
        <ScrollButton
          direction="right"
          onClick={() => handleScroll("right")}
          icon={<FaChevronRight />}
        />

        <div
          ref={scrollRef}
          className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory rounded-2xl shadow-xl"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {COLLECTIONS.map((item) => (
            <div
              key={item.id}
              className="relative w-full flex-shrink-0 snap-start overflow-hidden group/item"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[400px] md:h-[600px] object-cover transition-transform duration-700 group-hover/item:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center justify-center text-white text-center px-6">
                <h3 className="text-3xl md:text-5xl font-bold mb-4 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500">
                  {item.title}
                </h3>
                <p className="max-w-md text-sm md:text-lg opacity-90 mb-8 transform translate-y-4 group-hover/item:translate-y-0 transition-transform duration-500 delay-75">
                  {item.description}
                </p>
                <Link
                  to={item.link}
                  className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300 shadow-lg inline-block"
                >
                  {item.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
          {COLLECTIONS.map((_, index) => (
            <span
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ScrollButton = ({ direction, onClick, icon }) => (
  <button
    onClick={onClick}
    aria-label={`Scroll ${direction}`}
    className={`absolute ${
      direction === "left" ? "left-6" : "right-6"
    } top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-xl z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white transform hover:scale-110 active:scale-95`}
  >
    {icon}
  </button>
);

export default GiftPurchase;
