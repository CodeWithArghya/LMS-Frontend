import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CommonContactForm() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    query_type: "",
    contact: "",
    email: "",
    message: "",
    attachments: null,
  });

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
      await axios.post(
        "http://13.204.77.147:8000/api/general/contactform-submission/",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Your Query have been submitted successfully.");
      toast.info("Admin will contact with you soon through E-mail..");
      setTimeout(() => navigate("/"), 6000);
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
        <h2 className="text-2xl font-bold text-center text-violet-400 mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
          <select
            name="query_type"
            value={formData.query_type}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          >
            <option value="" disabled>
              Select Query Type
            </option>
            <option value="generalquery">General Query</option>
            <option value="report">Report</option>
            <option value="help">Help/Support</option>
          </select>

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
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your query/message here"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />

          <div>
            <label className="block">
              Upload Attachments, if any (** PDF/JPG/JPEG within 2 MB):
            </label>
            <input
              type="file"
              name="attachments"
              onChange={handleFileChange}
              className="text-white"
            />
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
