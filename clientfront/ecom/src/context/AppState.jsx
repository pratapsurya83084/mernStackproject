import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = ({ children }) => {
  const url = "http://localhost:1000/api";
  const [isauthenticated, setisauthenticated] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);

  const [user, setUser] = useState();
  const [cartProduct, setCartProduct] = useState([]);


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
    if (api.data.token) {
      localStorage.setItem("token", JSON.stringify(api.data.token));
      localStorage.setItem("userProfile", JSON.stringify(api.data));
      console.log("success");
    } else {
      console.log("not logged failes ,please try again ....");
    }

    return api.data;

    // console.log("user login :",api.data);

    // console.log(api.data.success);
  };

  //after 1 day token expire automatically
  const OneDaysInMilliseconds = 24 * 60 * 60 * 1000;
  setTimeout(() => {
    localStorage.removeItem("token");
  }, OneDaysInMilliseconds);

  //user Profile

  useEffect(() => {
    let tokn = localStorage.getItem("token");

    setToken(tokn);
  }, []);

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: localStorage.getItem("token").replace(/^"|"$/g, ""),
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
          Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
        },
      }
    );

    if (response.data.cart) {
      console.log("Cart updated successfully:", response.data.cart.items);
      localStorage.setItem("cartLen", response.data.cart.items.length);
     
   

      // Show a success toast
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      // setreload(reload);
    } else {
      console.log("Unexpected response:", response.data);
    }
  };

  // getUser cart added product
  const getUserCart = async () => {
    try {
      const api = await axios.get(`${url}/cart/userCart`, {
        headers: {
          "Content-Type": "application/json",
          Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
        },
      });
      setCartProduct(api.data.cart.items);
      // console.log(api.data)
    } catch (error) {
      console.log("data not found : ", error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  //decrease qty
  const decreaseQty = async (productid, qty) => {
    try {
      // Ensure qty is a valid number
      if (qty <= 0 || isNaN(qty)) {
        console.error("Invalid quantity");
        return;
      }

      const api = await axios.post(
        `${url}/cart/--qty`,
        { productid, qty },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
          },
          withCredentials: true,
        }
      );

      console.log("Updated cart: ", api.data);
      // You might want to update state with the new cart data
      // setCartProduct(api.data.cart.items);  // Example, adjust according to your logic
    } catch (error) {
      console.log("Error in decreasing quantity: ", error);
    }
  };

  const removeItemfromCart = async (productid) => {
    try {
      const response = await axios.delete(
        `${url}/cart/removeCart/${productid}`, // API endpoint
        // Empty body as no extra data is sent
        {
          headers: {
            "Content-Type": "application/json",
            Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Token from localStorage
          },
          withCredentials: true,
        }
      );

      console.log(response.data); // Log success response
      // alert("Item removed successfully!");

      // Show a success toast

      // setreload(reload);
    } catch (error) {
      console.error("Error while removing item:", error);
      alert("Failed to remove item from cart.");
    }
  };


const clearCartAll=async()=>{
  try {
    const api = await axios.delete(`${url}/cart/clear`,{
        headers: {
          "Content-Type": "application/json",
          Auth: localStorage.getItem("token")?.replace(/^"|"$/g, ""), // Send the token correctly
        },
        withCredentials: true,
      }
    );

console.log(api.data);
  // Show a success toast


  } catch (error) {
    console.log("failed clear cart : ",error.message);
    
  }
}

useEffect(()=>{
  clearCartAll();
},[]);






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
        getUserCart,
        cartProduct,
       
        decreaseQty,
        removeItemfromCart,
        clearCartAll
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
