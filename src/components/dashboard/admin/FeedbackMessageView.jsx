import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeedbackDisplay = () => {
  const [feedback, setFeedback] = useState([]); // Fixed: Renamed 'query' to 'queries' (array)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      console.error("Auth data not found!");
      setLoading(false);
      return;
    }

    let token = null;
    try {
      const parsedAuth = JSON.parse(authData);
      token = parsedAuth.access_token;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      setLoading(false);
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/view-feedback/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFeedback(response.data.feedback || []); // Fixed: Ensure it's always an array
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching feedbacks");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      alert("Authorization token missing! Please log in again.");
      return;
    }

    let token = null;
    try {
      const parsedAuth = JSON.parse(authData);
      token = parsedAuth.access_token;
    } catch (error) {
      console.error("Error parsing auth data:", error);
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/delete-feedback/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFeedback(feedback.filter((feedback) => feedback.id !== id)); // Fixed: Remove deleted item from UI
        alert("Feedback deleted successfully!");
      } else {
        alert(`Error: ${response.data.msg || "Failed to delete query"}`);
      }
    } catch (error) {
      console.error("Error deleting query:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-violet-500 mb-6">
        User Feedback / Review
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading feedbacks..</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                <th className="py-3 px-4 text-left">Full Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Review Message</th>
                <th className="py-3 px-4 text-left">Submitted Date</th>
                <th className="py-3 px-4 text-left">User Rating</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedback.map((feedback) => (
                <tr
                  key={feedback.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-4">{feedback.student_name}</td>
                  <td className="py-3 px-4">{feedback.email}</td>
                  <td className="py-3 px-4">{feedback.contact}</td>

                  <td className="py-3 px-4">{feedback.review_message}</td>
                  <td className="py-3 px-4">{feedback.submitted_at}</td>
                  <td className="py-3 px-4">{feedback.rating} / 5</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(feedback.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Fixed: Centered button below the table */}
          <div className="mt-4 text-center">
            <a
              className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-all inline-block"
              href="/pages/admin/admin-dashboard"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;
