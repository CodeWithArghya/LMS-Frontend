import React from "react";
import { useEffect } from "react";
import DrawingCanvas from "./Sketch";
import Question from "./Question";
import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";

const DrawingAndQuestionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/student/student-dashboard");
    }
  }, [navigate]);
  return (
    <>
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
          <hr></hr>
          <marquee>
            <p className="text-yellow-300">
              Here is your task for today. Just see the below images and draw
              the sme and later upload that image to generate question & answers
            </p>
          </marquee>
          <ImageSlider />
        </div>
        <br></br>
      </div>
    </>
  );
};

export default DrawingAndQuestionPage;
