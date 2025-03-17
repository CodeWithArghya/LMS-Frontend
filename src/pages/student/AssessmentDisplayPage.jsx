import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Sidebar from "../../components/dashboard/student/Sidebar";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AssessmentCard({
  id,
  content,
  topic,
  subject,
  deadline,
  created_at,
  description,
  for_class,
}) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-semibold text-white">
          Topic :: <span className="text-green-500">{topic}</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
          <div>
            <span className="font-semibold text-yellow-400">Subject:</span>{" "}
            {subject}
          </div>
          <div>
            <span className="font-semibold text-purple-400">For Class:</span>{" "}
            <span className="text-orange-400">{for_class}</span>
          </div>
          <div>
            <span className="inline-block mt-2 text-sm font-bold px-2 py-1 rounded transition-all bg-red-600 hover:bg-yellow-200 text-white">
              Deadline:
            </span>{" "}
            {deadline}
          </div>
          <div>
            <span className="inline-block mt-2 text-sm font-bold px-2 py-1 rounded transition-all bg-green-600 hover:bg-green-700 text-white">
              Posted on:
            </span>{" "}
            {created_at}
          </div>
        </div>
        <div>
          <span className="font-semibold text-yellow-400">Instruction:</span>{" "}
          {description}
        </div>

        <div className="flex justify-center">
          <a
            href={content}
            target="_blank"
            className="bg-purple-600 text-white px-2 py-2 rounded-full hover:bg-purple-700 transition"
          >
            Download Assessment
          </a>
        </div>
        <div className="flex justify-center">
          <Link
            to={`/student/submit-assessment/${id}`}
            className="bg-green-600 text-white px-2 py-2 rounded-full hover:bg-red-700 transition"
          >
            Submit Assessment
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentDisplayPage() {
  const [assessments, setAssessments] = useState([]);
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
        const response = await fetch(
          "http://127.0.0.1:8000/api/student/display-assignments/"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setAssessments(data.assessments);
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
        <p className="text-white">Loading Assessments...</p>
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
  const filteredCourses = assessments.filter(
    (course) =>
      course.subject.toLowerCase().includes(search.toLowerCase()) &&
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
              Available Assessments
            </h1>
            <p className="text-gray-400">
              Explore all assessments, upload your assessments withing deadline
              mentioned.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search Assessments by Subject Name (e.g- Math, English etc..)"
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <AssessmentCard key={course.id} {...course} />
              ))
            ) : (
              <p className="text-white">No Assessments found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
