import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const url = "http://localhost:1000/api";
  const [isauthenticated, setisauthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  // console.log(products);

  // console.log(token);

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/product/getallproduct`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const res = await response.data;

        setProducts(res.products);
        userProfile();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  // register
  const registerUser = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        // body:JSO({name,email,password})
      }
    );
    // alert(api.data.message)
    // console.log("user register :",api.data.user);
    localStorage.setItem("userDetail", JSON.stringify(api.data.user));
    return api.data;
  };

  //login
  const loginUser = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        // body:JSO({name,email,password})
      }
    );
    setToken(api.data.token);
    console.log(api.data);

    setisauthenticated(true);

    // localstorage setToken
    localStorage.setItem("token", JSON.stringify(api.data.token));
    return api.data;

    // console.log("user login :",api.data);

    // console.log(api.data.success);
  };

  //user Profile
  const userProfile = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": token,
      },
      withCredentials: true,  // Allow cookies to be sent
    });
    

    console.log("user profile     ......",api.data);
  };












  return (
    <AppContext.Provider
      value={{
        products,
        registerUser,
        loginUser,
        token,
        setisauthenticated,
        isauthenticated,
        setToken,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
