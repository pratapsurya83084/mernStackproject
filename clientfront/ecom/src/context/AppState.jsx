import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  // console.log(products);

  // console.log(token);
  const [isauthenticated, setisauthenticated] = useState(false);
const [user,setUser]=useState();
// console.log(user);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/product/getallproduct`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        const res = response.data;

        setProducts(res.products);
        userProfile();
        // console.log(res);
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
    return api.data;
    // console.log("user register :",api.data);
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
    // console.log(api.data.token);
    
    setisauthenticated(true);

    // localstorage setToken
    localStorage.setItem("token", JSON.stringify(api.data.token));
    return api.data;

    // console.log("user login :",api.data);

    // console.log(api.data.success);
  };

  //user Profile
  const userProfile = async () => {
    try {
      const response = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Auth":token,
        },
        withCredentials: true,
      });

      // const res = response.data;      
      // console.log("user profile :",response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
