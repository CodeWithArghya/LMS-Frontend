import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Form from "../components/forms/Form";
import FormInput from "../components/forms/FormInput";

export default function InstructorPasswordReset() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      email: email,
    };

    try {
      // Make API call
      const response = await axios.post(
        "http://13.204.77.147:8000/auth/student/password-reset/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Password has been Sent to your email");
      navigate("/instructor/signin");
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
    <>
      <Form
        title="Instructor Password Recovery"
        buttonText="Reset Password"
        linkText="Already have an account?"
        linkTo="/instructor/signin"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Username"
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter Your Registered Username e.g- INS... "
        />
        <FormInput
          label="Email Id"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your registered email-id"
        />

        <ToastContainer />
      </Form>
    </>
  );
}
