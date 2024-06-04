import { useState, useEffect } from "react";
import ReactSearchBox from "react-search-box";
import { FiShoppingCart } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { IoSearchOutline } from "react-icons/io5";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "./StateContext";

Modal.setAppElement("#root");

const Navbar = () => {
  const navigate = useNavigate();
  const { cartArray } = useStateContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
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

  return (
    <div className="nav-bar">
      <nav id="nav-bar">
        <span className="home-icon" onClick={openHome}>
          Jart Cafe
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
            <li className="sign-in" onClick={openModel}>
              Sign in
            </li>
            <li className="cart-container" onClick={openCart}>
              <FiShoppingCart size="1rem" />
              <div className="cart-counter">{cartArray.length}</div>
            </li>
          </ul>
        </div>
      </nav>
      <Modal
        isOpen={isModalOpen}
        // onRequestClose={closeModal}
        contentLabel="Signin Modal"
        className="signup-modal"
        overlayClassName="overlay"
      >
        <div className="login-model-content">
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
          <form id="signup-form">
            <label className="signup-heading">Create your Account</label>
            <label className="required">Email address</label>
            <input
              id="email"
              type="text"
              name="email"
              value=""
              placeholder="Email"
              // onChange={inputTextChange}
            />
            <label className="required">Password</label>
            <input
              id="password"
              className="password"
              type="text"
              name="password"
              value=""
              placeholder="Password"
              // onChange={inputTextChange}
            />
            <button className="login-btn">LOGIN</button>
            <label>Forgot your password?</label>
            <button className="create-account-btn">CREATE AN ACCOUNT</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
