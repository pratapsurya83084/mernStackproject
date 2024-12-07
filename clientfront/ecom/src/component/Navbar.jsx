import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {


  const navigate = useNavigate();
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  // Function to handle showing and hiding the dropdown
  const toggleDropdown = () => {
    setIsProfileDropdownVisible((prevState) => !prevState);
  };

  // Function to close the dropdown when a link is clicked
  const handleLinkClick = () => {
    setIsProfileDropdownVisible(false);  // Hide dropdown when a link is clicked
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
            <Link to={"/cart"}>
              {" "}
              <button className="btn btn-warning mx-2">Cart</button>
            </Link>
            <Link to={"/profile"}>
              {" "}
              <button className="btn btn-warning mx-2">profile</button>
            </Link>
            <Link to={"/login"}>
              {" "}
              <button className="btn btn-warning mx-2">login</button>
            </Link>
            <Link to={"/register"}>
              {" "}
              <button className="btn btn-warning mx-2">register</button>
            </Link>
            {/* 
            <Link to={"/login"}> */}{" "}
            <button className="btn btn-warning mx-2">logout</button>
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
        <div  onClick={toggleDropdown} className="text-dark d-flex align-items-center space-x-4">
          <FontAwesomeIcon icon={faUser} />
          <p className="mb-0">Profile</p>
        </div>
      {/* </Link> */}

      {/* Dropdown Box */}
      {isProfileDropdownVisible && (
        <div className="absolute left-0 mt-2 p-2 bg-white rounded-5 border border-gray-300 rounded-lg shadow-lg">
          <Link to={"/login"} onClick={handleLinkClick}>
            <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer">Login</p>
          </Link>
          <Link to={"/register"} onClick={handleLinkClick}>
            <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer">Register</p>
          </Link>
          <Link to={"/logout"} onClick={handleLinkClick}>
            <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer">Logout</p>
          </Link>
          <Link to={"/savecart"} className="list-none no-underline"  onClick={handleLinkClick}>
            <p className="py-1 px-3 hover:bg-gray-200 cursor-pointer ">saveCart</p>
          </Link>
        </div>
      )}
    </div>
          <br />

          <Link to={"/cart"}>
            <div className="d-flex align-items-center ">
              {" "}
              {/* Use space-x-2 for a small gap */}
              <FontAwesomeIcon  className="text-dark" icon={faShoppingCart} />
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
