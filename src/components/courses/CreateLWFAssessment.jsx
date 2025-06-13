import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateLWFAssessment() {
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
    title: "",
    instruction: "",
    image: null,
    created_at: null,
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
        "http://13.204.77.147:8000/api/instructor/create-lwf-assessment/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Assessment Created Successfully!");
      navigate("/instructor/instructor-dashboard/");
    } catch (error) {
      alert("Error creating Assessment:", error.response?.data || error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-violet-400 mb-6">
            Create Assessment for "Learn With Fun" Activity
          </h2>
          <label className="block">
            Give a funny & Attractive title for the assessment:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Write a Attractive Title"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <label className="block">Provide Instructions for Students:</label>
          <textarea
            name="instruction"
            value={formData.instruction}
            onChange={handleChange}
            placeholder="Instruction for Students (What they have to draw)"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />

          <label className="block">
            Task :: Releated Image to be created (It must be JPG/JPEG/PNG/BMP
            format & Image Size will be 800x400):
          </label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />

          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg"
          >
            {loadingSubmit ? "Creating, Please wait..." : "Create Assessment"}
          </button>
        </form>
        <hr></hr>

        <br></br>
        <button
          onClick={() =>
            (window.location.href = "/instructor/instructor-dashboard")
          }
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
