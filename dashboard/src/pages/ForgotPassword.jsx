import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { forgotPassword, clearAllForgotResetPassErrors } from "../store/slices/forgotResetPasswordSlice";
import "../styles/ForgotPassword.css"; // ✅ Import CSS file

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Define navigate
  const { loading, message, error } = useSelector((state) => state.forgotPassword);
  
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return alert("Please enter your email.");
    dispatch(forgotPassword(email));
  };

  const handleClearErrors = () => {
    dispatch(clearAllForgotResetPassErrors());
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p className="instruction-text">Enter your email to receive a password reset link.</p>
        
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <button type="submit" disabled={loading} className="forgot-password-btn">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="back-to-login" onClick={() => navigate("/login")}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
