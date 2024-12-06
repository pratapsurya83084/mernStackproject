import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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
            <Link to={"/login"}> */}
              {" "}
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
          <li>
            <button className="btn btn-warning w-100 mb-2">Cart</button>
          </li>
          <li>
            <button className="btn btn-warning w-100 mb-2">Profile</button>
          </li>
          <li>
            <button className="btn btn-warning w-100 mb-2">Login</button>
          </li>
          <li>
            <button className="btn btn-warning w-100 mb-2">Register</button>
          </li>
          <li>
            <button className="btn btn-warning w-100 mb-2">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
