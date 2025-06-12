// NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import not from "../assets/not.png"; // Adjust the path as necessary
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4 hover:text-green-500">
        Error :: 404
      </h1>
      <div
        style={{
          width: "450px",
          height: "400px",
          border: "2px solid #ccc",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <img
          src={not}
          alt="404 Error"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <marquee>
        <p className="text-2xl text-indigo-800 font-bold mb-6 hover:text-red-500">
          Sorry!!! The page you are looking for does not exist or You have enter
          an invalid URL
        </p>
      </marquee>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
