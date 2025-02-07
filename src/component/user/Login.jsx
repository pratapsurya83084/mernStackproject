import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import googlelogin hook
import { useGoogleLogin } from "@react-oauth/google";
import {googleAuth} from './GoogleApi';
const Login = () => {
  //take 23 things callback function ,dummy function ,authcode

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        const result = await googleAuth(authResult.code);
        const {email,name,image}= result.data.user;
        console.log("Google Auth Response:", result.data.user);
      
       
      }
   
    } catch (error) {
      console.log("Error while requesting Google code:", error);
    }
  };
 


  
 //onlick google login button with google
 const googleLogin = useGoogleLogin({
  onSuccess: responseGoogle,
  onError: (error) => console.log("Google login error:", error),
  flow: "auth-code",
});










  const navigate = useNavigate();
  const { loginUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(email, password);
      //  sessionStorage.setItem('token',result.token)
      console.log(result);

      if (result.sucess == true) {
        toast.success(result.message + " " + `login successfull`, {
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
      } else {
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
      // console.log("technically issue : ",error)
      alert("Session is expired ! Login please");
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
            <Link to="/register">
              <li
                className=""
                style={{
                  listStyle: "none",
                  float: "right",
                  padding: "5px",
                  cursor: "pointer",
                }}
              >
                register
              </li>
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-purple  w-100 text-light"
            style={{ marginTop: "20px", backgroundColor: "indigo" }}
          >
            Login
          </button>
        </form>
        <p className="text-center mt-3">OR</p>
      
      
      {/*login google button  */}
        <button
          onClick={googleLogin()}
          type="submit"
          className="btn btn-purple   text-light"
          style={{
            marginTop: "0px",
            backgroundColor: "indigo",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ height: "30px" }}
            src="https://logos-world.net/wp-content/uploads/2020/09/Google-Symbol.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Login;
