import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useAuth } from "../context/AuthContext";

import "../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...formData,
      appType: "ecommerce",
    };
    try {
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/signup",
        requestData,
        {
          headers: {
            projectID: "ulwb3huij7ys",
          },
        }
      );
      console.log(response.data);
      if (response.data.status === "success") {
        const { token } = response.data;
        const { user } = response.data.data;
        console.log("token", token);
        console.log("user", user);

        login(token, user);
        navigate("/");
      } else {
        setError("Registration failed!");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-div">
      <div className="register-form-div">
        <h2>Register</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            autoComplete="new-password"
          />
          <button type="submit">Register</button>
        </form>
        <div className="already-have-an-account">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
