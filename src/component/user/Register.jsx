import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate(); // UseNavigate hook to navigate to login page after successful registration

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const [error, setError] = useState(""); // State to store error message

  const { registerUser } = useContext(AppContext);

  const { name, email, password } = formdata;

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result= await registerUser(name, email, password);
      // console.log(result.success);// true

      // setError(""); // Clear error if the request is successful
      if (result.success==true) {
        toast.success("Successfully registered", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Show success toast
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        // setError(err.response.data.message); // Set error message from the response
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(()=>{
            navigate('/login')
        },2000)
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <ToastContainer />
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Register</h3>

        {/* /{error && <div className="alert alert-danger">{error}</div>} Display error message */}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={onchangeHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={onchangeHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onchangeHandler}
              required
            />
          </div>
          <div>
          <li style={{listStyle:"none",display:"flex", justifyContent:"right",padding:"1px" }}>if have account? <Link to="/login" >Login </Link> </li>
          </div>
          <button type="submit"  style={{ marginTop: "20px",backgroundColor:"indigo" }}  className="btn btn-purple text-light w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
