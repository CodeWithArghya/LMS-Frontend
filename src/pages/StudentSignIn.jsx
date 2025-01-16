import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Form from "../components/forms/Form";
import FormInput from "../components/forms/FormInput";

export default function StudentSignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    try {
      // Make API call
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/student/login/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/dash");
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
      title="Student Sign In"
      buttonText="Sign In"
      linkText="Don't have an account?"
      linkTo="/student/signup"
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Username"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter Your Username"
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
      <ToastContainer />
    </Form>
  );
}
