import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function StudentReviewForm() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_name: "",
    parent_name: "",
    contact: "",
    email: "",
    review_message: "",
    rating: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
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
      await axios.post(
        "http://127.0.0.1:8000/api/student/feedback-submission/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Review/Feedback form submitted successfully.");
      toast.info("Thanks for your Review..");
      setTimeout(() => navigate("/"), 5000);
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
      <DashboardNavbar />

      <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-violet-400 mb-6">
          Review / Feedback form for Parents
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            placeholder="Enter Learner's / Student Full Name"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <input
            type="text"
            name="parent_name"
            value={formData.parent_name}
            onChange={handleChange}
            placeholder="Enter full name of the father/mother"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter 10 digits Contact number wwithout country code"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter valid Email id "
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />

          <textarea
            name="review_message"
            value={formData.review_message}
            onChange={handleChange}
            placeholder="Provide your review/feedback here"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />

          <div>
            <label className="block mb-1 font-medium">
              Your Overall Experience
            </label>
            <div className="flex justify-center space-x-1 mt-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index + 1)}
                  className={`text-2xl cursor-pointer ${
                    index < formData.rating
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={loadingSubmit}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-lg"
          >
            {loadingSubmit ? "SUbmitting Review..." : "Submit Review"}
          </button>
          <ToastContainer />
        </form>
        <hr></hr>
        <br></br>
        <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
          <marquee>
            <span className="text-green-500">
              After clicking Submit Button Wait for a seconds..
              <span className="text-yellow-400">
                Kindly Do not go back/refresh page.. Otherwise it may not submit
                your feedback/review successfully.
              </span>
            </span>
          </marquee>
        </div>
      </div>
    </>
  );
}
