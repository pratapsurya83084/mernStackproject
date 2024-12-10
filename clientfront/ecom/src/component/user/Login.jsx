import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  
  const navigate=useNavigate();
  const { loginUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();

    try {
      // console.log("Email:", email, "Password:", password);
      // Add your login logic here
    const result =await  loginUser(email, password);
    // console.log(result);
    if (result.sucess==true) {
    toast.success(result.message +" "+`login successfull`, {
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
      navigate("/");
    }, 2000);
  }else{
    toast.error("Invalid credentials,please try again", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  
    } catch (error) {
      console.log("technically issue : ",error)
    }


  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
     {/* Toast Container */}
     <ToastContainer />
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-pass">
            <li
              className=""
              style={{
                listStyle: "none",
                float: "right",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              Forgot Password
            </li>
          </div>

          <button
            type="submit"
            className="btn btn-purple  w-100"
            style={{ marginTop: "20px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
