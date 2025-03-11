import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRequest, loginSuccess, loginFailed , login } from "../store/slices/userSlice";
import "../styles/Login.css"; // Importing the updated CSS file

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  useEffect(() => {
    document.body.classList.add("login-body");
    return () => document.body.classList.remove("login-body");
  }, []);

  const handleSubmit = (e) => {
    console.log("Login");
    e.preventDefault();
    dispatch(login(email, password)); // Dispatch the login action from Redux
    navigate("/");
  };

  return (
    <div className="Login_con">
      <div className="login-page">
        <div className="login-container glassmorphic">
          <h2 className="login-title">Welcome Back</h2>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            {/* Forgot Email Link */}
            <p className="forgot-email" onClick={() => navigate("/password/forgot")}>
              Forgot Email?
            </p>

            <button type="submit" disabled={loading} className="login-button">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Background Image Section */}
      <div
        className="img_con"
        style={{
          backgroundImage: 'url("/login_inner.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
    </div>
  );
};

export default Login;
