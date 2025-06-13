import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Form from "../components/forms/Form";
import FormInput from "../components/forms/FormInput";

export default function StudentSignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    // Check if passwords match
    if (pass !== cpass) {
      toast.error("Passwords do not match.");
      return;
    }
    event.preventDefault();
    const data = {
      username: username,
      email: email,
      first_name: firstname,
      last_name: lastname,
      password: pass,
      password2: cpass,
    };

    try {
      // Make API call
      await axios.post(
        "http://13.204.77.147:8000/auth/student/register/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("User Registered Successfully. Now Verify Your Account");
      navigate(`/otp-verify?email=${email}`);
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
      title="Student Sign Up"
      buttonText="Sign Up"
      linkText="Already have an account?"
      linkTo="/student/signin"
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Username"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="STD ******** (use prefix like this)"
      />
      <FormInput
        label="Email Address"
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
      />
      <FormInput
        label="First Name"
        type="text"
        id="firstname"
        name="first_name"
        value={firstname}
        onChange={(event) => setFirstName(event.target.value)}
        placeholder="Enter your first name"
      />
      <FormInput
        label="Last Name"
        type="text"
        id="lastname"
        name="last_name"
        value={lastname}
        onChange={(event) => setLastName(event.target.value)}
        placeholder="Enter your last name"
      />
      <FormInput
        label="Password"
        type="password"
        id="password"
        name="pass"
        value={pass}
        onChange={(event) => setPass(event.target.value)}
        placeholder="Create a password"
      />
      <FormInput
        label="Confirm Password"
        type="password"
        id="password2"
        name="cpass"
        value={cpass}
        onChange={(event) => setCpass(event.target.value)}
        placeholder="Confirm your password"
      />
      <ToastContainer />
    </Form>
  );
}
