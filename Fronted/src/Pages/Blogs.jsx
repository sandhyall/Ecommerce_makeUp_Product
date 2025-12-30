import React from "react";
import Beauty from "../assets/Beauty E-commerce Adoption.jpg";
import Product from "../assets/BEAUTY-PERSONAL-CARE.jpg";
import { Link } from "react-router-dom";

const Blogs = () => {
  return (
    <div className="p-8">
      <section className="flex flex-col md:flex-row gap-6 justify-center">
        
       
        <div className="flex-1">
          <img
            src={Beauty}
            alt="Beauty E-commerce Adoption"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div className="p-2 mt-3">
            <p className="text-gray-800 font-medium">
              The rise of beauty e-commerce adoption worldwide. Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </p>
            <Link
              to="/blog"
              className="text-red-600 underline underline-offset-4 hover:text-red-800 mt-2 inline-block"
            >
              Read more
            </Link>
          </div>
        </div>

     
        <div className="flex-1">
          <img
            src={Product}
            alt="Beauty Personal Care"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
          <div className="p-2 mt-3">
            <p className="text-gray-800 font-medium">
              Popular beauty and personal care products for daily use. Lorem
              ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Link
              to="/blog"
              className="text-red-600 underline underline-offset-4 hover:text-red-800 mt-2 inline-block"
            >
              Read more
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Blogs;
