import DashboardNavbar from "../../components/dashboard/DashboardNavbar";
import Sidebar from "../../components/dashboard/instructor/Sidebar";
import InstructorAssessmentR from "../../components/courses/InstructorAssessmentR";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InstructorAssessmentResultCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const authData = localStorage.getItem("auth");

      if (!authData) {
        navigate("/instructor/signin");
        return;
      }

      try {
        const { access_token } = JSON.parse(authData);

        if (!access_token) {
          navigate("/instructor/signin");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/auth/instructor/profile/",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (response.data && response.data.username) {
          setUsername(response.data.username);
          fetchCourses(response.data.username, access_token);
        } else {
          throw new Error("Username not found in response.");
        }
      } catch (err) {
        setError("Failed to retrieve user details. Please try again.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchCourses = async (username, token) => {
    if (!username) {
      setError("Invalid or missing username.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/instructor/view-submissions/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(response.data.courses || []);
    } catch (err) {
      setError("Failed to fetch assessments.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white">Loading Assessment Submission...</p>
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

  const filteredCourses = courses.filter((course) =>
    course.assignment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardNavbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          {/* Header Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Students Assessments Submissions
              </h1>
              <p className="text-gray-400">Your Assessment's Responses</p>
            </div>

            {/* Add New Course Button */}
            <button
              onClick={() => navigate("/instructor/assessments-management")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Assessment</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-8 flex">
            <input
              type="text"
              placeholder="Search assessment by subject name..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <InstructorAssessmentR key={course.id} {...course} />
              ))
            ) : (
              <p className="text-white">
                No Assessments found with your search.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
