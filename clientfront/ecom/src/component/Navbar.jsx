import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const { token, setToken, setisauthenticated } = useContext(AppContext);
  //get toekn from localstorage
// console.log(token);

  const navigate = useNavigate();
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);

  // Function to handle showing and hiding the dropdown
  const toggleDropdown = () => {
    setIsProfileDropdownVisible((prevState) => !prevState);
  };

  // Function to close the dropdown when a link is clicked
  const handleLinkClick = () => {
    setIsProfileDropdownVisible(false); // Hide dropdown when a link is clicked
  };
  const [searchTerm, setSearchTerm] = useState(""); // Corrected the search term state initialization

  // Submit handler for form submission
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Prevent submitting empty searches
      navigate(`/product/search/${searchTerm}`);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  //logout btn
  //logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetail")
    // setToken(tokn);
    setisauthenticated(false);
    toast.error("logout successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate("/login");
  };
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          {/* Brand Name */}
          <Link to="/" className="navbar-brand fw-bold">
            ShopMart
          </Link>

          {/* Search Bar */}
          <form className="searchbar d-flex" onSubmit={SubmitHandler}>
            <input
              type="search"
              name="searchTerm"
              value={searchTerm} // Bind the value to searchTerm
              onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
              placeholder="Search Our Product"
              className="form-control w-100 pl-4 pr-5 py-2"
            />
            <span
              onClick={SubmitHandler} // Trigger search when clicking the icon
              className="search material-symbols-outlined cursor-pointer"
            >
              search
            </span>
          </form>

          {/* Large Screen Buttons */}
          <div className="d-none d-lg-flex align-items-center">
            {localStorage.getItem("token")? (
              <>
                <ul className=" mx-2 text-dark " onClick={logout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height=""
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    style={{ cursor: "pointer" }}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                    />
                  </svg>
                </ul>
                <Link to={"/cart"}>
                  {" "}
                  <ul className=" mx-2 text-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height=""
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>
                  </ul>
                </Link>
                <Link to={"/profile"}>
                  {" "}
                  <ul className="text-dark mx-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height=""
                      fill="currentColor"
                      class="bi bi-person-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                  </ul>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="no-underline">
                  <li className="mx-2" style={{ listStyle: "none" }}>
                    login
                  </li>
                </Link>
                <Link to="/register" className="no-underline">
                  <li className="mx-2" style={{ listStyle: "none" }}>
                    register
                  </li>
                </Link>
              </>
            )}
            {/* 
            <Link to={"/login"}> */}{" "}
            {/* </Link> */}
          </div>

          {/* Toggler (Small Screen) */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            aria-label="Toggle navigation"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Sidebar for Small Screens */}
      <div className={`right-navbar ${isOpen ? "open" : ""}`}>
        {/* Close Button */}
        <button
          className="btn-close custom-toggler"
          onClick={toggleNavbar}
          style={{ color: "black" }} // Set the close button color to black
        ></button>

        {/* Search Bar */}
        <form className="d-flex my-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search our Products"
            aria-label="Search"
          />
        </form>

        {/* Navigation Buttons */}
        <ul className="list-unstyled">
          {/* /...............profile hover....................... */}

          <div className="relative">
            {/* Profile Link */}
            {/* <Link to={"/profile"} > */}
            <div
              onClick={toggleDropdown}
              className="text-dark d-flex align-items-center space-x-4"
            >
              <FontAwesomeIcon icon={faUser} />
              <p className="mb-0">Profile</p>
            </div>
            {/* </Link> */}

            {/* Dropdown Box */}
            {isProfileDropdownVisible && (
              <div className="absolute left-0 mt-2 p-2 bg-white rounded-5 border border-gray-300 rounded-lg shadow-lg">
                <Link to={"/login"} onClick={handleLinkClick}>
                  <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer">
                    Login
                  </p>
                </Link>
                <Link to={"/register"} onClick={handleLinkClick}>
                  <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer">
                    Register
                  </p>
                </Link>
                <Link to={"/logout"} onClick={handleLinkClick}>
                  <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer">
                    Logout
                  </p>
                </Link>
                <Link
                  to={"/savecart"}
                  className="list-none no-underline"
                  onClick={handleLinkClick}
                >
                  <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer ">
                    saveCart
                  </p>
                </Link>
              </div>
            )}
          </div>
          <br />

          <Link to={"/cart"}>
            <div className="d-flex align-items-center ">
              {" "}
              {/* Use space-x-2 for a small gap */}
              <FontAwesomeIcon className="text-dark" icon={faShoppingCart} />
              <p className="mb-0 text-dark  ">Cart</p>{" "}
              {/* Remove default margin-bottom for better alignment */}
            </div>
          </Link>

          <li
            className="text-dark"
            style={{
              cursor: "pointer",
              marginTop: "20px", // Updated margin-top value
              marginLeft: "4px",
            }}
          >
            order
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
