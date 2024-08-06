import { useState, useEffect } from "react";
import { closeModel } from "../../redux/reducers/signModelReducer";
import { useDispatch } from "react-redux";
import { Loader } from "rsuite";
import { userForgotPassword } from "../../redux/reducers/userProfileReducer";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (loginLoading) {
      timer = setTimeout(() => {
        setLoginLoading(false);
        dispatch(closeModel());
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [loginLoading]);

  const emailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const resetPassword = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid = true;

    if (!emailPattern.test(email)) {
      setEmailError("*Invalid email address");
      valid = false;
    }
    if (valid) {
      dispatch(userForgotPassword(email));
      setLoginLoading(true);
    }
  };
  if (loginLoading) {
    return (
      <div className="loader-container">
        <Loader center size="lg" />
      </div>
    );
  }

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
