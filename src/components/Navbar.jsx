import { useState, useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import {
  signOut,
  fetchUserProfile,
} from "../redux/reducers/userProfileReducer";

Modal.setAppElement("#root");

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartArray } = useSelector((state) => state.cartItems);
  const { token, signIn } = useSelector((state) => state.userProfile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fNameError, setFNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [sfName, setSfName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPassword, setSPassword] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    if (signIn) {
      dispatch(fetchUserProfile(token));
    }
  }, [signIn]);

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [email, password, sfName, sEmail, sPassword]);

  const closeModal = (e) => {
    e.preventDefault();
    setIsForgotPassword(false);
    setIsOpenSignUp(false);
    setIsModalOpen(false);
  };

  const openModel = () => {
    setIsModalOpen(true);
  };
  const openCart = () => {
    navigate("/cart");
  };
  const openHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  return (
    <div className="nav-bar">
      <nav id="nav-bar">
        <span className="home-icon" onClick={openHome}>
          Jart-cafe
        </span>
        <div className="search">
          <SearchBar />
        </div>
        <div className="link-container">
          <ul className="links">
            {!signIn ? (
              <li className={!signIn ? "sign-in" : ""} onClick={openModel}>
                <span>Sign in</span>
              </li>
            ) : (
              <li className={!token ? "user-profile" : ""}>
                <DropdownMenu close={() => dispatch(signOut())} />
              </li>
            )}

            <li className="cart-container" onClick={openCart}>
              <div className="cart-btn">
                <FiShoppingCart size="1.2rem" className="cart-icon" />
                <div className="cart-counter">{cartArray.length}</div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Signin Modal"
        className="signup-modal"
        overlayClassName="overlay"
      >
        <div className="login-model-content">
          <button className="close-button" onClick={(e) => closeModal(e)}>
            &times;
          </button>
          {!isOpenSignUp && !isForgotPassword ? (
            <SignIn
              openSignup={(e) => setIsOpenSignUp(e)}
              openForogotpwd={(e) => setIsForgotPassword(e)}
              openDropDown={(e) => setOpenDropDown(e)}
              close={(e) => setIsModalOpen(e)}
            />
          ) : isOpenSignUp ? (
            <SignUp openSignup={(e) => setIsOpenSignUp(e)} />
          ) : (
            <ForgotPassword close={(e) => closeModal(e)} />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
