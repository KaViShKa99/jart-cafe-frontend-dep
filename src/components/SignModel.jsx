import { useState, useEffect } from "react";
import Modal from "react-modal";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import { useSelector, useDispatch } from "react-redux";
import { closeModel } from "../redux/reducers/signModelReducer";

const SignModel = () => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  //   const [isForgotPassword, setIsForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const { isModalOpen, isOpenSignUp, isForgotPassword } = useSelector(
    (state) => state.signModel
  );

  return (
    <Modal
      isOpen={isModalOpen}
      contentLabel="Signin Modal"
      className="signup-modal"
      overlayClassName="overlay"
    >
      <div className="login-model-content">
        <button
          className="close-button"
          onClick={(e) => dispatch(closeModel())}
        >
          &times;
        </button>
        {!isOpenSignUp && !isForgotPassword ? (
          <SignIn
          // openSignup={(e) => setIsOpenSignUp(e)}
          // openForogotpwd={(e) => setIsForgotPassword(e)}
          // close={(e) => setIsModalOpen(e)}
          />
        ) : isOpenSignUp ? (
          <SignUp
          //   openSignup={(e) => setIsOpenSignUp(e)}
          />
        ) : (
          <ForgotPassword 
          />
        )}
      </div>
    </Modal>
  );
};

export default SignModel;
