import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/get-started"); // Navigate to the login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-purple-500 mb-4">🎉 Success!</h1>
        <p className="text-lg text-gray-300 mb-6">
          Your account has been verified and created successfully. <br />
          You can now log in to your account.
        </p>
        <button
          onClick={handleLoginRedirect}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default Success;
