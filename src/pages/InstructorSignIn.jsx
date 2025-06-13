import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Form from "../components/forms/Form";
import FormInput from "../components/forms/FormInput";

export default function InstructorSignIn() {
  const navigate = useNavigate("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      // Make API call
      const response = await axios.post(
        "http://13.204.77.147:8000/auth/instructor/login/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/instructor/instructor-dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        toast.error(errorMessage);
        console.error("API Error:", error.response.data);
      } else {
        toast.error("Network error or server not reachable.");
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Form
      title="Instructor Sign In"
      buttonText="Sign In"
      linkText="Don't have an account?"
      linkTo="/instructor/signup"
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Username"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter your Username"
      />
      <FormInput
        label="Password"
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Enter your password"
      />
      <div className="text-right mt-2">
        <Link
          to="/instructor/forgot-password"
          className="text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <ToastContainer />
    </Form>
  );
}
