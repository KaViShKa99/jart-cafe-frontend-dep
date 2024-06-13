import { useState, useEffect } from "react";
import ReactSearchBox from "react-search-box";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "react-modal";
import { useNavigate, Link } from "react-router-dom";
import { useStateContext } from "./StateContext";
import axios from "axios";

import DropdownMenu from "./DropdownMenu";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

Modal.setAppElement("#root");

const Navbar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const { cartArray } = useStateContext();

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
  const [profileDetails, setProfileDetails] = useState([]);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [email, password, sfName, sEmail, sPassword]);

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

  const openLogin = (e) => {
    e.preventDefault();
    setIsOpenSignUp(false);
  };

  const loginBtn = (e) => {
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
      axios
        .post(`${backendUrl}/user/authenticate`, {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log("Response:", response.data);
          const token = response.data.jwtToken;
          console.log(token);
          localStorage.setItem("jwtToken", token);
          fetchUserProfile(token);
          setEmail("");
          setPassword("");
          setOpenDropDown(true);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsForgotPassword(false);
    setIsOpenSignUp(false);
    setIsModalOpen(false);
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
          console.log("Response:", response.data);
          setSfName("");
          setSEmail("");
          setSPassword("");
          setIsOpenSignUp(false);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  const fetchUserProfile = (token) => {
    axios
      .get(`${backendUrl}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        response.data;
        console.log(response.data);
        setProfileDetails(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        // Handle token expiry or invalid token
        localStorage.removeItem("jwtToken");
      });
  };

  useEffect(() => {
    fetchUserProfile(localStorage.getItem("jwtToken"));
  }, []);

  const openSignUp = (e) => {
    e.preventDefault();
    setIsOpenSignUp(true);
  };
  const openModel = () => {
    // setOpenDropDown(true);
    setIsModalOpen(true);
  };
  const openCart = () => {
    navigate("/cart");
  };
  const openHome = () => {
    navigate("/");
  };

  const openForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];

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

  useEffect(() => {
    console.log(openDropDown);
  }, [openDropDown]);

  return (
    <div className="nav-bar">
      <nav id="nav-bar">
        <span className="home-icon" onClick={openHome}>
          JC
        </span>
        <div className="search">
          <ReactSearchBox
            id="search-box"
            placeholder="Search in Jart Cafe"
            value="Doe"
            data={data}
            callback={(record) => console.log(record)}
            leftIcon={<IoSearchOutline />}
            iconBoxSize="48px"
            autoFocus
            dropdownHoverColor="#fff0e8"
          />
        </div>
        <div className="link-container">
          <ul className="links">
            {!openDropDown ? (
              <li
                className={!openDropDown ? "sign-in" : ""}
                onClick={openModel}
              >
                <span>Sign in</span>
              </li>
            ) : (
              <li className={!openDropDown ? "sign-in" : ""}>
                <DropdownMenu
                  profile={profileDetails.name}
                  close={(e) => setOpenDropDown(e)}
                />
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
