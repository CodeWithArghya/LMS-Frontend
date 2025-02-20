import { useState, useEffect } from "react";
import { Send, Trash2 } from "lucide-react";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NoticeBoard() {
  const marqueeRef = useRef(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

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
          setUsername(response.data.username);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    } catch (error) {
      console.error("Error parsing auth data:", error);
    }
  }, []);
  const handleDelete = async (id) => {
    if (!token) {
      alert("Authorization token missing! Please log in again.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/instructor/class-delete/${username}/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correctly passing token
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Class deleted successfully!");
        navigate(0); // Refresh page after deletion
      } else {
        alert(`Error: ${response.data.msg || "Failed to delete class"}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!username || !token) return;

    const fetchClasses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/specificclasses/${username}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClasses(response.data.classes || []);
      } catch {
        setError("Failed to fetch classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [username, token]); // ✅ Re-run when username or token changes

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Loading Scheduled Classes...</p>
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
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        My scheduled Classes
      </h2>

      <marquee
        ref={marqueeRef}
        behavior="scroll"
        direction="up"
        scrollamount="3"
        onMouseOver={() => marqueeRef.current.stop()}
        onMouseOut={() => marqueeRef.current.start()}
        className="space-y-4 max-h-[calc(100vh-24rem)] overflow-hidden custom-scrollbar"
      >
        {classes.map((classes) => (
          <div
            key={classes.id}
            className="bg-gray-700/50 rounded-lg p-4 border-l-4 border-violet-500 group"
          >
            <div className="flex justify-between items-start gap-4">
              <p className="text-gray-200 break-words flex-1 text-sm">
                {classes.subjectName}
              </p>

              <p className="text-gray-200 break-words flex-1 text-sm">
                {classes.topic}
              </p>
              <a
                href={classes.joinLink}
                target="_blank"
                className="bg-indigo-500 px-4 py-2 rounded-lg text-white"
              >
                Attempt Class
              </a>
              <button
                onClick={() => handleDelete(classes.id)}
                className="bg-red-500 px-4 py-2 rounded-lg text-white"
              >
                Delete Class
              </button>
            </div>
            <span className="text-xs text-violet-400 block mt-2">
              {classes.datetime}
            </span>
            <span className="text-xs text-yellow-400 block mt-2">
              {classes.for_class}
            </span>
          </div>
        ))}
      </marquee>
    </div>
  );
}
