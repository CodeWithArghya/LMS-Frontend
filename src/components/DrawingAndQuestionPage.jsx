import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DrawingCanvas from "./Sketch";
import Question from "./Question";
import ImageSlider from "./ImageSlider";

const DrawingAndQuestionPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", email: "" });

  useEffect(() => {
    // Fetch user details from auth/student/profile/
    const fetchUserProfile = async () => {
      const authData = localStorage.getItem("auth");

      if (!authData) {
        navigate("/student/signin");
        return;
      }

      try {
        const { access_token } = JSON.parse(authData); // Extract access_token

        if (!access_token) {
          navigate("/student/signin");
          return;
        }

        const response = await axios.get(
          "http://13.204.77.147:8000/auth/student/profile/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        setUserData({
          username: response.data.first_name || "Student",
          email: response.data.email || "",
        });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setUserData({ username: "Student", email: "" });
      }
    };

    fetchUserProfile();

    // Function to send user activity
    const sendUserActivity = async () => {
      if (!userData.email) return; // Avoid sending requests without user data

      const authData = localStorage.getItem("auth");
      if (!authData) return;

      const { access_token } = JSON.parse(authData);
      if (!access_token) return;

      try {
        await axios.post(
          "http://13.204.77.147:8000/api/user-activity/",
          {
            username: userData.username,
            email: userData.email,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error sending user activity notification:", error);
      }
    };

    // Handle tab close or switch
    const handleBeforeUnload = () => sendUserActivity();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendUserActivity();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userData, navigate]); // Dependency added to ensure updated user data

  return (
    <div className="flex h-screen">
      {/* Left Side - Drawing Canvas */}
      <div className="w-1/2 p-4 border-r border-gray-300">
        <p className="text-2xl font-bold text-center text-red-500">
          Draw Image Here
        </p>
        <DrawingCanvas />
      </div>

      {/* Right Side - Question Analysis */}
      <div className="w-1/2 p-4">
        <Question />
        <hr className="my-2 border-gray-400" />

        {/* Task Instructions */}
        <div className="overflow-hidden whitespace-nowrap">
          <p className="text-yellow-300 animate-marquee">
            Here is your task for today. Just see the below images and draw the
            same. Later, upload that image to generate questions & answers.
          </p>
        </div>

        <ImageSlider />
      </div>
    </div>
  );
};

export default DrawingAndQuestionPage;
