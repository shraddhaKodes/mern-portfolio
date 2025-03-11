import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/ResetPassword.css"; // Importing the CSS file

const ResetPassword = () => {
  const { token } = useParams();
  console.log("Extracted Token:", token); // Debugging

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password.trim() || !confirmPassword.trim()) {
      return toast.error("Please fill in both fields.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/user/password/reset/${token}`,
        { password, confirmPassword },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Password reset successful!");

      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <p className="instruction-text">Enter a new password for your account.</p>

        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className="reset-password-btn">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="back-to-login" onClick={() => navigate("/login")}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
