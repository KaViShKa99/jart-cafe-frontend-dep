import { useState, useEffect } from "react";
import { Loader } from "rsuite";
import AlertBox from "../AlertBox";
import { useSelector, useDispatch } from "react-redux";
import {
  userAuthenticate,
  emailChange,
  passwordChange,
  fetchUserProfile,
} from "../../redux/reducers/userProfileReducer";
import {
  setIsOpenSignUp,
  setIsForgotPassword,
  closeModel,
} from "../../redux/reducers/signModelReducer";

const SignIn = () =>
  // { openSignup, openForogotpwd, close }
  {
    const dispatch = useDispatch();
    const {
      userDetails,
      token,
      emailError,
      passwordError,
      userPwdFlag,
      userEmailFlag,
    } = useSelector((state) => state.userProfile);

    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
      let timer;
      if (loginLoading) {
        timer = setTimeout(() => {
          setLoginLoading(false);
          // close(false);
        }, 2000);
      }
      return () => clearTimeout(timer);
    }, [loginLoading]);
    // }, [loginLoading, close]);

    const loginBtn = (e) => {
      e.preventDefault();
      if (userPwdFlag && userEmailFlag) {
        dispatch(userAuthenticate(userDetails));
        setLoginLoading(true);
        dispatch(fetchUserProfile(token));
      } else {
        AlertBox("error", "Error", "Please enter your email and password ");
      }
    };

    const openForgotPassword = (e) => {
      e.preventDefault();
      // openForogotpwd(true);
      dispatch(setIsForgotPassword());
    };
    const openSignUp = (e) => {
      e.preventDefault();
      // openSignup(true);
      dispatch(setIsOpenSignUp(true));
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
        <form id="signin-form" className="signin-form">
          <label className="signin-heading">LOGIN</label>
          <div className="required-label-input-container">
            <label>Email address</label>
            <input
              id="email"
              type="text"
              name="email"
              value={userDetails.email}
              placeholder="Email"
              onChange={(e) => dispatch(emailChange(e.target.value))}
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
              value={userDetails.password}
              placeholder="Password"
              onChange={(e) => dispatch(passwordChange(e.target.value))}
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
