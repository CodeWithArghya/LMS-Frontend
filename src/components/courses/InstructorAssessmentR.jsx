import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InstructorAssessmentR({
  id,
  assignment,
  student,
  submitted_at,
  answer_file,
  status,
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

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col justify-between">
      {/* Course Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">{assignment}</h3>

        <p className="text-gray-400">
          Student ID: <span className="text-green-400">{student}</span>
        </p>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-white">Submitted on:</h3>
        <p className="text-gray-400">
          <span className="text-red-600 font-bold">{submitted_at}</span>
        </p>

        <p
          className={`inline-block mt-2 text-sm font-bold px-2 py-1 rounded transition-all ${
            status === "Submitted On Time"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-yellow-600 hover:bg-red-700 text-white"
          }`}
        >
          {status}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-center">
        <span className="bg-blue-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition-all">
          <a href={answer_file} target="_blank">
            View Student's Response
          </a>
        </span>
      </div>
    </div>
  );
}
