import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Sidebar from "../components/dashboard/student/Sidebar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookOpen, Download, Video } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/coursedetails/${id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }
        const data = await response.json();

        if (data.course) {
          setCourse(data.course); // Correct key from API response
        } else {
          throw new Error("No course data found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/student/signin"); // Redirect to login if token is missing
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Course Not Found
          </h1>
          <p className="text-gray-400">
            {error || "The course you're looking for doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardNavbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Video Player Section */}
            <div className="bg-gray-800 rounded-lg overflow-hidden p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Video className="w-6 h-6 text-purple-400" /> Course Video
              </h2>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                {course.coursecontent ? (
                  <ReactPlayer
                    url={course.coursecontent}
                    controls
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <p className="text-gray-400 p-4">
                    No video available for this course.
                  </p>
                )}
              </div>
            </div>

            {/* Course Information */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h1 className="text-3xl font-bold text-white mb-2">
                {course.course_title}
              </h1>
              <p className="text-gray-400 mb-2">{course.subject_name}</p>
              <p className="text-gray-400 mb-4">
                {course.for_class} | {course.duration} Hours
              </p>
              <p className="text-gray-400 mb-4">{course.description}</p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Instructor</p>
                    <p className="text-white font-medium">
                      {course.teacher_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prerequisites & Outcomes */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Prerequisites
              </h2>
              <p className="text-gray-400">{course.prerequites}</p>

              <h2 className="text-2xl font-semibold text-white mt-6 mb-4">
                Course Outcomes
              </h2>
              <p className="text-gray-400">{course.course_outcomes}</p>
            </div>

            {/* Thumbnail */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Download className="w-6 h-6 text-purple-400" /> Course Notes &
                References/Assignments
              </h2>
              <div className="space-y-4">
                {/* Class Notes PDF Viewer */}
                {course.classnote ? (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <span className="text-gray-300 block mb-2">
                      Course Notes
                    </span>
                    <iframe
                      src={course.classnote}
                      width="100%"
                      height="500px"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                ) : (
                  <p className="text-gray-400">No class notes available.</p>
                )}

                {/* Course Assessment PDF Viewer */}
                {course.courseassessment ? (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <span className="text-gray-300 block mb-2">
                      Course Assignment
                    </span>
                    <iframe
                      src={course.courseassessment}
                      width="100%"
                      height="500px"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                ) : (
                  <p className="text-red-500 flex items-center justify-between bg-gray-700 p-4 rounded-lg">
                    No Assignment Found for this course, Check Later
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
