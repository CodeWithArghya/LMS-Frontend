import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentView = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/admin/view-students/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStudents(response.data.registeredstudents || []);
        setFilteredStudents(response.data.registeredstudents || []);
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching student data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filtered = students.filter(
      (student) =>
        student.first_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        student.last_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

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
        `http://127.0.0.1:8000/api/admin/delete-student/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Student deleted successfully!");
        setStudents(students.filter((student) => student.id !== id));
        setFilteredStudents(
          filteredStudents.filter((student) => student.id !== id)
        );
      } else {
        alert(`Error: ${response.data.msg || "Failed to delete Student"}`);
      }
    } catch (error) {
      console.error("Error deleting Student:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-violet-500 mb-6">
        Registered Student Details
      </h2>
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by First or Last Name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/3 p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading students...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">First Name</th>
                <th className="py-3 px-6 text-left">Last Name</th>
                <th className="py-3 px-6 text-left">Remove Student</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-6">{student.username}</td>
                    <td className="py-3 px-6">{student.email}</td>
                    <td className="py-3 px-6">{student.first_name}</td>
                    <td className="py-3 px-6">{student.last_name}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition-all"
                      >
                        Remove Student
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-400">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <a
            className="bg-green-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition-all"
            href="/pages/admin/admin-dashboard"
          >
            Back to Dashboard
          </a>
        </div>
      )}
    </div>
  );
};

export default StudentView;
