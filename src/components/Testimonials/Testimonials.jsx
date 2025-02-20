import TestimonialCard from "./TestimonialCard";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Testimonials() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/allcourses/"
        );
        const fetchedCourses = response.data.courses || [];

        // Mapping API response to match TestimonialCard format
        const formattedCourses = fetchedCourses.map((course) => ({
          name: `Instructor : ${course.teacher_name}`,
          role: `for class: ${course.for_class}`, // Assuming all are instructors
          coursename: course.course_title,
          subject: `Subject : ${course.subject_name}`,
          outcomes: `Outcomes : ${course.course_outcomes}`,
          image: course.coursethubmnail || "https://via.placeholder.com/170",
        }));

        setCourses(formattedCourses);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (!courses.length) return;

    const scrollContainer = scrollRef.current;
    let animationFrameId;
    let scrollPosition = 0;
    const scrollSpeed = 1;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => cancelAnimationFrame(animationFrameId);
    const handleMouseLeave = () =>
      (animationFrameId = requestAnimationFrame(scroll));

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [courses]);

  if (loading)
    return <p className="text-white text-center">Loading courses...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const duplicatedCourses = [...courses, ...courses];

  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-16">
          Our Recent Courses
        </h2>
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="flex space-x-8 transition-transform duration-100"
            style={{ width: "fit-content" }}
          >
            {duplicatedCourses.map((course, index) => (
              <div key={index} className="w-[280px] md:w-[400px] flex-shrink-0">
                <TestimonialCard {...course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
