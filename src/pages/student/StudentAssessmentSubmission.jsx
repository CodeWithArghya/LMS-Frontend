import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useParams } from "react-router-dom";
export default function AssignmentSubmission() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/student/signin");
    }
  }, [navigate]);

  const [uploadedBy, setUploadedBy] = useState("");

  const [formData, setFormData] = useState({
    answer_file: null,
    submitted_at: null,
  });
  const { id } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/assessmentdetails/${id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch assessment details");
        }
        const data = await response.json();

        if (data.assessment) {
          setAssessment(data.assessment); // Correct key from API response
        } else {
          throw new Error("No assessment found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);
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
      .get("http://127.0.0.1:8000/auth/student/profile/", {
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
        `http://127.0.0.1:8000/api/student/assignments/${id}/submit/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Assessment Submitted Successfully!");
      navigate("/student/student-dashboard/");
    } catch (error) {
      alert("Error Submitting Assessment:", error.response?.data || error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-violet-400 mb-6">
            Submit Assessment
          </h2>

          <label className="block">
            Upload Answer of Assignment{" "}
            <span className="text-red-500">
              ***(JPEG/JPG/PDF/WORD within 1MB)
            </span>
          </label>
          <input
            type="file"
            name="answer_file"
            onChange={handleFileChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />

          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg"
          >
            {loadingSubmit ? "Submitting, Please wait..." : "Submit Assignment"}
          </button>
        </form>
        <hr></hr>

        <br></br>
        <button
          onClick={() => (window.location.href = "/student/student-dashboard")}
          className="w-full bg-red-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg"
        >
          Back to Dashboard
        </button>

        <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
          <marquee>
            <span className="text-green-500">
              After clicking Create Button Wait for a seconds..
              <span className="text-yellow-400">
                Kindly Do not go back/refresh page.. Otherwise it may not create
                the Assessment successfully. Note:: Your Assesssment will be
                deleted automatically after 3 Days from the date of creation.
              </span>
            </span>
          </marquee>
        </div>
      </div>
    </>
  );
}
