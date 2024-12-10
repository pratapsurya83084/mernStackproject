import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const url = "http://localhost:1000/api";
  const [isauthenticated, setisauthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);

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
        // addToCart();
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
    console.log(api.data.name, " ", api.data.email, " ", api.data.token);

    setisauthenticated(true);

    // localstorage setToken
    if(api.data.token){
      localStorage.setItem("token", JSON.stringify(api.data.token));
      localStorage.setItem("userProfile", JSON.stringify(api.data));
      console.log("success");
      
    }else{
      console.log("not logged failes ,please try again ....");
      
    }
 

    return api.data;

    // console.log("user login :",api.data);

    // console.log(api.data.success);
  };

  //after 3 day token expire automatically
  const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
  setTimeout(() => {
    localStorage.removeItem("token");
  }, threeDaysInMilliseconds);

  //user Profile

  useEffect(() => {
    let tokn = localStorage.getItem("token");

    setToken(tokn);
  }, []);

  const userProfile = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);

    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        "Auth": localStorage.getItem("token").replace(/^"|"$/g, ""),
      },
      withCredentials: true, // Allow cookies to be sent
    });
    setUser(api.data);

    // console.log("user profile : ",api.data);
  };

  //add tocart
  const addToCart = async (title, price, qty, imgsrc, productid) => {
   
      const response = await axios.post(
        `${url}/cart/add`, // Ensure `url` is correctly defined
        { title, price, qty, imgsrc, productid },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth": localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
          },
        }
      );
  
      if (response.data.cart) {
        console.log("Cart updated successfully:", response.data.cart);
      } else {
        console.log("Unexpected response:", response.data);
      }
 
    }
  

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
        addToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
