import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateCourseForm() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/instructor/signin");
    }
  }, [navigate]);

  const [uploadedBy, setUploadedBy] = useState("");

  const [formData, setFormData] = useState({
    course_title: "",
    subject_name: "",
    for_class: "",
    duration: "",
    teacher_name: "",
    description: "",
    prerequites: "",
    course_outcomes: "",
    current_status: "Pending",
    coursethubmnail: null,
    classnote: null,
    coursecontent: null,
    courseassessment: null,
    uploaded_by: "",
  });

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
      .get("http://127.0.0.1:8000/auth/instructor/profile/", {
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
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, [e.target.name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
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

      await axios.post(
        "http://127.0.0.1:8000/api/instructor/create-course/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course Created Successfully!");
      navigate("/instructor/courses");
    } catch (error) {
      console.error("Error creating course:", error.response?.data || error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-violet-400 mb-6">
        Create a New Course
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="course_title"
          value={formData.course_title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <input
          type="text"
          name="subject_name"
          value={formData.subject_name}
          onChange={handleChange}
          placeholder="Subject Name"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <input
          type="text"
          name="for_class"
          value={formData.for_class}
          onChange={handleChange}
          placeholder="preprimary/primary/highschool"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (hours)"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <input
          type="text"
          name="teacher_name"
          value={formData.teacher_name}
          onChange={handleChange}
          placeholder="Teacher Name"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <textarea
          name="prerequites"
          value={formData.prerequites}
          onChange={handleChange}
          placeholder="Prerequisites"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <textarea
          name="course_outcomes"
          value={formData.course_outcomes}
          onChange={handleChange}
          placeholder="Course Outcomes"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
          required
        />
        <label className="block">Course Thumbnail (PNG only):</label>
        <input
          type="file"
          name="coursethubmnail"
          onChange={handleFileChange}
          className="text-white"
          required
        />
        <label className="block">Class Note (PDF only):</label>
        <input
          type="file"
          name="classnote"
          onChange={handleFileChange}
          accept="application/pdf"
          className="text-white"
        />
        <label className="block">Course Content (MP4 only):</label>
        <input
          type="file"
          name="coursecontent"
          onChange={handleFileChange}
          className="text-white"
        />
        <label className="block">Course Assessment if any (PDF only):</label>
        <input
          type="file"
          name="courseassessment"
          onChange={handleFileChange}
          accept="application/pdf"
          className="text-white"
        />
        <button
          type="submit"
          disabled={loadingSubmit}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg"
        >
          {loadingSubmit ? "Creating..." : "Create Course"}
        </button>
      </form>
      <hr></hr>
      <br></br>
      <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
        <marquee>
          <span className="text-green-500">
            After clicking Create Button Wait for a seconds..
            <span className="text-yellow-400">
              Kindly Do not go back/refresh page.. Otherwise it may not create
              the course successfully.
            </span>
          </span>
        </marquee>
      </div>
    </div>
  );
}
