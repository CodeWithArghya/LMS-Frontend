import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InstructorAssessmentCard({
  id,
  topic,
  subject,
  deadline,
  for_class,
  created_at,
  content,
  description,
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
        .get("http://13.204.77.147:8000/auth/instructor/profile/", {
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
        `http://13.204.77.147:8000/api/instructor/delete-assignment/${username}/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly passing token
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Assessment deleted successfully!");
        navigate(0); // Refresh page after deletion
      } else {
        alert(`Error: ${response.data.msg || "Failed to delete Assessment"}`);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
      {/* Course Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">Topic: {topic}</h3>
        <p className="text-gray-400">Subject: {subject}</p>
        <p className="text-gray-400">For Class: {for_class}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">Description:</h3>
        <p className="text-gray-400">{description}</p>
        <p className="text-green-400">Created on: {created_at}</p>
        <p className="text-red-400">Deadline : {deadline}</p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between">
        <span className="bg-green-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-lg transition-all">
          <a href={content} target="_blank">
            View Assessment
          </a>
        </span>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition-all"
        >
          Delete Assessment
        </button>
      </div>
    </div>
  );
}
