import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = React.useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://13.204.77.147:8000/api/student/displaylwfassessment/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setAssessments(result.assessments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!assessments.length)
    return (
      <p className="text-center text-gray-500">No assessments available</p>
    );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <Slider ref={sliderRef} {...settings}>
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
          >
            <img
              src={assessment.image}
              alt={assessment.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-4 text-center">
              {assessment.title}
            </h2>
            <p className="text-gray-600 mt-2 text-center">
              {assessment.instruction}
            </p>
          </div>
        ))}
      </Slider>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
          onClick={() => sliderRef.current.slickPrev()}
        >
          Previous Image
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={() => sliderRef.current.slickNext()}
        >
          Next Image
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
