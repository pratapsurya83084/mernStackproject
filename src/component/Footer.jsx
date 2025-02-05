import React from "react";
import {Link}  from 'react-router-dom';
function Footer() {
  return (
    <footer className="bg-white border-top py-5 bottom">
      <div className="container">
        {/* Footer Top */}
        <div className="row">
          {/* Column 1: Logo and About */}
          <div className="col-md-3 mb-4">
            <h5 className="text-dark fw-bold">E-Shop</h5>
            <p className="text-muted">
              Your one-stop online shop for the latest fashion, electronics, and more!
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-3 mb-4">
            <h6 className="text-dark fw-bold">Quick Links</h6>
            <ul className="list-unstyled mt-3">
          <Link to="/">  <li className="text-muted text-decoration-none">Home</li> </Link>   
          <Link to="/profile">  <li className="text-muted text-decoration-none">Profile</li> </Link> 
          <Link to="/cart">  <li className="text-muted text-decoration-none">cart</li> </Link> 
         
            </ul>
          </div>

         

          {/* Column 4: Newsletter Signup */}
          <div className="col-md-3 mb-4">
            <h6 className="text-dark fw-bold">Newsletter</h6>
            <p className="text-muted">
              Get updates on new products and upcoming sales.
            </p>
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder="Enter email"
                aria-label="Email"
              />
              <button className="btn btn-primary" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-top pt-4 mt-4 text-center">
          <p className="text-muted mb-0">
            &copy; {new Date().getFullYear()} CartNest. All rights reserved  Developed by Pratap Suryawanshi.
          </p>
          <div className="mt-2">
            <a href="/" className="text-muted me-3 text-decoration-none">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="/" className="text-muted me-3 text-decoration-none">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="/" className="text-muted me-3 text-decoration-none">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="/" className="text-muted text-decoration-none">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
