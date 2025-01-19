import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="register-div">
      <div className="register-form-div">
        <h2>Login</h2>
        <form className="register-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoComplete="new-password"
          />
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
