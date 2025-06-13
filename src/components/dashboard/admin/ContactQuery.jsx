import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactQueryMessage = () => {
  const [queries, setQueries] = useState([]); // Fixed: Renamed 'query' to 'queries' (array)
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

    const fetchQueries = async () => {
      try {
        const response = await axios.get(
          "http://13.204.77.147:8000/api/admin/display-contact-query/",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setQueries(response.data.query || []); // Fixed: Ensure it's always an array
      } catch (error) {
        setError(error.response?.data?.message || "Error fetching queries");
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
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
        `http://13.204.77.147:8000/api/admin/delete-query/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setQueries(queries.filter((query) => query.id !== id)); // Fixed: Remove deleted item from UI
        alert("Query deleted successfully!");
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
        Contact Query Details
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading queries..</p>
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
                <th className="py-3 px-4 text-left">Query Type</th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Submitted Date</th>
                <th className="py-3 px-4 text-left">Attachments</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query) => (
                <tr
                  key={query.id}
                  className="border-b border-gray-700 hover:bg-gray-800 transition"
                >
                  <td className="py-3 px-4">{query.fullname}</td>
                  <td className="py-3 px-4">{query.email}</td>
                  <td className="py-3 px-4">{query.contact}</td>
                  <td className="py-3 px-4 capitalize">{query.query_type}</td>
                  <td className="py-3 px-4">{query.message}</td>
                  <td className="py-3 px-4">{query.submitted_on}</td>
                  <td className="py-3 px-4">
                    {query.attachments ? (
                      <a
                        href={query.attachments}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-yellow-600 text-white px-3 py-1 rounded-2xl"
                      >
                        View Attachment
                      </a>
                    ) : (
                      "No Attachment"
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(query.id)}
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

export default ContactQueryMessage;
