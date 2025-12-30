import React from "react";
import { Link } from "react-router-dom";
import HeroImg from '../../assets/horeImg.jpg'

const Hero = () => {
  return (
    <section className="relative">
      <img
        src={HeroImg}
        alt="Makeup Hero"
        className="w-full h-[400px] md:h-[600px] object-cover"
      />

      
      <div className="absolute inset-0  flex items-center justify-center">
        <div className="text-center  px-4">
          <h1 className="text-4xl md:text-6xl font-bold  text-pink-800 uppercase mb-4 ">
            Beauty <br /> Essentials
          </h1>

          <p className="text-pink-800  mb-6  mx-auto ">
            Discover premium makeup products crafted to enhance your natural
            beauty.
          </p>

          <Link
            to="/shop"
            className="inline-block bg-pink-700 text-white hover:bg-red-800 px-6 py-3 text-sm md:text-base font-medium rounded transition-all duration-300"
          >
            Shop Makeup
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
