import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          email,
          password,
          appType: "ecommerce",
        },
        {
          headers: {
            projectID: "ulwb3huij7ys",
          },
        }
      );
      const { token } = response.data;
      const { user } = response.data.data;
      console.log("token", token);
      console.log("user", user);

      login(token, user);
      navigate("/");
    } catch (error) {
      console.log("Login error", error);
      setError("Invalid email or password!");
    }
  };
  return (
    <div className="register-div">
      <div className="register-form-div">
        <h2>Login</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
        <div className="already-have-an-account">
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
