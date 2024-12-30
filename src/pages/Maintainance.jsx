import React from "react";
import Coming from "../components/Comming";

export default function MaintainancePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          🚧 Site Under Maintenance 🚧
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Our site is currently undergoing maintenance. <br />
          Please try again later.
        </p>

        <h4 className="text-lg text-yellow-300 mb-4">
          Visit this page after: <br></br>
          <span className="text-blue-400 font-semibold">
            <Coming />
          </span>
        </h4>
        <p className="text-gray-500">
          Thank you for your patience while we improve our services!
        </p>
      </div>
    </div>
  );
}