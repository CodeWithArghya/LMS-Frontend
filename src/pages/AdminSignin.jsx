import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import Form from "../components/forms/Form";
import FormInput from "../components/forms/FormInput";

export default function AdminLogin() {
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
        "https://13.204.77.147:8000/auth/admin/login/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("auth", JSON.stringify(response.data));
      navigate("/pages/admin/admin-dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message || "Something went wrong.";
        toast.error(errorMessage);
      } else {
        toast.error("Network error or server not reachable.");
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Form
      title="Administration Login"
      buttonText="Sign In"
      linkText=""
      linkTo=""
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Username"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Enter username of admin"
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
