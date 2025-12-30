import React, { useState } from "react";
import Validation from "../Component/Common/Validation";
import { CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";

const Contactus = () => {
  const forms = {
    name: "",
    Email: "",
    Message: "",
  };

  const [contact, setContact] = useState(forms);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = Validation(contact);
    setError(validationError);

    if (Object.keys(validationError).length === 0) {
      console.log("Form submitted successfully:", contact);
      setContact(forms);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Get In Touch With Us Now!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <CiPhone className="text-xl mt-1" />
            <div>
              <p className="font-medium">Phone Number</p>
              <p className="text-gray-600">+977 9766545136</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MdOutlineEmail className="text-xl mt-1" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-gray-600">sandhya@gmail.com</p>
            </div>
          </div>

          
        </div>

      
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contact.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {error.name && <p className="text-red-500">{error.name}</p>}

            <input
              type="email"
              name="Email"
              placeholder="Your Email"
              value={contact.Email}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {error.Email && <p className="text-red-500">{error.Email}</p>}

            <textarea
              name="Message"
              rows="4"
              placeholder="Your Message"
              value={contact.Message}
              onChange={handleChange}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
            {error.Message && <p className="text-red-500">{error.Message}</p>}

            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-yellow-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
