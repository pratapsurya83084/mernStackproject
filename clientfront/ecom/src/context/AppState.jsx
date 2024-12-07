import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AppState = ({ children }) => {
  const url = "http://localhost:1000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  // console.log(products);

  // console.log(token);
  const [isauthenticated, setisauthenticated] = useState(false);
  
  const [filteredData, setFilteredData] = useState([products]);
  // console.log(filteredData);

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
        setFilteredData(res);
        setProducts(res.products);
        // console.log(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
    setisauthenticated(true);

    // localstorage setToken
    localStorage.setItem("token", JSON.stringify(api.data.token));
    return api.data;

    // console.log("user login :",api.data);

    // console.log(api.data.success);
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
        filteredData,
        setFilteredData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
