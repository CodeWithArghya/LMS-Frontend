import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InstructorCourseCard({
  id,
  course_title,
  subject_name,
  coursethubmnail,
  for_class,
  current_status,
  uploaded_by,
}) {
  const [formData, setFormData] = useState({});
  const [username, setUploadedBy] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      console.error("Auth data not found!");
      return;
    }

    try {
      const parsedAuth = JSON.parse(authData);
      setToken(parsedAuth.access_token); // Save token for later use

      axios
        .get("http://127.0.0.1:8000/auth/instructor/profile/", {
          headers: { Authorization: `Bearer ${parsedAuth.access_token}` },
        })
        .then((response) => {
          setUploadedBy(response.data.username);
          setFormData((prev) => ({
            ...prev,
            uploaded_by: response.data.username,
          }));
        })
        .catch((error) => console.error("Error fetching profile:", error));
    } catch (error) {
      console.error("Error parsing auth data:", error);
    }
  }, []);

  const handleDelete = async () => {
    if (!token) {
      alert("Authorization token missing! Please log in again.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/deletecourse/${username}/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly passing token
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Course deleted successfully!");
        navigate(0); // Refresh page after deletion
      } else {
        alert(`Error: ${response.data.msg || "Failed to delete course"}`);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
      {/* Course Thumbnail */}
      <img
        src={coursethubmnail}
        alt={course_title}
        className="w-full h-40 object-cover rounded-md"
      />

      {/* Course Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">{course_title}</h3>
        <p className="text-gray-400">Subject: {subject_name}</p>
        <p className="text-gray-400">Class: {for_class}</p>
        <p
          className={`inline-block mt-2 text-sm font-bold px-2 py-1 rounded transition-all ${
            current_status === "Approved"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-yellow-600 hover:bg-red-700 text-white"
          }`}
        >
          {current_status}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <span className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-lg transition-all">
          <Link to={`/instructor/course-details/${id}`}>View Details</Link>
        </span>
        <span className="bg-green-600 hover:bg-yellow-700 text-white text-sm px-3 py-1 rounded-lg transition-all">
          <Link to={`/instructor/course-editform/${id}`}>Edit Course</Link>
        </span>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition-all"
        >
          Delete Course
        </button>
      </div>
    </div>
  );
}
