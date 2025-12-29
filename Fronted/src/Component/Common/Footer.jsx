import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="md:w-1/2">
            <h1 className="text-pink-600 text-2xl font-bold mb-4">Sandhya</h1>
            <p className="text-white text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ab
              minus eius id harum eum itaque debitis corporis voluptate!
              Voluptatem quibusdam numquam placeat eaque recusandae.
            </p>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Help</h2>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Cancellation & Return
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Shipping & Delivery
                </a>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Quick links</h2>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <a href="#" className="hover:text-pink-500">
                  press
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  News Launchs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  CSR
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Shipping & Delivery
                </a>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
            <ul className="space-y-2 text-white text-sm">
              <li>
                <a href="#" className="hover:text-pink-500">
                  Makeup
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Facial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                 Fragrances
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Natural
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-white text-sm">
          @ 2025 Sandhya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
