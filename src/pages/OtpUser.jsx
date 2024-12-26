import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Form from "../components/forms/Form";
import FormInput from "../components/forms/FormInput";
import { useSearchParams } from "react-router-dom";

export default function OtpUser() {
  const [otp, setOtp] = useState("");
  const [searchParams] = useSearchParams("");
  const email = searchParams.get("email");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email,
      otp,
    };

    try {
      // Make API call
      await axios.post("http://127.0.0.1:8000/auth/student/verify-otp/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("OTP Verified Successfully");
      navigate("/success");
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
      title="OTP Verification"
      buttonText="Verify OTP"
      linkText="Already have an account?"
      linkTo="/student/signin"
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Email Address"
        type="email"
        id="email"
        name="email"
        value={email}
        readonly
      />
      <FormInput
        label="Email OTP"
        type="text"
        id="otp"
        name="otp"
        value={otp}
        onChange={(event) => setOtp(event.target.value)}
        placeholder="Enter the otp received in email"
      />

      <ToastContainer />
    </Form>
  );
}
