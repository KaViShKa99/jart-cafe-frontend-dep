import { useState, useEffect } from "react";
import axios from "axios";
import AlertBox from "../AlertBox";

const ForgotPassword = ({ close }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  const emailChange = (e) => {
    const email = e.target.value;
    console.log(email);
    setEmail(email);
  };

  useEffect(() => {
    console.log(email);
  }, [email]);

  const resetPassword = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!emailPattern.test(email)) {
      setEmailError("*Invalid email address");
      valid = false;
    }
    if (valid) {
      axios
        .post(`${backendUrl}/password-reset/request`, {
          email: email,
        })
        .then((response) => {
          console.log(response.data);
          // setMessage("Password has been reset successfully");
          //   setLoading(false);
          AlertBox("success", "Success", response.data);
        })
        .catch((error) => {
          console.log("Error:", error);
          AlertBox("error", "Error", error.data);

          //   setMessage("An error occurred");
        });
    }
  };

  return (
    <div>
      <form className="forgot-password-form" id="forgot-password-form">
        <label className="forgot-password-heading">RESET PASSWORD</label>
        <div className="required-label-input-container">
          <label>Email address</label>
          <input
            id="forgot-password-email"
            type="text"
            name="forgot-password-email"
            value={email}
            placeholder="Email"
            onChange={emailChange}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="button-container">
          <button className="create-account-btn" onClick={resetPassword}>
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
