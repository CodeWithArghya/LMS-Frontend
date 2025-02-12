import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Sidebar from "../../components/dashboard/student/Sidebar";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CourseCard({
  id,
  course_title,
  teacher_name,
  duration,
  coursethubmnail,
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={coursethubmnail}
        alt={course_title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {course_title}
        </h3>
        <p className="text-gray-400 mb-4">Instructor: {teacher_name}</p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-purple-400">{duration} hours</span>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full">
            <Link to={`/student/course-details/${id}`}>View</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/student/signin"); // Redirect to login if token is missing
    }
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/allcourses/");
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data.courses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Filter courses based on search and level
  const filteredCourses = courses.filter(
    (course) =>
      course.course_title.toLowerCase().includes(search.toLowerCase()) &&
      (levelFilter
        ? course.for_class.toLowerCase() === levelFilter.toLowerCase()
        : true)
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardNavbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Available Courses
            </h1>
            <p className="text-gray-400">
              Explore our wide range of courses and start learning today
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))
            ) : (
              <p className="text-white">No courses found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
