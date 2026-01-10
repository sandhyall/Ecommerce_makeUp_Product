import React, { useState } from "react";
import Validation from "../Component/Common/Validation";
import { CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";

const apiUrlS = import.meta.env.VITE_API_URLS;

const Contactus = () => {
  const initialForm = {
    name: "",
    email: "",
    message: "",
  };

  const [contact, setContact] = useState(initialForm);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = Validation(contact);
    if (Object.keys(validationError).length > 0) {
      setError(validationError);
      return;
    }

    try {
      const res = await axios.post(
        `${apiUrlS}/contact-insert`,
        contact
      );

      setSuccess(res.data.msg || "Message sent successfully");
      setError({});
      setContact(initialForm);
    } catch (err) {
      setSuccess("");
      setError({ submit: err.response?.data?.msg || "Contact Failed" });
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

          {success && <p className="text-green-600 mb-2">{success}</p>}
          {error.submit && (
            <p className="text-red-600 mb-2">{error.submit}</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contact.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            {error.name && <p className="text-red-500">{error.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={contact.email}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            {error.email && <p className="text-red-500">{error.email}</p>}

            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={contact.message}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            ></textarea>
            {error.message && (
              <p className="text-red-500">{error.message}</p>
            )}

            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded-md"
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
