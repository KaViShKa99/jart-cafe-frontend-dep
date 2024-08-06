import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { resetNewPassword } from "../../redux/reducers/passwordResetReducer";
import { Loader } from "rsuite";
import AlertBox from "../../components/AlertBox";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NewPasswordPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const query = useQuery();
  const token = query.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loginLoading) {
      timer = setTimeout(() => {
        setLoginLoading(false);
        navigate("/");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [loginLoading]);

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired token");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      valid = false;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      valid = false;
    }

    // dispatch(resetNewPassword({ token: token, newPassword: confirmPassword }));

    if (valid) {
      setLoading(true);
      axios
        .post(`${backendUrl}/password-reset/reset`, {
          token: token,
          newPassword: confirmPassword,
        })
        .then((response) => {
          setMessage("Password has been reset successfully");
          setLoading(false);
          setLoginLoading(true);

          AlertBox(
            "success",
            "Success",
            "Password has been reset successfully"
          );
        })
        .catch((error) => {
          setMessage("An error occurred");
          AlertBox("error", "Error", "An error occurred");
        });
    }
    setPassword("");
    setConfirmPassword("");
  };
  if (loginLoading) {
    return (
      <div className="loader-container">
        <Loader center size="lg" />
      </div>
    );
  }

  return (
    <div className="new-password-page">
      <div className="new-password-container">
        <div className="new-password-form-container">
          <form onSubmit={handleSubmit} className="new-password-form">
            <label className="new-password-page-heading">
              Reset Your Password
            </label>
            {/* <div className="form-group"> */}
            <div className="required-label-input-container">
              <label htmlFor="password">New Password</label>
              <input
                type="text"
                id="password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="required-label-input-container">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="button-container">
              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewPasswordPage;
