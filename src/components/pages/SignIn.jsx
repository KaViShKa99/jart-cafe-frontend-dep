import { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "rsuite";
import AlertBox from "../AlertBox";

const SignIn = ({ openSignup, openForogotpwd, openDropDown, close }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loginLoading) {
      timer = setTimeout(() => {
        setLoginLoading(false);
        close(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [loginLoading, close]);

  const emailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError("");
  };

  const passwordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setPasswordError("");
  };

  const loginBtn = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!emailPattern.test(email)) {
      setEmailError("*Invalid email address");
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError("*Password must be at least 8 characters long");
      valid = false;
    }

    if (valid) {
      setLoginLoading(true);

      try {
        const response = await axios.post(`${backendUrl}/user/authenticate`, {
          email: email,
          password: password,
        });

        console.log("Response:", response);
        const token = response.data.jwtToken;
        localStorage.setItem("jwtToken", token);
        fetchUserProfile(token);
        setEmail("");
        setPassword("");
        openDropDown(true);
      } catch (error) {
        AlertBox("error", "Error", error.response.data);
        console.log("Error:", error.response.data);
      }
    }
  };

  const openForgotPassword = (e) => {
    e.preventDefault();
    openForogotpwd(true);
  };
  const openSignUp = (e) => {
    e.preventDefault();
    openSignup(true);
  };

  const fetchUserProfile = (token) => {
    console.log(token);
    axios
      .get(`${backendUrl}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        response.data;
        console.log(response.data);
        // setProfileDetails(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        // Handle token expiry or invalid token
        localStorage.removeItem("jwtToken");
      });
  };

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [email, password]);

  if (loginLoading) {
    return (
      <div className="loader-container">
        <Loader center size="lg" />
      </div>
    );
  }

  return (
    <div>
      <form id="signin-form" className="signin-form">
        <label className="signin-heading">LOGIN</label>
        <div className="required-label-input-container">
          <label>Email address</label>
          <input
            id="email"
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={emailChange}
          />
          {emailError && <div className="error">{emailError}</div>}
        </div>
        <div className="required-label-input-container">
          <label>Password</label>
          <input
            id="password"
            className="password"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={passwordChange}
          />
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <div className="button-container">
          <button className="login-btn" onClick={loginBtn}>
            LOGIN
          </button>
        </div>

        <label className="forgot-password">
          <a style={{ fontSize: "15px" }} onClick={openForgotPassword}>
            Forgot your password?
          </a>
        </label>
        <div className="button-container">
          <button className="create-account-btn" onClick={openSignUp}>
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
