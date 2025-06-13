import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Sidebar from "../components/dashboard/instructor/Sidebar";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function InstructorCourseEdit() {
  const { id } = useParams();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  const [uploadedBy, setUploadedBy] = useState("");
  const [formData, setFormData] = useState({
    course_title: "",
    subject_name: "",
    for_class: "",
    duration: "",
    description: "",
    teacher_name: "",
    current_status: "Pending",
    prerequites: "",
    course_outcomes: "",
    coursecontent: "",
    coursethubmnail: "",
    classnote: "",
    courseassessment: null,
    uploaded_by: "", // Auto-filled with instructor's username
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (!authData) {
      console.error("Auth data not found!");
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

    axios
      .get("http://13.204.77.147:8000/auth/instructor/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUploadedBy(response.data.username);
        setFormData((prev) => ({
          ...prev,
          uploaded_by: response.data.username,
        }));
      })
      .catch((error) => console.error("Error fetching profile:", error));

    // Fetch Course Details
    axios
      .get(`http://13.204.77.147:8000/api/inscoursedetails/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Fetched Course Data:", response.data);
        if (response.data.course) {
          setFormData(response.data.course);
        } else {
          throw new Error("No course data found");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Get authentication token from localStorage
      const authData = localStorage.getItem("auth");
      let token = null;
      if (authData) {
        try {
          const parsedAuth = JSON.parse(authData);
          token = parsedAuth.access_token;
        } catch (error) {
          console.error("Error parsing auth data:", error);
        }
      }

      if (!token) {
        toast.error("Authentication failed. Please log in again.");
        navigate("/student/signin");
        return;
      }

      await axios.put(
        `http://13.204.77.147:8000/api/coursemodify/${uploadedBy}/${id}/`, // Use `username` from state
        formDataToSend,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Course updated successfully!");
      navigate(`/instructor/instructor-dashboard`);
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Failed to update course.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Course Not Found
          </h1>
          <p className="text-gray-400">{error}</p>
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
          <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Edit Course Details
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="course_title"
                  value={formData.course_title || ""}
                  onChange={handleChange}
                  placeholder="Course Title"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />

                <input
                  type="text"
                  name="subject_name"
                  value={formData.subject_name || ""}
                  onChange={handleChange}
                  placeholder="Subject Name"
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  required
                />
              </div>

              <textarea
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />

              <input
                type="text"
                name="teacher_name"
                value={formData.teacher_name || ""}
                onChange={handleChange}
                placeholder="Instructor Name"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
              <input
                readOnly
                type="text"
                name="current_status"
                value="Pending"
                onChange={handleChange}
                placeholder="Current Status"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                name="for_class"
                value={formData.for_class || ""}
                onChange={handleChange}
                placeholder="primary/preprimary/highschool"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />

              <input
                type="text"
                name="duration"
                value={formData.duration || ""}
                onChange={handleChange}
                placeholder="Course Duration (in hours)"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                name="prerequites"
                value={formData.prerequites || ""}
                onChange={handleChange}
                placeholder="Course prerequites (if any)"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
              <input
                type="text"
                name="course_outcomes"
                value={formData.course_outcomes || ""}
                onChange={handleChange}
                placeholder="Course course_outcomes (if any)"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                required
              />
              <h3 className="text-white mt-4">Upload New Course Thumbnail</h3>
              <input
                type="file"
                name="coursethubmnail"
                onChange={handleFileChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />

              <h3 className="text-white mt-4">Upload Course Notes</h3>
              <input
                type="file"
                name="classnote"
                onChange={handleFileChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              <h3 className="text-white mt-4">Upload New Course Video </h3>
              <input
                type="file"
                name="coursecontent"
                onChange={handleFileChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              <h3 className="text-white mt-4">Upload Assignments(if any)</h3>
              <input
                type="file"
                name="courseassessment"
                onChange={handleFileChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />

              <button
                type="submit"
                disabled={loadingSubmit}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg"
              >
                {loadingSubmit ? "Updating, Please Wait..." : "Update Course"}
              </button>
            </form>
            <hr></hr>
            <br></br>
            <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
              <marquee>
                <span className="text-green-500">
                  After clicking Update Button Wait for a seconds..
                  <span className="text-yellow-400">
                    Kindly Do not go back/refresh page.. Otherwise it may not
                    update the course successfully.
                  </span>
                </span>
              </marquee>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
