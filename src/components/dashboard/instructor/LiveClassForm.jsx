import { useState, useEffect } from "react";
import TimePicker from "../../common/TimePicker/TimePicker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function LiveClassForm() {
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/instructor/signin");
    }
  }, [navigate]);
  const [teacher, setTeacher] = useState("");
  const [formData, setFormData] = useState({
    subjectName: "",
    duration: "",
    topic: "",
    datetime: "",
    for_class: "",
    joinLink: "",
    teacher: "",
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
        setTeacher(response.data.username);
        setFormData((prev) => ({
          ...prev,
          teacher: response.data.username,
        }));
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

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
        "http://13.204.77.147:8000/api/instructor/create-class/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Live Class Sechudled Successfully!");
      navigate("/instructor/instructor-dashboard");
    } catch (error) {
      console.error("Error creating course:", error.response?.data || error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Schedule Live Class
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="subjectName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
            placeholder="Enter subject name"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Class Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
              placeholder="e.g., 1 hour"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
            placeholder="Enter class topic"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="datetime"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              For Class
            </label>
            <input
              type="text"
              id="class"
              name="for_class"
              value={formData.for_class}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
              placeholder="Enter class like- 1, preprimary,2 etc..."
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="joinLink"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Join Link
          </label>
          <input
            type="url"
            id="joinLink"
            name="joinLink"
            value={formData.joinLink}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-white text-sm"
            placeholder="Enter meeting link"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loadingSubmit}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-lg transition-colors text-sm"
        >
          {loadingSubmit
            ? "Scheduling Class, Please wait..."
            : "Schedule Class"}
        </button>
      </form>
    </div>
  );
}
