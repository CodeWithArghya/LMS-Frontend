import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function InstrucotrPasswordChange() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/instructor/signin");
    }
  }, [navigate]);

  const [username, setUsername] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    npass: "",
    cpass: "",
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
        setUsername(response.data.username);
        setFormData((prev) => ({
          ...prev,
        }));
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      const response = await axios.post(
        `http://13.204.77.147:8000/auth/student/change-password/${username}/`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Password changed successfully!");
      setTimeout(() => navigate("/instructor/instructor-dashboard"), 4000);
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else {
        toast.error("Network error or server not reachable.");
      }
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-violet-400 mb-6">
            Change Your Password
          </h2>
          <p className="text-center bg-slate-900 text-red-500">
            After Password Recovery, It's recomended to change password for
            security reason.
          </p>
          <label className="block">Current Password</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Your Current Password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <label className="block">New Password</label>
          <input
            type="password"
            name="npass"
            value={formData.npass}
            onChange={handleChange}
            placeholder="Enter New Password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <label className="block">Confirm Password</label>
          <input
            type="text"
            name="cpass"
            value={formData.cpass}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />

          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full bg-green-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg"
          >
            {loadingSubmit
              ? "Changing Password, Please wait..."
              : "Change Password"}
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
              After clicking Change Button Wait for a seconds..
              <span className="text-yellow-400">
                Kindly Do not go back/refresh page.. Otherwise it may not change
                the password properly.
              </span>
            </span>
          </marquee>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
