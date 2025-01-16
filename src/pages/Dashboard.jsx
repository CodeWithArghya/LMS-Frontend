import React, { useEffect } from "react";
import axios from "axios";
import useUserActivityNotification from "../components/UserNoti";

export default function Dash() {
  useUserActivityNotification();

  const handleLogout = async (event) => {
    localStorage.removeItem("auth");

    // Redirect to the login page
    window.location.href = "/";
  };

  return (
    <div>
      <h2 className="text-center text-danger">Welcome to the UserAuth Demo</h2>

      <h4 className="text-center text-warning bg-dark m-2 p-3">
        <marquee>
          This is just a demo to check either JWT with React and Django Rest
          Frameworks are working perfectly or not
        </marquee>
      </h4>
      <hr></hr>
      <div className="text-center">
        <a className="btn btn-info m-3" href="/user/profile">
          Visit User Profile
        </a>

        <a onClick={handleLogout} className="btn btn-danger m-3">
          Logout
        </a>
      </div>
    </div>
  );
}
