import DashboardNavbar from "../DashboardNavbar";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CourseCard({
  id,
  course_title,
  subject_name,
  for_class,
  duration,
  teacher_name,

  prerequites,
  course_outcomes,
  current_status,
  coursethubmnail,
  classnote,
  coursecontent,
  courseassessment,
  uploaded_by,

  handleReject,
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
        <h4 className="text-xl font-semibold text-yellow-300 mb-2">
          Subject:- {subject_name}
        </h4>
        <p className="text-gray-400 mb-4">
          Instructor: {teacher_name}{" "}
          <span className="text-red-400">ID: {uploaded_by}</span>
        </p>
        <p className="text-indigo-400 mb-4">For Class: {for_class}</p>
        <p className="text-red-400 mb-4">Course Outcomes: {course_outcomes}</p>
        <p className="text-gray-400 mb-4">Pre requests: {prerequites}</p>
        <span className="text-red-400">Current Status : {current_status} </span>
        <p className="text-green-400">Duration : {duration} hours</p>
        <div className="flex justify-between items-center text-sm">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full">
            <a target="_blank" href={coursethubmnail}>
              Thumbnail
            </a>
          </span>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full">
            <a target="_blank" href={classnote}>
              Notes
            </a>
          </span>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full">
            <a target="_blank" href={coursecontent}>
              Video
            </a>
          </span>
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full">
            <a target="_blank" href={courseassessment}>
              Assessment
            </a>
          </span>
        </div>
        <div className="flex justify-between items-center text-sm p-2">
          <span className="bg-red-600 text-white px-3 py-1 rounded-bl">
            <button onClick={() => handleReject(id)}>Reject Course</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ApproveCoursesPageAdmin() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      console.error("Auth data not found!");
      navigate("/pages/admin/admin-login"); // Redirect if no auth data
      return;
    }

    let token = null;
    try {
      const parsedAuth = JSON.parse(authData);
      token = parsedAuth.access_token;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      navigate("/pages/admin/admin-login"); // Redirect on parse error
      return;
    }

    axios
      .get("http://127.0.0.1:8000/auth/admin/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        navigate("/pages/admin/admin-login"); // Redirect on fetch error
      });
  }, [navigate]);

  useEffect(() => {
    if (!username) return; // Wait until username is set

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const authData = localStorage.getItem("auth");
        if (!authData) throw new Error("Auth data missing!");

        const token = JSON.parse(authData).access_token;
        const response = await axios.get(
          `http://127.0.0.1:8000/api/admin/display-approved-courses/${username}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setCourses(response.data.courses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [username]);

  const handleReject = async (id) => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      alert("Unauthorized! Please log in again.");
      return;
    }

    let token;
    try {
      token = JSON.parse(authData).access_token;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return;
    }

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/admin/reject-course/${username}/${id}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Course Rejected Successfully!");
      window.location.reload();
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id
            ? {
                ...course,
                current_status: "Rejected",
              }
            : course
        )
      );
    } catch (error) {
      console.error("Error approving course:", error);
      alert("Failed to Reject course.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Loading approved courses...</p>
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
              Approved Courses Lists
            </h1>
            <p className="text-gray-400">
              Verify Course & Details before Reject (** Only Approved Courses
              will be displayed to Student Portal)
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search courses based on Course Title..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  handleReject={handleReject}
                />
              ))
            ) : (
              <p className="text-white">No approved courses found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
