

import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppContext from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap"; // Renamed Navbar import to BootstrapNavbar

const Navbar = () => { // Renamed the component to CustomNavbar
  const { setisauthenticated, cartProduct } = useContext(AppContext);
  const [products, setProducts] = useState(cartProduct);
const [email,setemail]=useState();

// console.log(email);

  useEffect(() => {
    setProducts(cartProduct);
  }, [cartProduct]);

  const navigate = useNavigate();
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setIsProfileDropdownVisible((prevState) => !prevState);
  };
  const handleLinkClick = () => {
    setIsProfileDropdownVisible(false); // Hide dropdown when a link is clicked
  };
  const [searchTerm, setSearchTerm] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product/search/${searchTerm}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setisauthenticated(false);
    toast.error("Logout successfully", {
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

  useEffect(() => {
    // Retrieve the data from localStorage
    const userProfile = localStorage.getItem("userProfile");

    if (userProfile) {
      const parsedData = JSON.parse(userProfile);
      // console.log("Email is:", parsedData.email); // Logs the email once
      setemail(parsedData.email); // Update state with the email
    } else {
      console.log("No userProfile found in localStorage.");
    }
  }, []); 



  return (
    <div>
      <BootstrapNavbar bg="light" expand="lg" className="shadow-sm">
        <Container>
         <Link to="/">
         <BootstrapNavbar.Brand >
            {/* <img
              src="https://files.oaiusercontent.com/file-LLhCWPR5oxEQ5pzLHgRrmf?se=2024-12-25T09%3A58%3A27Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Ddee4b8e9-d640-4bdd-9148-c2c374375162.webp&sig=KCcvB%2Byd793e%2Bnd5LIOV6AxumzCbRqP99wF1mUVgp9w%3D"
              alt="Logo"
              style={{ height: "40px" }}
            /> */}
            CartNest
          </BootstrapNavbar.Brand>
         </Link>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <div className="d-flex flex-grow-1">
              <form className="w-100 d-flex relative" onSubmit={SubmitHandler}>
                <input
                  type="text"
                  name="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control me-2 w-100" // Use w-100 to set full width
                  placeholder="Search for Products, Brands and More"
                />
                <span
                  onClick={SubmitHandler} // Trigger search when clicking the icon
                  className="absolute search material-symbols-outlined cursor-pointer"
                >
                  search
                </span>
              </form>
            </div>

            <Nav style={{ gap: "20px" }}>
              {localStorage.getItem("token") ? (
                <>
                  {products.length > 0 ? (
                    <Link to="/cart">
                      <ul className="mx-2 text-dark">
                        {cartProduct.length}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          fill="currentColor"
                          className="bi bi-cart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg>
                      </ul>
                    </Link>
                  ) : (
                    ""
                  )}

                  <ul
                    className="mx-2 text-dark"
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      fill="currentColor"
                      className="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                      />
                    </svg>
                  </ul>

                  <Link to="/profile" className="text-dark" style={{ textDecoration: "none" }}>
                    <ul className=" mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                      My Profile
                    </ul>
                  </Link>

                  {email === "admin11@gmail.com" ? (
          <Link to={"/admin"} className="text-blue-600 hover:underline">
            Admin
          </Link>
        ) : (
         ""
        )}
                
                
                </>
              ) : (
                <>
                  <Link to="/login" className="no-underline">
                    <li className="mx-2" style={{ listStyle: "none" }}>
                      Login
                    </li>
                  </Link>
                  <Link to="/register" className="no-underline">
                    <li className="mx-2" style={{ listStyle: "none" }}>
                      Register
                    </li>
                  </Link>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
