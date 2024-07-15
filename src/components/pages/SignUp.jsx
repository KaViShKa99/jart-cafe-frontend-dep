import { useState, useEffect } from "react";
import axios from "axios";
import AlertBox from "../AlertBox";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSignUp } from "../../redux/reducers/signModelReducer";

const SignUp = () =>
  // { openSignup }
  {
    const dispatch = useDispatch();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [sfName, setSfName] = useState("");
    const [sEmail, setSEmail] = useState("");
    const [sPassword, setSPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const sfNameChange = (e) => {
      const sfNameValue = e.target.value;
      console.log(sfNameValue);
      setSfName(sfNameValue);
    };
    const sEmailChange = (e) => {
      const sEmailValue = e.target.value;
      console.log(sEmailValue);
      setSEmail(sEmailValue);
    };
    const sPasswordChange = (e) => {
      const sPasswordValue = e.target.value;
      console.log(sPasswordValue);
      setSPassword(sPasswordValue);
    };
    const openLogin = (e) => {
      e.preventDefault();
      // openSignup(false);
      dispatch(setIsOpenSignUp(false));
    };

    const registerBtn = (e) => {
      e.preventDefault();
      // setIsOpenSignUp(false);
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let valid = true;

      if (!emailPattern.test(sEmail)) {
        setEmailError("*Invalid email address");
        valid = false;
      }

      if (sPassword.length < 8) {
        setPasswordError("*Password must be at least 8 characters long");
        valid = false;
      }

      if (valid) {
        axios
          .post(`${backendUrl}/user/sign-up`, {
            name: sfName,
            email: sEmail,
            password: sPassword,
          })
          .then((response) => {
            console.log("Response:", response);
            setSfName("");
            setSEmail("");
            setSPassword("");
            openSignup(false);
            AlertBox("success", "Success", response.data);
          })
          .catch((error) => {
            console.log("Error:", error);
            AlertBox("error", "Error", error.response.data);
          });
      }
    };

    useEffect(() => {
      setEmailError("");
      setPasswordError("");
    }, [sfName, sEmail, sPassword]);

    return (
      <div>
        <form className="signup-form" id="signup-form">
          <label className="signup-heading">CREATE AN ACCOUNT</label>
          <div className="required-label-input-container">
            <label>First name</label>
            <input
              id="fname"
              type="text"
              name="first name"
              value={sfName}
              placeholder="First name"
              onChange={sfNameChange}
            />
          </div>
          <div className="required-label-input-container">
            <label id="required">Email address</label>
            <input
              id="email"
              type="text"
              name="email"
              value={sEmail}
              placeholder="Email"
              onChange={sEmailChange}
            />
            {emailError && <div className="error">{emailError}</div>}
          </div>
          <div className="required-label-input-container">
            <label id="required" className="rPassword">
              Password
            </label>
            <input
              id="password"
              className="rPassword-input"
              type="password"
              name="password"
              value={sPassword}
              placeholder="Password"
              onChange={sPasswordChange}
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className="button-container">
            <button className="create-account-btn" onClick={registerBtn}>
              REGISTER
            </button>
          </div>
          <div className="button-container">
            <button className="login-btn" onClick={openLogin}>
              BACK TO LOGIN
            </button>
          </div>
        </form>
      </div>
    );
  };

export default SignUp;
